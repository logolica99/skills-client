#!/usr/bin/env python3
"""
ACS FUTURE SCHOOL Attendance Management System
Simple and working version with device information
"""

from flask import Flask, render_template, jsonify, request
import pandas as pd
from datetime import datetime, timedelta
import json
import os
import subprocess

app = Flask(__name__)

# Global variables for data
attendance_df = None
users_df = None
stats = {}
device_status = {'1st_floor': False, '2nd_floor': False}

def check_device_status():
    """Check if devices are reachable"""
    global device_status
    devices = {
        '1st_floor': '10.10.19.172',
        '2nd_floor': '10.10.19.171'
    }
    
    for floor, ip in devices.items():
        try:
            result = subprocess.run(['ping', '-c', '1', '-W', '1', ip], 
                                  capture_output=True, timeout=2)
            device_status[floor] = (result.returncode == 0)
        except:
            device_status[floor] = False

def load_corrected_data():
    """Load the most recent attendance data and users"""
    global attendance_df, users_df, stats
    
    try:
        # Try to load the most recent data (partial file has latest data)
        if os.path.exists('zkteco_attendance_partial.csv') and os.path.exists('zkteco_users.csv'):
            print("📊 Loading latest partial data (includes today's records)...")
            
            # Load attendance data
            attendance_df = pd.read_csv('zkteco_attendance_partial.csv', names=['uid', 'timestamp', 'status'])
            attendance_df['datetime'] = pd.to_datetime(attendance_df['timestamp'])
            
            # Add missing columns for compatibility
            attendance_df['verify_method'] = 'FP'
            attendance_df['device_uid'] = attendance_df['uid']
            attendance_df['device_ip'] = '10.10.19.171'
            attendance_df['device_name'] = '2nd Floor Device'
            
            # Load users data
            users_df = pd.read_csv('zkteco_users.csv')
            
            # Try to load user mapping if available
            if os.path.exists('correct_user_mapping.json'):
                with open('correct_user_mapping.json', 'r') as f:
                    mapping_data = json.load(f)
                
                # Extract the actual mapping (it's nested under 'user_mapping' key)
                if 'user_mapping' in mapping_data:
                    user_mapping_raw = mapping_data['user_mapping']
                else:
                    user_mapping_raw = mapping_data
                
                # Convert string keys to integers for mapping
                user_mapping = {int(k): int(v) for k, v in user_mapping_raw.items()}
                
                # Apply user mapping to attendance data
                attendance_df['mapped_uid'] = attendance_df['uid'].map(user_mapping).fillna(attendance_df['uid'])
                attendance_df['uid'] = attendance_df['mapped_uid'].astype(int)
                attendance_df = attendance_df.drop('mapped_uid', axis=1)
                print(f"✅ Applied user ID mapping corrections: {len(user_mapping)} mappings")
                print(f"   Example: Device UID 4 → System UID {user_mapping.get(4, 4)} (Emran Mostofa)")
            
            # Merge attendance with user names
            attendance_df = attendance_df.merge(
                users_df[['uid', 'name']], 
                on='uid', 
                how='left'
            )
            
            # Fill missing names
            attendance_df['name'] = attendance_df['name'].fillna('Unknown User')
            
        # Fallback to corrected file if partial doesn't exist
        elif os.path.exists('zkteco_attendance_final_corrected.csv'):
            print("📊 Loading corrected data file...")
            attendance_df = pd.read_csv('zkteco_attendance_final_corrected.csv')
            attendance_df['datetime'] = pd.to_datetime(attendance_df['timestamp'])
            
            # Add device info
            if 'device_ip' not in attendance_df.columns:
                attendance_df['device_ip'] = '10.10.19.171'
                attendance_df['device_name'] = '2nd Floor Device'
            
            users_df = pd.read_csv('zkteco_users.csv')
            attendance_df = attendance_df.merge(users_df[['uid', 'name']], on='uid', how='left')
            attendance_df['name'] = attendance_df['name'].fillna('Unknown User')
        
        else:
            print("❌ No data files found")
            load_original_data()
            return
        
        # Calculate stats
        stats = calculate_stats()
        
        # Check device status
        check_device_status()
        
        latest_date = attendance_df['datetime'].max().strftime('%Y-%m-%d')
        today_records = len(attendance_df[attendance_df['datetime'].dt.date == datetime.now().date()])
        
        print(f"✓ Loaded data: {len(attendance_df)} records, {len(users_df)} users")
        print(f"📅 Latest date: {latest_date}")
        print(f"📊 Today's records: {today_records}")
        
    except Exception as e:
        print(f"Error loading data: {e}")
        # Fallback to original data
        load_original_data()

