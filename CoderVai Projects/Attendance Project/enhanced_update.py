#!/usr/bin/env python3
"""
Enhanced ZKTeco Data Extraction Script
Captures additional fields like verification method, department info, etc.
"""

import csv
import logging
import socket
import subprocess
import sys
import time
from datetime import datetime

from zk import ZK
from zk.exception import ZKNetworkError

# CONFIG
DEVICE_IP = "10.10.19.171"    # ← replace
PORT = 4370
CONNECT_TIMEOUT = 120       # seconds (increase)
RETRY_ATTEMPTS = 3
SAVE_EVERY = 1000          # flush after this many rows
USERS_CSV = "zkteco_users_enhanced.csv"
ATT_CSV = "zkteco_attendance_enhanced.csv"

# Logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger("zk_enhanced")

def save_csv(filename, rows, headers=None, mode="w"):
    """Save rows to CSV file"""
    with open(filename, mode, newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        if headers and mode == "w":
            writer.writerow(headers)
        writer.writerows(rows)

def test_network_connectivity(ip, port):
    """Test if device is reachable"""
    log.info("Testing network connectivity to %s:%d", ip, port)
    
    # Test ping
    try:
        result = subprocess.run(['ping', '-c', '1', ip], 
                              capture_output=True, text=True, timeout=10)
        if result.returncode == 0:
            log.info("✓ Ping successful")
        else:
            log.warning("✗ Ping failed")
    except Exception as e:
        log.warning("Ping test failed: %s", e)
    
    # Test port connectivity
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(5)
        result = sock.connect_ex((ip, port))
        sock.close()
        if result == 0:
            log.info("✓ Port %d is open", port)
            return True
        else:
            log.warning("✗ Port %d is closed or filtered", port)
            return False
    except Exception as e:
        log.warning("Port test failed: %s", e)
        return False

def get_verification_method_name(verify_type):
    """Convert verification type code to readable name"""
    verify_map = {
        0: 'Password',
        1: 'Fingerprint', 
        2: 'RFID Card',
        3: 'Face',
        4: 'Palm',
        15: 'Combination'
    }
    return verify_map.get(verify_type, f'Unknown({verify_type})')

def get_status_name(status):
    """Convert status code to readable name"""
    status_map = {
        0: 'Check In',
        1: 'Check Out',
        2: 'Break Out', 
        3: 'Break In',
        4: 'Overtime In',
        5: 'Overtime Out'
    }
    return status_map.get(status, f'Unknown({status})')

def fetch_enhanced_data():
    """Enhanced data fetching with additional fields"""
    
    if not test_network_connectivity(DEVICE_IP, PORT):
        log.error("Network connectivity test failed. Please check device connection.")
        return False
    
    # Multiple connection strategies
    connection_configs = [
        {"timeout": CONNECT_TIMEOUT, "password": 0, "force_udp": False},
        {"timeout": 60, "password": None, "force_udp": False}, 
        {"timeout": 30, "password": 0, "force_udp": True},
        {"timeout": 15, "password": None, "force_udp": True}
    ]
    
    for attempt in range(1, RETRY_ATTEMPTS + 1):
        log.info("=== Connection attempt %d/%d ===", attempt, RETRY_ATTEMPTS)
        
        for config_idx, config in enumerate(connection_configs):
            log.info("Trying connection config %d: timeout=%d, password=%s, force_udp=%s", 
                    config_idx + 1, config["timeout"], config["password"], config["force_udp"])
            
            try:
                zk = ZK(DEVICE_IP, port=PORT, timeout=config["timeout"], 
                       password=config["password"], force_udp=config["force_udp"])
                conn = zk.connect()
                
                # Test connection
                device_name = conn.get_device_name()
                log.info("✓ Connected successfully! Device: %s", device_name)
                
                # Get device info
                firmware_version = getattr(conn, 'get_firmware_version', lambda: 'Unknown')()
                platform = getattr(conn, 'get_platform', lambda: 'Unknown')()
                device_time = getattr(conn, 'get_time', lambda: 'Unknown')()
                
                log.info("Device Info - Firmware: %s, Platform: %s, Time: %s", 
                        firmware_version, platform, device_time)
                
                # ===== FETCH USERS =====
                log.info("Fetching users...")
                users = conn.get_users()
                log.info("Found %d users", len(users))
                
                urows = []
                for u in users:
                    try:
                        uid = str(u.uid)
                        name = u.name or f"User_{uid}"
                        card = getattr(u, 'card', 0) or 0
                        privilege = getattr(u, 'privilege', 0)
                        password = getattr(u, 'password', '')
                        group_id = getattr(u, 'group_id', 0)
                        
                        urows.append([uid, name, card, privilege, password, group_id])
                    except Exception as e:
                        log.warning("Error processing user %s: %s", getattr(u, 'uid', 'unknown'), e)
                
                # Save enhanced users data
                user_headers = ["uid", "name", "card", "privilege", "password", "group_id"]
                save_csv(USERS_CSV, urows, headers=user_headers, mode="w")
                log.info("Users saved to %s", USERS_CSV)
                
                # ===== FETCH ATTENDANCE =====
                log.info("Fetching attendance logs...")
                att_rows = []
                
                try:
                    logs = conn.get_attendance()
                    log.info("get_attendance() returned, iterating logs ...")
                    count = 0
                    first_batch = True
                    
                    for l in logs:
                        try:
                            # Extract basic fields
                            uid = str(getattr(l, 'user_id', getattr(l, 'uid', 'unknown')))
                            timestamp = getattr(l, 'timestamp', datetime.now())
                            status = getattr(l, 'status', 0)
                            
                            # Extract enhanced fields
                            punch = getattr(l, 'punch', 0)  # Verification method
                            verify_type = getattr(l, 'verify_type', 0)  # Verification type
                            work_code = getattr(l, 'work_code', 0)  # Work code
                            
                            # Convert timestamp if needed
                            if isinstance(timestamp, (int, float)):
                                timestamp = datetime.fromtimestamp(timestamp)
                            
                            # Get readable names
                            verify_method = get_verification_method_name(verify_type)
                            status_name = get_status_name(status)
                            
                            # Enhanced row with additional fields
                            att_rows.append([
                                uid, 
                                str(timestamp), 
                                status, 
                                status_name,
                                verify_type,
                                verify_method,
                                punch,
                                work_code
                            ])
                            count += 1
                            
                            # Periodic save
                            if count % SAVE_EVERY == 0:
                                log.info("Flushing %d attendance rows to disk ...", len(att_rows))
                                mode = "w" if first_batch else "a"
                                headers = ["uid", "timestamp", "status", "status_name", "verify_type", "verify_method", "punch", "work_code"] if first_batch else None
                                save_csv(ATT_CSV, att_rows, headers=headers, mode=mode)
                                first_batch = False
                                att_rows = []
                        
                        except Exception as e:
                            log.warning("Error processing attendance record: %s", e)
                            continue
                    
                    # Flush remaining records
                    if att_rows:
                        mode = "w" if first_batch else "a"
                        headers = ["uid", "timestamp", "status", "status_name", "verify_type", "verify_method", "punch", "work_code"] if first_batch else None
                        save_csv(ATT_CSV, att_rows, headers=headers, mode=mode)
                    
                    log.info("Enhanced attendance fetch completed. Saved %d records to %s", count, ATT_CSV)
                    
                    # Create enhanced completion info
                    completion_info = f"# Enhanced data extracted on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n"
                    completion_info += f"# Device: {device_name} ({DEVICE_IP}:{PORT})\n"
                    completion_info += f"# Firmware: {firmware_version}\n"
                    completion_info += f"# Platform: {platform}\n"
                    completion_info += f"# Device Time: {device_time}\n"
                    completion_info += f"# Total users: {len(urows)}\n"
                    completion_info += f"# Total attendance records: {count}\n"
                    completion_info += f"# Enhanced fields: verification_method, status_name, work_code\n"
                    
                    with open("enhanced_extraction_info.txt", "w") as f:
                        f.write(completion_info)
                    
                    conn.disconnect()
                    return True
                    
                except Exception as e:
                    log.error("Error during attendance fetch: %s", e)
                    conn.disconnect()
                    continue
                    
            except ZKNetworkError as e:
                log.warning("ZKNetworkError on config %d: %s", config_idx + 1, e)
                continue
            except Exception as e:
                log.warning("Exception on config %d: %s", config_idx + 1, e)
                continue
        
        if attempt < RETRY_ATTEMPTS:
            log.info("All configs failed, waiting before retry...")
            time.sleep(5 * attempt)
    
    log.error("All connection attempts failed!")
    return False

if __name__ == "__main__":
    log.info("Starting enhanced ZKTeco data extraction...")
    success = fetch_enhanced_data()
    if success:
        log.info("✓ Enhanced data extraction completed successfully!")
        sys.exit(0)
    else:
        log.error("✗ Enhanced data extraction failed!")
        sys.exit(1)
