#!/usr/bin/env python3
"""
Multi-Device ZKTeco Data Extraction
Supports multiple devices with floor identification
"""

from zk import ZK
from zk.exception import ZKNetworkError
import csv
import socket
import subprocess
import sys
from datetime import datetime
import pandas as pd

# Device configuration
DEVICES = {
    '2nd_floor': {
        'ip': '10.10.19.171',
        'port': 4370,
        'timeout': 60,
        'password': 0,
        'force_udp': False,
        'name': '2nd Floor Device'
    },
    '1st_floor': {
        'ip': '10.10.19.172', 
        'port': 4370,
        'timeout': 60,
        'password': 0,
        'force_udp': False,
        'name': '1st Floor Device'
    }
}

def test_network_connectivity(ip, port):
    """Test if device is reachable"""
    print(f"Testing connectivity to {ip}:{port}...")
    
    # Test ping
    try:
        result = subprocess.run(['ping', '-c', '1', '-W', '3000', ip], 
                              capture_output=True, text=True, timeout=5)
        if result.returncode != 0:
            print(f"❌ Ping failed for {ip}")
            return False
        else:
            print(f"✅ Ping successful for {ip}")
    except subprocess.TimeoutExpired:
        print(f"⏰ Ping timeout for {ip}")
        return False
    
    # Test port connectivity
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(5)
    try:
        result = sock.connect_ex((ip, port))
        if result == 0:
            print(f"✅ Port {port} is open on {ip}")
            return True
        else:
            print(f"❌ Port {port} is closed on {ip}")
            return False
    except Exception as e:
        print(f"❌ Connection test failed for {ip}:{port} - {e}")
        return False
    finally:
        sock.close()

def extract_device_data(device_key, device_config):
    """Extract data from a single device"""
    print(f"\n🔄 Extracting data from {device_config['name']} ({device_config['ip']})...")
    
    # Test connectivity first
    if not test_network_connectivity(device_config['ip'], device_config['port']):
        print(f"❌ Cannot reach {device_config['name']}, skipping...")
        return False
    
    # Connection configurations to try
    connection_configs = [
        {'timeout': device_config['timeout'], 'password': device_config['password'], 'force_udp': device_config['force_udp']},
        {'timeout': 30, 'password': 0, 'force_udp': True},
        {'timeout': 60, 'password': None, 'force_udp': False},
        {'timeout': 45, 'password': 0, 'force_udp': False},
    ]
    
    for attempt, config in enumerate(connection_configs, 1):
        try:
            print(f"🔄 Connection attempt {attempt}/{len(connection_configs)} for {device_config['name']}...")
            print(f"   Config: timeout={config['timeout']}, password={config['password']}, force_udp={config['force_udp']}")
            
            # Create ZK instance
            conn = ZK(device_config['ip'], port=device_config['port'], 
                     timeout=config['timeout'], password=config['password'], 
                     force_udp=config['force_udp'], ommit_ping=True)
            
            # Connect to device
            conn.connect()
            print(f"✅ Successfully connected to {device_config['name']}")
            
            # Get device info
            try:
                device_name = conn.get_device_name()
                print(f"📱 Device Name: {device_name}")
            except:
                print("📱 Device Name: Unknown")
            
            # Fetch users
            print(f"👥 Fetching users from {device_config['name']}...")
            users = conn.get_users()
            print(f"✅ Found {len(users)} users")
            
            # Save users with floor information
            users_file = f'zkteco_users_{device_key}.csv'
            with open(users_file, 'w', newline='', encoding='utf-8') as csvfile:
                writer = csv.writer(csvfile)
                writer.writerow(['uid', 'name', 'privilege', 'password', 'group_id', 'user_id', 'floor'])
                
                for user in users:
                    writer.writerow([
                        user.uid, 
                        user.name, 
                        user.privilege, 
                        user.password, 
                        user.group_id, 
                        user.user_id,
                        device_key  # Add floor information
                    ])
            
            print(f"💾 Saved users to {users_file}")
            
            # Fetch attendance records
            print(f"📋 Fetching attendance records from {device_config['name']}...")
            attendance_file = f'zkteco_attendance_{device_key}.csv'
            
            attendances = conn.get_attendance()
            print(f"✅ Found {len(attendances)} attendance records")
            
            # Save attendance with floor information
            with open(attendance_file, 'w', newline='', encoding='utf-8') as csvfile:
                writer = csv.writer(csvfile)
                writer.writerow(['uid', 'timestamp', 'status', 'punch', 'floor'])
                
                for att in attendances:
                    writer.writerow([
                        att.uid,
                        att.timestamp.strftime('%Y-%m-%d %H:%M:%S'),
                        att.status,
                        att.punch,
                        device_key  # Add floor information
                    ])
            
            print(f"💾 Saved attendance to {attendance_file}")
            
            # Disconnect
            conn.disconnect()
            print(f"✅ Successfully extracted data from {device_config['name']}")
            return True
            
        except ZKNetworkError as e:
            print(f"❌ Network error for {device_config['name']} (attempt {attempt}): {e}")
            continue
        except Exception as e:
            print(f"❌ Unexpected error for {device_config['name']} (attempt {attempt}): {e}")
            continue
    
    print(f"❌ Failed to connect to {device_config['name']} after all attempts")
    return False