def load_original_data():
    """Fallback to load original data if corrected data is not available"""
    global attendance_df, users_df, stats
    
    try:
        # Load original attendance data
        attendance_df = pd.read_csv('zkteco_attendance_partial.csv', names=['uid', 'timestamp', 'status'])
        attendance_df['datetime'] = pd.to_datetime(attendance_df['timestamp'])
        
        # Load users data
        users_df = pd.read_csv('zkteco_users.csv')
        
        # Merge attendance with user names
        attendance_df = attendance_df.merge(
            users_df[['uid', 'name']], 
            on='uid', 
            how='left'
        )
        
        # Fill missing names and add default values for new columns
        attendance_df['name'] = attendance_df['name'].fillna('Unknown User')
        attendance_df['verify_method'] = 'Unknown'
        attendance_df['department'] = 'Unknown'
        
        # Calculate stats
        stats = calculate_stats()
        
        print(f"✓ Loaded original data: {len(attendance_df)} records, {len(users_df)} users")
        
    except Exception as e:
        print(f"Error loading data: {e}")

def calculate_stats():
    """Calculate dashboard statistics"""
    if attendance_df is None or users_df is None:
        return {}
    
    today = datetime.now().date()
    
    # Today's data
    today_data = attendance_df[attendance_df['datetime'].dt.date == today]
    
    # Status mapping
    status_map = {
        0: 'Check In',
        1: 'Check Out', 
        2: 'Break Out',
        3: 'Break In',
        4: 'Overtime In',
        5: 'Overtime Out'
    }
    
    # Calculate stats
    total_users = len(users_df)
    active_users_today = len(today_data['uid'].unique())
    total_records = len(attendance_df)
    today_records = len(today_data)
    
    # Date range
    if len(attendance_df) > 0:
        date_range = {
            'start': attendance_df['datetime'].min().strftime('%Y-%m-%d'),
            'end': attendance_df['datetime'].max().strftime('%Y-%m-%d')
        }
    else:
        date_range = {'start': 'N/A', 'end': 'N/A'}
    
    # Check if we have enhanced data
    enhanced_mode = 'verify_method' in attendance_df.columns and attendance_df['verify_method'].notna().any()
    
    return {
        'total_users': int(total_users),
        'active_users': int(active_users_today),
        'total_records': int(total_records),
        'today_records': int(today_records),
        'date_range': date_range,
        'enhanced_mode': str(enhanced_mode),  # Convert bool to string for JSON
        'status_map': status_map
    }

def calculate_working_hours(user_records):
    """Calculate working hours for a user's daily records"""
    if len(user_records) == 0:
        return 0, None, None
    
    # Sort by time
    user_records = user_records.sort_values('datetime')
    
    # Always use first and last timestamps regardless of status
    first_time = user_records['datetime'].min()
    last_time = user_records['datetime'].max()
    
    # Calculate working hours
    if first_time and last_time and last_time > first_time:
        working_hours = (last_time - first_time).total_seconds() / 3600
    else:
        working_hours = 0
    
    return working_hours, first_time, last_time

@app.route('/')
def index():
    """Dashboard page"""
    # Refresh device status
    check_device_status()
    return render_template('corrected_index.html', stats=stats, device_status=device_status)

