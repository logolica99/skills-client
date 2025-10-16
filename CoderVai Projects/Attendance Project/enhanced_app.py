#!/usr/bin/env python3
"""
Enhanced Flask Application for ZKTeco Attendance Management
Supports both basic and enhanced data formats with verification methods
"""

from flask import Flask, render_template, request, jsonify
import pandas as pd
import os
from datetime import datetime, timedelta
import subprocess

app = Flask(__name__)

# Global variables for data
users_df = None
attendance_df = None
enhanced_mode = False

def load_data():
    """Load attendance and user data from CSV files"""
    global users_df, attendance_df, enhanced_mode
    
    try:
        # Check if enhanced data exists
        if os.path.exists('zkteco_users_enhanced.csv') and os.path.exists('zkteco_attendance_enhanced.csv'):
            print("Loading enhanced data...")
            users_df = pd.read_csv('zkteco_users_enhanced.csv')
            attendance_df = pd.read_csv('zkteco_attendance_enhanced.csv')
            enhanced_mode = True
        else:
            print("Loading basic data...")
            # Load basic data
            users_df = pd.read_csv('zkteco_users.csv')
            attendance_df = pd.read_csv('zkteco_attendance_partial.csv', 
                                      names=['uid', 'timestamp', 'status'])
            enhanced_mode = False
        
        # Process attendance data
        attendance_df['timestamp'] = pd.to_datetime(attendance_df['timestamp'])
        
        if not enhanced_mode:
            # Add status names for basic data
            status_map = {
                0: 'Check In',
                1: 'Check Out', 
                2: 'Break Out',
                3: 'Break In',
                4: 'Overtime In',
                5: 'Overtime Out'
            }
            attendance_df['status_name'] = attendance_df['status'].map(status_map).fillna('Unknown')
            attendance_df['verify_method'] = 'Unknown'
        
        # Merge with user data to get names
        attendance_df = attendance_df.merge(users_df[['uid', 'name']], on='uid', how='left')
        attendance_df['name'] = attendance_df['name'].fillna('Unknown User')
        
        print(f"Loaded {len(users_df)} users and {len(attendance_df)} attendance records")
        print(f"Enhanced mode: {enhanced_mode}")
        
    except Exception as e:
        print(f"Error loading data: {e}")
        # Create empty dataframes as fallback
        users_df = pd.DataFrame(columns=['uid', 'name', 'card'])
        attendance_df = pd.DataFrame(columns=['uid', 'timestamp', 'status', 'status_name', 'name'])

def get_user_stats():
    """Get basic statistics about users and attendance"""
    if users_df is None or attendance_df is None:
        return {}
    
    total_users = len(users_df)
    active_users = len(attendance_df['uid'].unique())
    total_records = len(attendance_df)
    
    if total_records > 0:
        date_range = {
            'start': attendance_df['timestamp'].min().strftime('%Y-%m-%d'),
            'end': attendance_df['timestamp'].max().strftime('%Y-%m-%d')
        }
    else:
        date_range = {'start': 'No data', 'end': 'No data'}
    
    return {
        'total_users': total_users,
        'active_users': active_users,
        'total_records': total_records,
        'date_range': date_range,
        'enhanced_mode': enhanced_mode
    }

@app.route('/')
def index():
    """Dashboard page"""
    stats = get_user_stats()
    return render_template('enhanced_index.html', stats=stats)