def merge_device_data():
    """Merge data from all devices into combined files"""
    print(f"\n🔗 Merging data from all devices...")
    
    # Merge users
    all_users = []
    for device_key in DEVICES.keys():
        users_file = f'zkteco_users_{device_key}.csv'
        try:
            df = pd.read_csv(users_file)
            all_users.append(df)
            print(f"✅ Loaded users from {device_key}: {len(df)} records")
        except FileNotFoundError:
            print(f"⚠️  No user data found for {device_key}")
    
    if all_users:
        combined_users = pd.concat(all_users, ignore_index=True)
        combined_users.to_csv('zkteco_users_combined.csv', index=False)
        print(f"💾 Saved combined users: {len(combined_users)} records")
    
    # Merge attendance
    all_attendance = []
    for device_key in DEVICES.keys():
        attendance_file = f'zkteco_attendance_{device_key}.csv'
        try:
            df = pd.read_csv(attendance_file)
            all_attendance.append(df)
            print(f"✅ Loaded attendance from {device_key}: {len(df)} records")
        except FileNotFoundError:
            print(f"⚠️  No attendance data found for {device_key}")
    
    if all_attendance:
        combined_attendance = pd.concat(all_attendance, ignore_index=True)
        # Sort by timestamp
        combined_attendance['timestamp'] = pd.to_datetime(combined_attendance['timestamp'])
        combined_attendance = combined_attendance.sort_values('timestamp')
        combined_attendance.to_csv('zkteco_attendance_combined.csv', index=False)
        print(f"💾 Saved combined attendance: {len(combined_attendance)} records")

def create_extraction_info():
    """Create info file about the extraction"""
    info = {
        'extraction_time': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        'devices_attempted': len(DEVICES),
        'devices_successful': 0,
        'total_users': 0,
        'total_attendance': 0
    }
    
    # Count successful extractions
    for device_key in DEVICES.keys():
        users_file = f'zkteco_users_{device_key}.csv'
        attendance_file = f'zkteco_attendance_{device_key}.csv'
        
        if os.path.exists(users_file) and os.path.exists(attendance_file):
            info['devices_successful'] += 1
            
            try:
                users_df = pd.read_csv(users_file)
                attendance_df = pd.read_csv(attendance_file)
                info['total_users'] += len(users_df)
                info['total_attendance'] += len(attendance_df)
            except:
                pass
    
    with open('multi_device_extraction_info.txt', 'w') as f:
        f.write("Multi-Device ZKTeco Data Extraction Report\n")
        f.write("=" * 45 + "\n")
        f.write(f"Extraction Time: {info['extraction_time']}\n")
        f.write(f"Devices Attempted: {info['devices_attempted']}\n")
        f.write(f"Devices Successful: {info['devices_successful']}\n")
        f.write(f"Total Users: {info['total_users']}\n")
        f.write(f"Total Attendance Records: {info['total_attendance']}\n\n")
        
        for device_key, device_config in DEVICES.items():
            f.write(f"{device_config['name']}: {device_config['ip']}\n")

if __name__ == "__main__":
    import os
    
    print("🚀 Multi-Device ZKTeco Data Extraction Starting...")
    print(f"📱 Configured devices: {len(DEVICES)}")
    
    successful_devices = 0
    
    # Extract from each device
    for device_key, device_config in DEVICES.items():
        success = extract_device_data(device_key, device_config)
        if success:
            successful_devices += 1
    
    print(f"\n📊 Extraction Summary:")
    print(f"   Total devices: {len(DEVICES)}")
    print(f"   Successful: {successful_devices}")
    print(f"   Failed: {len(DEVICES) - successful_devices}")
    
    if successful_devices > 0:
        # Merge all device data
        merge_device_data()
        
        # Create extraction info
        create_extraction_info()
        
        print(f"\n🎉 Multi-device extraction completed!")
        print(f"📁 Files created:")
        print(f"   - Individual device files: zkteco_users_[floor].csv, zkteco_attendance_[floor].csv")
        print(f"   - Combined files: zkteco_users_combined.csv, zkteco_attendance_combined.csv")
        print(f"   - Info file: multi_device_extraction_info.txt")
    else:
        print(f"\n❌ No devices were successfully contacted!")
        sys.exit(1)