@app.route('/daily')
def daily():
    """Daily attendance page"""
    # Get date parameter or use today
    date_str = request.args.get('date', datetime.now().strftime('%Y-%m-%d'))
    try:
        selected_date = datetime.strptime(date_str, '%Y-%m-%d').date()
    except:
        selected_date = datetime.now().date()
    
    # Filter data for selected date
    daily_data = attendance_df[attendance_df['datetime'].dt.date == selected_date]
    
    # Group by user and calculate stats
    user_stats = []
    
    for uid in daily_data['uid'].unique():
        user_records = daily_data[daily_data['uid'] == uid].sort_values('datetime')
        
        if len(user_records) > 0:
            user_name = user_records['name'].iloc[0]
            
            # Calculate working hours and times
            working_hours, first_time, last_time = calculate_working_hours(user_records)
            
            # Determine status based on number of entries and standard practice
            total_entries = len(user_records)
            if total_entries == 1:
                status = 'Checked In'
            elif total_entries >= 2:
                status = 'Completed'
            else:
                status = 'Unknown'
            
            # First check-in is always the first timestamp
            # Last check-out is always the last timestamp
            first_check_in = first_time.strftime('%H:%M:%S') if first_time else 'Not Available'
            last_check_out = last_time.strftime('%H:%M:%S') if last_time else 'Not Available'
            
            # If only one entry, show it as first check-in only
            if total_entries == 1:
                last_check_out = 'Not Checked Out'
            
            user_stats.append({
                'uid': uid,
                'name': user_name,
                'first_check_in': first_check_in,
                'last_check_out': last_check_out,
                'working_hours': f"{working_hours:.2f}h" if working_hours > 0 else '0.00h',
                'total_entries': total_entries,
                'status': status,
                'records': [
                    {
                        'time': record['datetime'].strftime('%H:%M:%S'),
                        'full_datetime': record['datetime'].strftime('%Y-%m-%d %H:%M:%S'),
                        'status': stats['status_map'].get(record['status'], f'Status {record["status"]}'),
                        'verify_method': record.get('verify_method', 'Unknown'),
                        'device_uid': record.get('device_uid', 'N/A'),
                        'device_ip': record.get('device_ip', '10.10.19.171'),
                        'device_name': record.get('device_name', '2nd Floor Device')
                    }
                    for _, record in user_records.iterrows()
                ]
            })
    
    # Sort by name
    user_stats.sort(key=lambda x: x['name'])
    
    # Calculate summary
    summary = {
        'total_employees': len(user_stats),
        'present': len([u for u in user_stats if u['status'] in ['Checked In', 'Completed']]),
        'checked_out': len([u for u in user_stats if u['status'] == 'Completed']),
        'total_hours': sum([float(u['working_hours'].replace('h', '')) for u in user_stats])
    }
    
    return render_template('corrected_daily.html', 
                         date=selected_date.strftime('%Y-%m-%d'),
                         user_stats=user_stats,
                         summary=summary,
                         stats=stats)

@app.route('/monthly')
def monthly():
    """Monthly attendance page"""
    # Get month/year parameters or use current
    month = int(request.args.get('month', datetime.now().month))
    year = int(request.args.get('year', datetime.now().year))
    
    # Filter data for selected month
    monthly_data = attendance_df[
        (attendance_df['datetime'].dt.month == month) & 
        (attendance_df['datetime'].dt.year == year)
    ]
    
    # Group by user and calculate monthly stats
    user_monthly_stats = []
    
    for uid in monthly_data['uid'].unique():
        user_records = monthly_data[monthly_data['uid'] == uid]
        user_name = user_records['name'].iloc[0]
        
        # Group by date
        daily_stats = []
        total_working_hours = 0
        total_days = 0
        
        for date in user_records['datetime'].dt.date.unique():
            daily_records = user_records[user_records['datetime'].dt.date == date]
            working_hours, first_time, last_time = calculate_working_hours(daily_records)
            
            # Count any day with records as a working day
            if len(daily_records) > 0:
                total_working_hours += working_hours
                total_days += 1
            
            daily_stats.append({
                'date': date.strftime('%Y-%m-%d'),
                'records': len(daily_records),
                'working_hours': working_hours,
                'first_time': first_time.strftime('%H:%M') if first_time else None,
                'last_time': last_time.strftime('%H:%M') if last_time else None
            })
        
        avg_hours = total_working_hours / total_days if total_days > 0 else 0
        
        user_monthly_stats.append({
            'uid': uid,
            'name': user_name,
            'total_days': total_days,
            'total_hours': total_working_hours,
            'avg_hours': avg_hours,
            'total_records': len(user_records),
            'daily_stats': daily_stats
        })
    
    # Sort by name
    user_monthly_stats.sort(key=lambda x: x['name'])
    
    return render_template('corrected_monthly.html',
                         month=month,
                         year=year,
                         user_stats=user_monthly_stats,
                         stats=stats)