@app.route('/daily')
def daily():
    """Daily attendance view"""
    selected_date = request.args.get('date')
    if not selected_date:
        selected_date = datetime.now().strftime('%Y-%m-%d')
    
    # Filter attendance for the selected date
    daily_attendance = attendance_df[
        attendance_df['timestamp'].dt.date == pd.to_datetime(selected_date).date()
    ]
    
    # Group by user to get daily summary
    daily_summary = []
    for uid, group in daily_attendance.groupby('uid'):
        user_name = group['name'].iloc[0]
        records = group.sort_values('timestamp')
        
        first_in = None
        last_out = None
        working_hours = None
        
        # Find first check-in and last check-out
        check_ins = records[records['status'].isin([0, 4])]  # Check In or Overtime In
        check_outs = records[records['status'].isin([1, 5])]  # Check Out or Overtime Out
        
        if len(check_ins) > 0:
            first_in = check_ins.iloc[0]['timestamp'].strftime('%H:%M:%S')
        
        if len(check_outs) > 0:
            last_out = check_outs.iloc[-1]['timestamp'].strftime('%H:%M:%S')
        
        # Calculate working hours if both exist
        if len(check_ins) > 0 and len(check_outs) > 0:
            time_diff = check_outs.iloc[-1]['timestamp'] - check_ins.iloc[0]['timestamp']
            working_hours = time_diff.total_seconds() / 3600
        
        daily_summary.append({
            'uid': uid,
            'name': user_name,
            'first_in': first_in,
            'last_out': last_out,
            'working_hours': working_hours,
            'total_entries': len(records),
            'date': selected_date
        })
    
    return render_template('enhanced_daily.html', 
                         attendance=daily_summary, 
                         date=selected_date,
                         enhanced_mode=enhanced_mode)

@app.route('/monthly')
def monthly():
    """Monthly attendance view"""
    selected_month = request.args.get('month', datetime.now().strftime('%Y-%m'))
    
    # Filter for selected month
    month_start = pd.to_datetime(selected_month + '-01')
    month_end = month_start + pd.DateOffset(months=1) - pd.DateOffset(days=1)
    
    monthly_attendance = attendance_df[
        (attendance_df['timestamp'] >= month_start) & 
        (attendance_df['timestamp'] <= month_end)
    ]
    
    # Group by user for monthly summary
    monthly_summary = []
    for uid, group in monthly_attendance.groupby('uid'):
        user_name = group['name'].iloc[0]
        
        # Count working days
        working_days = group['timestamp'].dt.date.nunique()
        total_records = len(group)
        
        # Calculate average working hours
        daily_hours = []
        for date, day_group in group.groupby(group['timestamp'].dt.date):
            check_ins = day_group[day_group['status'].isin([0, 4])]
            check_outs = day_group[day_group['status'].isin([1, 5])]
            
            if len(check_ins) > 0 and len(check_outs) > 0:
                time_diff = check_outs.iloc[-1]['timestamp'] - check_ins.iloc[0]['timestamp']
                daily_hours.append(time_diff.total_seconds() / 3600)
        
        avg_hours = sum(daily_hours) / len(daily_hours) if daily_hours else 0
        total_hours = sum(daily_hours)
        
        monthly_summary.append({
            'uid': uid,
            'name': user_name,
            'working_days': working_days,
            'total_records': total_records,
            'avg_hours': avg_hours,
            'total_hours': total_hours
        })
    
    return render_template('enhanced_monthly.html', 
                         attendance=monthly_summary, 
                         month=selected_month,
                         enhanced_mode=enhanced_mode)

@app.route('/users')
def users():
    """Users management page"""
    return render_template('enhanced_users.html', 
                         users=users_df.to_dict('records'),
                         enhanced_mode=enhanced_mode)

@app.route('/verification-analysis')
def verification_analysis():
    """New page for verification method analysis"""
    if not enhanced_mode:
        return render_template('enhanced_verification.html', 
                             enhanced_mode=False,
                             message="Enhanced data not available. Please run enhanced_update.py first.")
    
    # Analyze verification methods
    verify_stats = attendance_df['verify_method'].value_counts().to_dict()
    
    # Daily verification trends
    daily_verify = attendance_df.groupby([
        attendance_df['timestamp'].dt.date, 
        'verify_method'
    ]).size().reset_index(name='count')
    
    return render_template('enhanced_verification.html',
                         enhanced_mode=True,
                         verify_stats=verify_stats,
                         daily_verify=daily_verify.to_dict('records'))