@app.route('/users')
def users():
    """Users management page"""
    return render_template('enhanced_users.html', 
                         users=users_df.to_dict('records'),
                         stats=stats)

@app.route('/user/<int:uid>')
def user_profile(uid):
    """User profile page with attendance history"""
    user = users_df[users_df['uid'] == uid]
    if len(user) == 0:
        return "User not found", 404
    
    # Convert user to dictionary for template
    user_info = user.iloc[0].to_dict()
    
    # Ensure all fields exist with defaults
    user_info.setdefault('department', None)
    user_info.setdefault('position', None)
    user_info.setdefault('phone', None)
    user_info.setdefault('email', None)
    user_info.setdefault('privilege', 0)
    user_info.setdefault('group_id', 0)
    
    # Get user's attendance history
    user_attendance = attendance_df[attendance_df['uid'] == uid].copy()
    
    if len(user_attendance) > 0:
        # Calculate daily stats
        user_attendance['date'] = user_attendance['datetime'].dt.date
        daily_stats = []
        
        for date in sorted(user_attendance['date'].unique(), reverse=True)[:30]:  # Last 30 days
            day_records = user_attendance[user_attendance['date'] == date]
            working_hours, first_time, last_time = calculate_working_hours(day_records)
            
            daily_stats.append({
                'date': date.strftime('%Y-%m-%d'),
                'records': len(day_records),
                'working_hours': working_hours,
                'first_time': first_time.strftime('%H:%M:%S') if first_time else None,
                'last_time': last_time.strftime('%H:%M:%S') if last_time else None,
                'status': 'Completed' if len(day_records) >= 2 else 'Checked In'
            })
        
        # Calculate overall stats
        total_days = len(user_attendance['date'].unique())
        total_hours = sum([s['working_hours'] for s in daily_stats])
        avg_hours = total_hours / total_days if total_days > 0 else 0
        
        user_stats = {
            'total_records': len(user_attendance),
            'total_days': total_days,
            'total_hours': total_hours,
            'avg_hours': avg_hours,
            'daily_stats': daily_stats
        }
    else:
        user_stats = {
            'total_records': 0,
            'total_days': 0,
            'total_hours': 0,
            'avg_hours': 0,
            'daily_stats': []
        }
    
    return render_template('user_profile.html', user=user_info, stats=user_stats)

@app.route('/user/<int:uid>/edit', methods=['GET', 'POST'])
def edit_user(uid):
    """Edit user profile"""
    global users_df
    user = users_df[users_df['uid'] == uid]
    if len(user) == 0:
        return "User not found", 404
    
    user = user.iloc[0]
    
    if request.method == 'POST':
        # Update user information
        data = request.get_json()
        
        # Update the dataframe
        users_df.loc[users_df['uid'] == uid, 'name'] = data.get('name', user['name'])
        users_df.loc[users_df['uid'] == uid, 'privilege'] = data.get('privilege', user['privilege'])
        users_df.loc[users_df['uid'] == uid, 'group_id'] = data.get('group_id', user['group_id'])
        
        # Add additional fields if they don't exist
        for field in ['department', 'position', 'phone', 'email']:
            if field not in users_df.columns:
                users_df[field] = ''
            users_df.loc[users_df['uid'] == uid, field] = data.get(field, '')
        
        # Save updated data
        try:
            users_df.to_csv('zkteco_users.csv', index=False)
            return jsonify({'success': True, 'message': 'User updated successfully'})
        except Exception as e:
            return jsonify({'success': False, 'message': f'Error saving user: {str(e)}'})
    
    # GET request - return user data
    return jsonify(user.to_dict())