@app.route('/api/attendance')
def api_attendance():
    """API endpoint for attendance data"""
    uid = request.args.get('uid')
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    
    filtered_data = attendance_df.copy()
    
    if uid:
        filtered_data = filtered_data[filtered_data['uid'] == int(uid)]
    
    if start_date:
        filtered_data = filtered_data[filtered_data['timestamp'] >= start_date]
    
    if end_date:
        filtered_data = filtered_data[filtered_data['timestamp'] <= end_date]
    
    # Prepare response with enhanced fields
    result = filtered_data[['uid', 'name', 'timestamp', 'status_name']].copy()
    if enhanced_mode:
        result['verify_method'] = filtered_data['verify_method']
    
    result['timestamp'] = result['timestamp'].dt.strftime('%Y-%m-%d %H:%M:%S')
    
    return jsonify(result.to_dict('records'))

@app.route('/api/stats')
def api_stats():
    """API endpoint for statistics"""
    return jsonify(get_user_stats())

@app.route('/api/refresh-data', methods=['POST'])
def api_refresh_data():
    """API endpoint to refresh data from ZKTeco device"""
    try:
        # Try enhanced extraction first
        result = subprocess.run(
            ['python', 'enhanced_update.py'], 
            capture_output=True, 
            text=True, 
            timeout=300,
            cwd=os.path.dirname(os.path.abspath(__file__))
        )
        
        if result.returncode == 0:
            load_data()
            stats = get_user_stats()
            return jsonify({
                'success': True,
                'message': f'Enhanced data updated! {stats["total_records"]} records from {stats["active_users"]} users',
                'enhanced_mode': enhanced_mode
            })
        else:
            # Fallback to basic extraction
            result = subprocess.run(
                ['python', 'update.py'], 
                capture_output=True, 
                text=True, 
                timeout=300,
                cwd=os.path.dirname(os.path.abspath(__file__))
            )
            
            if result.returncode == 0:
                load_data()
                stats = get_user_stats()
                return jsonify({
                    'success': True,
                    'message': f'Basic data updated! {stats["total_records"]} records from {stats["active_users"]} users',
                    'enhanced_mode': enhanced_mode
                })
            else:
                return jsonify({
                    'success': False,
                    'message': f'Update failed: {result.stderr}'
                })
            
    except subprocess.TimeoutExpired:
        return jsonify({
            'success': False,
            'message': 'Update timed out. Please check device connection.'
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error during update: {str(e)}'
        })

@app.route('/api/verification-distribution')
def api_verification_distribution():
    """API endpoint for verification method distribution"""
    if not enhanced_mode:
        return jsonify({'error': 'Enhanced mode not available'})
    
    verify_counts = attendance_df['verify_method'].value_counts()
    
    return jsonify({
        'labels': verify_counts.index.tolist(),
        'values': verify_counts.values.tolist()
    })

@app.route('/api/status-distribution')
def api_status_distribution():
    """API endpoint for status code distribution"""
    status_counts = attendance_df['status'].value_counts().sort_index()
    
    status_map = {
        0: 'Check In',
        1: 'Check Out', 
        2: 'Break Out',
        3: 'Break In',
        4: 'Overtime In',
        5: 'Overtime Out'
    }
    
    labels = []
    values = []
    
    for status_code, count in status_counts.items():
        labels.append(f"{status_map.get(status_code, 'Unknown')} ({status_code})")
        values.append(int(count))
    
    return jsonify({
        'labels': labels,
        'values': values
    })

@app.route('/api/last-update')
def api_last_update():
    """API endpoint for last update time"""
    try:
        # Check enhanced data first
        files_to_check = [
            'zkteco_attendance_enhanced.csv',
            'zkteco_attendance_partial.csv'
        ]
        
        for file_path in files_to_check:
            if os.path.exists(file_path):
                mtime = os.path.getmtime(file_path)
                last_update = datetime.fromtimestamp(mtime).strftime('%Y-%m-%d %H:%M:%S')
                return jsonify({
                    'last_update': last_update,
                    'file': file_path
                })
        
        return jsonify({
            'last_update': 'No data files found'
        })
    except Exception as e:
        return jsonify({
            'last_update': f'Error: {str(e)}'
        })

if __name__ == '__main__':
    load_data()
    app.run(debug=True, host='0.0.0.0', port=8080)