@app.route('/api/users/<int:uid>', methods=['DELETE'])
def delete_user(uid):
    """Delete user (soft delete - mark as inactive)"""
    global users_df
    
    if uid not in users_df['uid'].values:
        return jsonify({'success': False, 'message': 'User not found'}), 404
    
    try:
        # Add status column if it doesn't exist
        if 'status' not in users_df.columns:
            users_df['status'] = 'active'
        
        # Mark as inactive instead of deleting
        users_df.loc[users_df['uid'] == uid, 'status'] = 'inactive'
        users_df.to_csv('zkteco_users.csv', index=False)
        
        return jsonify({'success': True, 'message': 'User deactivated successfully'})
    except Exception as e:
        return jsonify({'success': False, 'message': f'Error deactivating user: {str(e)}'})

@app.route('/api/users', methods=['POST'])
def add_user():
    """Add new user"""
    global users_df
    
    try:
        data = request.get_json()
        
        # Generate new UID
        new_uid = users_df['uid'].max() + 1 if len(users_df) > 0 else 1
        
        # Create new user record
        new_user = {
            'uid': new_uid,
            'name': data.get('name', ''),
            'privilege': data.get('privilege', 0),
            'password': '',
            'group_id': data.get('group_id', 0),
            'user_id': new_uid,
            'department': data.get('department', ''),
            'position': data.get('position', ''),
            'phone': data.get('phone', ''),
            'email': data.get('email', ''),
            'status': 'active'
        }
        
        # Add missing columns if they don't exist
        for col in new_user.keys():
            if col not in users_df.columns:
                users_df[col] = ''
        
        # Add new user to dataframe
        users_df = pd.concat([users_df, pd.DataFrame([new_user])], ignore_index=True)
        users_df.to_csv('zkteco_users.csv', index=False)
        
        return jsonify({'success': True, 'message': 'User added successfully', 'uid': new_uid})
    except Exception as e:
        return jsonify({'success': False, 'message': f'Error adding user: {str(e)}'})

@app.route('/api/stats')
def api_stats():
    """API endpoint for dashboard statistics"""
    return jsonify(stats)

@app.route('/api/attendance')
def api_attendance():
    """API endpoint for attendance data"""
    try:
        # Get query parameters
        uid = request.args.get('uid', type=int)
        start_date = request.args.get('start_date')
        end_date = request.args.get('end_date')
        limit = request.args.get('limit', type=int)
        
        # Filter data
        filtered_data = attendance_df.copy()
        
        if uid:
            filtered_data = filtered_data[filtered_data['uid'] == uid]
        
        if start_date:
            start_dt = pd.to_datetime(start_date)
            filtered_data = filtered_data[filtered_data['datetime'] >= start_dt]
        
        if end_date:
            end_dt = pd.to_datetime(end_date)
            filtered_data = filtered_data[filtered_data['datetime'] <= end_dt]
        
        # Sort by datetime descending
        filtered_data = filtered_data.sort_values('datetime', ascending=False)
        
        if limit:
            filtered_data = filtered_data.head(limit)
        
        # Convert to JSON format
        records = []
        for _, record in filtered_data.iterrows():
            records.append({
                'uid': int(record['uid']) if pd.notna(record['uid']) else 0,
                'name': str(record['name']) if pd.notna(record['name']) else 'Unknown',
                'timestamp': record['datetime'].strftime('%Y-%m-%d %H:%M:%S'),
                'status': int(record['status']) if pd.notna(record['status']) else 1,
                'status_name': stats['status_map'].get(int(record['status']) if pd.notna(record['status']) else 1, 'Check Out'),
                'verify_method': str(record.get('verify_method', 'FP')),
                'device_ip': str(record.get('device_ip', '10.10.19.171')),
                'device_name': str(record.get('device_name', '2nd Floor Device'))
            })
        
        return jsonify(records)
    except Exception as e:
        print(f"Error in /api/attendance: {e}")
        return jsonify([])  # Return empty array on error

@app.route('/api/status-distribution')
def api_status_distribution():
    """API endpoint for status distribution"""
    status_counts = attendance_df['status'].value_counts().sort_index()
    
    labels = [stats['status_map'].get(status, f'Status {status}') for status in status_counts.index]
    values = status_counts.values.tolist()
    
    return jsonify({
        'labels': labels,
        'values': values
    })

@app.route('/api/last-update')
def api_last_update():
    """API endpoint for last update time"""
    try:
        # Check the modification time of the corrected data file
        if os.path.exists('zkteco_attendance_final_corrected.csv'):
            mtime = os.path.getmtime('zkteco_attendance_final_corrected.csv')
            last_update = datetime.fromtimestamp(mtime).strftime('%Y-%m-%d %H:%M:%S')
        else:
            last_update = 'Unknown'
        
        return jsonify({'last_update': last_update})
    except:
        return jsonify({'last_update': 'Unknown'})

@app.route('/api/device-status')
def api_device_status():
    """API endpoint for device status"""
    check_device_status()
    
    # Get last sync times
    last_sync_times = {}
    try:
        if os.path.exists('zkteco_attendance_final_corrected.csv'):
            mtime = os.path.getmtime('zkteco_attendance_final_corrected.csv')
            last_sync_times['data'] = datetime.fromtimestamp(mtime).strftime('%Y-%m-%d %H:%M:%S')
        else:
            last_sync_times['data'] = 'Never'
    except:
        last_sync_times['data'] = 'Unknown'
    
    return jsonify({
        'devices': [
            {
                'name': '2nd Floor Device',
                'ip': '10.10.19.171',
                'status': 'online' if device_status['2nd_floor'] else 'offline',
                'floor': '2nd Floor',
                'last_sync': last_sync_times['data']
            },
            {
                'name': '1st Floor Device',
                'ip': '10.10.19.172',
                'status': 'online' if device_status['1st_floor'] else 'offline',
                'floor': '1st Floor',
                'last_sync': last_sync_times['data']
            }
        ],
        'last_data_sync': last_sync_times['data']
    })

@app.route('/api/refresh-data', methods=['POST'])
def api_refresh_data():
    """API endpoint to refresh data from devices"""
    try:
        import subprocess
        
        # Run the enhanced data extraction script
        result = subprocess.run(
            ['python', 'update.py'], 
            capture_output=True, 
            text=True,
            timeout=300  # 5 minute timeout
        )
        
        if result.returncode == 0:
            # Also run user mapping correction if needed
            mapping_result = subprocess.run(
                ['python', 'create_correct_mapping.py'], 
                capture_output=True, 
                text=True,
                timeout=60
            )
            
            # Reload data in the application
            load_corrected_data()
            
            return jsonify({
                'success': True, 
                'message': 'Data refreshed successfully from devices',
                'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                'extraction_output': result.stdout,
                'mapping_success': mapping_result.returncode == 0
            })
        else:
            return jsonify({
                'success': False, 
                'message': 'Data extraction failed', 
                'error': result.stderr,
                'output': result.stdout
            })
            
    except subprocess.TimeoutExpired:
        return jsonify({
            'success': False, 
            'message': 'Data extraction timed out (5 minutes)',
            'error': 'Process took too long to complete'
        })
    except Exception as e:
        return jsonify({
            'success': False, 
            'message': 'Error refreshing data', 
            'error': str(e)
        })

@app.route('/raw-data')
def raw_data_viewer():
    """Raw device data viewer page"""
    return render_template('raw_data_viewer.html', stats=stats)

@app.route('/api/raw-data/<device_floor>')
def api_raw_data(device_floor):
    """Get raw data from specific device with date filtering and user names"""
    try:
        # Get query parameters for filtering
        start_date = request.args.get('start_date')
        end_date = request.args.get('end_date')
        limit = int(request.args.get('limit', 100))
        
        # Map floor to IP
        device_ips = {
            '1st_floor': '10.10.19.172',
            '2nd_floor': '10.10.19.171'
        }
        
        device_ip = device_ips.get(device_floor)
        if not device_ip:
            return jsonify({'success': False, 'message': 'Invalid device floor'})
        
        # Try to extract raw data from the specific device
        from zk import ZK
        conn = ZK(device_ip, port=4370, timeout=30, password=0, force_udp=False, ommit_ping=True)
        
        try:
            conn.connect()
            
            # Get device info
            device_info = {
                'ip': device_ip,
                'name': conn.get_device_name() if hasattr(conn, 'get_device_name') else f'{device_floor.replace("_", " ").title()} Device',
                'platform': conn.get_platform() if hasattr(conn, 'get_platform') else 'Unknown',
                'firmware_version': conn.get_firmware_version() if hasattr(conn, 'get_firmware_version') else 'Unknown',
                'serialnumber': conn.get_serialnumber() if hasattr(conn, 'get_serialnumber') else 'Unknown',
                'device_name': conn.get_device_name() if hasattr(conn, 'get_device_name') else 'Unknown'
            }
            
            # Get raw users for name mapping
            users = conn.get_users()
            user_mapping = {}
            raw_users = []
            for user in users:
                user_mapping[user.uid] = user.name
                raw_users.append({
                    'uid': user.uid,
                    'name': user.name,
                    'privilege': user.privilege,
                    'password': user.password,
                    'group_id': user.group_id,
                    'user_id': user.user_id
                })
            
            # Get raw attendance with filtering
            attendances = conn.get_attendance()
            raw_attendance = []
            
            # Filter by date if provided
            filtered_attendances = []
            for att in attendances:
                # Apply date filtering
                if start_date:
                    start_dt = datetime.strptime(start_date, '%Y-%m-%d').date()
                    if att.timestamp.date() < start_dt:
                        continue
                
                if end_date:
                    end_dt = datetime.strptime(end_date, '%Y-%m-%d').date()
                    if att.timestamp.date() > end_dt:
                        continue
                
                filtered_attendances.append(att)
            
            # Sort by timestamp descending and apply limit
            filtered_attendances.sort(key=lambda x: x.timestamp, reverse=True)
            filtered_attendances = filtered_attendances[:limit]
            
            for att in filtered_attendances:
                raw_attendance.append({
                    'uid': att.uid,
                    'name': user_mapping.get(att.uid, f'Unknown User (UID: {att.uid})'),
                    'timestamp': att.timestamp.strftime('%Y-%m-%d %H:%M:%S'),
                    'date': att.timestamp.strftime('%Y-%m-%d'),
                    'time': att.timestamp.strftime('%H:%M:%S'),
                    'status': att.status,
                    'punch': att.punch
                })
            
            conn.disconnect()
            
            return jsonify({
                'success': True,
                'device_info': device_info,
                'users': raw_users,
                'attendance': raw_attendance,
                'total_users': len(raw_users),
                'total_records': len(raw_attendance),
                'filters_applied': {
                    'start_date': start_date,
                    'end_date': end_date,
                    'limit': limit
                }
            })
            
        except Exception as e:
            conn.disconnect()
            return jsonify({
                'success': False,
                'message': f'Device connection failed: {str(e)}',
                'device_ip': device_ip
            })
            
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error accessing device: {str(e)}'
        })

@app.route('/api/export-raw-data/<device_floor>')
def export_raw_data(device_floor):
    """Export raw data as CSV"""
    try:
        # Get raw data
        raw_data_response = api_raw_data(device_floor)
        data = raw_data_response.get_json()
        
        if not data.get('success'):
            return jsonify({'success': False, 'message': 'Failed to get raw data'})
        
        import io
        import csv as csv_module
        from flask import make_response
        
        output = io.StringIO()
        
        # Write attendance data
        writer = csv_module.writer(output)
        writer.writerow(['UID', 'Timestamp', 'Status', 'Punch', 'Device', 'IP'])
        
        for record in data['attendance']:
            writer.writerow([
                record['uid'],
                record['timestamp'],
                record['status'],
                record['punch'],
                device_floor.replace('_', ' ').title(),
                data['device_info']['ip']
            ])
        
        output.seek(0)
        
        response = make_response(output.getvalue())
        response.headers['Content-Type'] = 'text/csv'
        response.headers['Content-Disposition'] = f'attachment; filename=raw_data_{device_floor}_{datetime.now().strftime("%Y%m%d_%H%M%S")}.csv'
        
        return response
        
    except Exception as e:
        return jsonify({'success': False, 'message': f'Export failed: {str(e)}'})

if __name__ == '__main__':
    load_corrected_data()
    app.run(debug=True, host='0.0.0.0', port=8080)
