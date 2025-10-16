#!/usr/bin/env python3
"""
ACS FUTURE SCHOOL Attendance Management System
Enhanced with multi-floor support and individual user dashboards
"""

from flask import Flask, render_template, jsonify, request
import pandas as pd
from datetime import datetime, timedelta
import json
import os

app = Flask(__name__)

# Global variables for data
attendance_df = None
users_df = None
stats = {}

def load_multi_floor_data():
    """Load attendance data with floor support"""
    global attendance_df, users_df, stats
    
    try:
        # Try to load combined data first
        if os.path.exists('zkteco_attendance_combined.csv') and os.path.exists('zkteco_users_combined.csv'):
            print("📊 Loading multi-floor combined data...")
            attendance_df = pd.read_csv('zkteco_attendance_combined.csv')
            users_df = pd.read_csv('zkteco_users_combined.csv')
        
        # Fallback to corrected data
        elif os.path.exists('zkteco_attendance_final_corrected.csv'):
            print("📊 Loading corrected single-floor data...")
            attendance_df = pd.read_csv('zkteco_attendance_final_corrected.csv')
            users_df = pd.read_csv('zkteco_users.csv')
            
            # Add floor information for backward compatibility
            attendance_df['floor'] = '2nd_floor'
            users_df['floor'] = '2nd_floor'
        
        # Last fallback to original data
        else:
            print("📊 Loading original data...")
            attendance_df = pd.read_csv('zkteco_attendance_partial.csv', names=['uid', 'timestamp', 'status'])
            users_df = pd.read_csv('zkteco_users.csv')
            
            # Add default floor and missing columns
            attendance_df['floor'] = '2nd_floor'
            attendance_df['verify_method'] = 'FP'
            attendance_df['device_uid'] = attendance_df['uid']
            users_df['floor'] = '2nd_floor'
        
        # Ensure datetime column
        attendance_df['datetime'] = pd.to_datetime(attendance_df['timestamp'])
        
        # Merge attendance with user names
        attendance_df = attendance_df.merge(
            users_df[['uid', 'name', 'floor']], 
            on=['uid', 'floor'], 
            how='left'
        )
        
        # Fill missing names
        attendance_df['name'] = attendance_df['name'].fillna('Unknown User')
        
        # Calculate stats
        stats = calculate_multi_floor_stats()
        
        print(f"✅ Loaded data: {len(attendance_df)} records, {len(users_df)} users")
        
    except Exception as e:
        print(f"❌ Error loading data: {e}")
        # Initialize empty dataframes
        attendance_df = pd.DataFrame()
        users_df = pd.DataFrame()
        stats = {}

def calculate_multi_floor_stats():
    """Calculate statistics with floor breakdown"""
    if attendance_df is None or users_df is None or len(attendance_df) == 0:
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
    
    # Overall stats
    total_users = len(users_df)
    active_users_today = len(today_data['uid'].unique())
    total_records = len(attendance_df)
    today_records = len(today_data)
    
    # Floor-wise stats
    floor_stats = {}
    floors = attendance_df['floor'].unique() if 'floor' in attendance_df.columns else ['2nd_floor']
    
    for floor in floors:
        floor_attendance = attendance_df[attendance_df['floor'] == floor]
        floor_users = users_df[users_df['floor'] == floor] if 'floor' in users_df.columns else users_df
        floor_today = today_data[today_data['floor'] == floor] if 'floor' in today_data.columns else today_data
        
        floor_stats[floor] = {
            'total_users': len(floor_users),
            'active_today': len(floor_today['uid'].unique()) if len(floor_today) > 0 else 0,
            'total_records': len(floor_attendance),
            'today_records': len(floor_today),
            'name': '1st Floor' if floor == '1st_floor' else '2nd Floor'
        }
    
    # Date range
    if len(attendance_df) > 0:
        date_range = {
            'start': attendance_df['datetime'].min().strftime('%Y-%m-%d'),
            'end': attendance_df['datetime'].max().strftime('%Y-%m-%d')
        }
    else:
        date_range = {'start': 'N/A', 'end': 'N/A'}
    
    return {
        'total_users': total_users,
        'active_users': active_users_today,
        'total_records': total_records,
        'today_records': today_records,
        'date_range': date_range,
        'status_map': status_map,
        'floors': floor_stats,
        'available_floors': list(floors)
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
    floor_filter = request.args.get('floor', 'all')
    return render_template('acs_index.html', stats=stats, floor_filter=floor_filter)

@app.route('/daily')
def daily():
    """Daily attendance page with floor filtering"""
    # Get parameters
    date_str = request.args.get('date', datetime.now().strftime('%Y-%m-%d'))
    floor_filter = request.args.get('floor', 'all')
    
    try:
        selected_date = datetime.strptime(date_str, '%Y-%m-%d').date()
    except:
        selected_date = datetime.now().date()
    
    # Filter data for selected date
    daily_data = attendance_df[attendance_df['datetime'].dt.date == selected_date]
    
    # Apply floor filter
    if floor_filter != 'all' and 'floor' in daily_data.columns:
        daily_data = daily_data[daily_data['floor'] == floor_filter]
    
    # Group by user and calculate stats
    user_stats = []
    
    for uid in daily_data['uid'].unique():
        user_records = daily_data[daily_data['uid'] == uid].sort_values('datetime')
        
        if len(user_records) > 0:
            user_name = user_records['name'].iloc[0]
            user_floor = user_records['floor'].iloc[0] if 'floor' in user_records.columns else '2nd_floor'
            
            # Calculate working hours and times
            working_hours, first_time, last_time = calculate_working_hours(user_records)
            
            # Determine status based on number of entries
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
                'floor': user_floor,
                'floor_name': '1st Floor' if user_floor == '1st_floor' else '2nd Floor',
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
                        'floor': record.get('floor', '2nd_floor')
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
    
    return render_template('acs_daily.html', 
                         date=selected_date.strftime('%Y-%m-%d'),
                         user_stats=user_stats,
                         summary=summary,
                         stats=stats,
                         floor_filter=floor_filter)

@app.route('/user/<int:uid>')
def user_dashboard(uid):
    """Individual user dashboard"""
    floor_filter = request.args.get('floor', 'all')
    
    # Get user info
    user_info = users_df[users_df['uid'] == uid]
    if len(user_info) == 0:
        return "User not found", 404
    
    user_info = user_info.iloc[0]
    
    # Get user's attendance data
    user_attendance = attendance_df[attendance_df['uid'] == uid].copy()
    
    if len(user_attendance) == 0:
        return render_template('acs_user_dashboard.html', 
                             user=user_info, 
                             stats={'total_records': 0}, 
                             floor_filter=floor_filter)
    
    # Calculate user statistics
    user_attendance['date'] = user_attendance['datetime'].dt.date
    
    # Daily stats
    daily_stats = []
    for date in user_attendance['date'].unique():
        day_records = user_attendance[user_attendance['date'] == date]
        working_hours, first_time, last_time = calculate_working_hours(day_records)
        
        daily_stats.append({
            'date': date.strftime('%Y-%m-%d'),
            'records': len(day_records),
            'working_hours': working_hours,
            'first_time': first_time.strftime('%H:%M:%S') if first_time else None,
            'last_time': last_time.strftime('%H:%M:%S') if last_time else None
        })
    
    # Monthly stats
    user_attendance['month'] = user_attendance['datetime'].dt.to_period('M')
    monthly_stats = []
    
    for month in user_attendance['month'].unique():
        month_records = user_attendance[user_attendance['month'] == month]
        month_days = len(month_records['date'].unique())
        month_hours = sum([calculate_working_hours(month_records[month_records['date'] == date])[0] 
                          for date in month_records['date'].unique()])
        
        monthly_stats.append({
            'month': str(month),
            'days': month_days,
            'total_hours': month_hours,
            'avg_hours': month_hours / month_days if month_days > 0 else 0,
            'records': len(month_records)
        })
    
    user_stats = {
        'total_records': len(user_attendance),
        'total_days': len(user_attendance['date'].unique()),
        'total_hours': sum([s['working_hours'] for s in daily_stats]),
        'avg_daily_hours': sum([s['working_hours'] for s in daily_stats]) / len(daily_stats) if daily_stats else 0,
        'daily_stats': daily_stats[-30:],  # Last 30 days
        'monthly_stats': monthly_stats[-12:]  # Last 12 months
    }
    
    return render_template('acs_user_dashboard.html', 
                         user=user_info, 
                         stats=user_stats,
                         floor_filter=floor_filter)

@app.route('/api/attendance')
def api_attendance():
    """API endpoint for attendance data with floor filtering"""
    try:
        # Get query parameters
        uid = request.args.get('uid', type=int)
        start_date = request.args.get('start_date')
        end_date = request.args.get('end_date')
        limit = request.args.get('limit', type=int)
        floor = request.args.get('floor', 'all')
        
        # Filter data
        filtered_data = attendance_df.copy()
        
        if uid:
            filtered_data = filtered_data[filtered_data['uid'] == uid]
        
        if floor != 'all' and 'floor' in filtered_data.columns:
            filtered_data = filtered_data[filtered_data['floor'] == floor]
        
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
                'floor': str(record.get('floor', '2nd_floor')),
                'floor_name': '1st Floor' if record.get('floor', '2nd_floor') == '1st_floor' else '2nd Floor'
            })
        
        return jsonify(records)
    except Exception as e:
        print(f"Error in /api/attendance: {e}")
        return jsonify([])

@app.route('/api/stats')
def api_stats():
    """API endpoint for dashboard statistics"""
    floor = request.args.get('floor', 'all')
    
    if floor == 'all':
        return jsonify(stats)
    else:
        # Return floor-specific stats
        floor_data = stats.get('floors', {}).get(floor, {})
        return jsonify({
            'total_users': floor_data.get('total_users', 0),
            'active_users': floor_data.get('active_today', 0),
            'total_records': floor_data.get('total_records', 0),
            'today_records': floor_data.get('today_records', 0),
            'floor_name': floor_data.get('name', 'Unknown Floor'),
            'status_map': stats.get('status_map', {})
        })

@app.route('/api/user-chart-data/<int:uid>')
def api_user_chart_data(uid):
    """API endpoint for user chart data"""
    period = request.args.get('period', 'monthly')  # daily, weekly, monthly
    
    user_data = attendance_df[attendance_df['uid'] == uid].copy()
    
    if len(user_data) == 0:
        return jsonify({'labels': [], 'data': []})
    
    user_data['date'] = user_data['datetime'].dt.date
    
    if period == 'daily':
        # Last 30 days
        labels = []
        data = []
        
        for i in range(29, -1, -1):
            date = (datetime.now().date() - timedelta(days=i))
            day_records = user_data[user_data['date'] == date]
            working_hours = calculate_working_hours(day_records)[0] if len(day_records) > 0 else 0
            
            labels.append(date.strftime('%m-%d'))
            data.append(round(working_hours, 2))
    
    elif period == 'weekly':
        # Last 12 weeks
        labels = []
        data = []
        
        for i in range(11, -1, -1):
            week_start = datetime.now().date() - timedelta(weeks=i)
            week_end = week_start + timedelta(days=6)
            
            week_records = user_data[
                (user_data['date'] >= week_start) & 
                (user_data['date'] <= week_end)
            ]
            
            total_hours = 0
            for date in week_records['date'].unique():
                day_records = week_records[week_records['date'] == date]
                total_hours += calculate_working_hours(day_records)[0]
            
            labels.append(f"Week {week_start.strftime('%m-%d')}")
            data.append(round(total_hours, 2))
    
    else:  # monthly
        # Last 12 months
        user_data['month'] = user_data['datetime'].dt.to_period('M')
        labels = []
        data = []
        
        for i in range(11, -1, -1):
            month = pd.Period.now('M') - i
            month_records = user_data[user_data['month'] == month]
            
            total_hours = 0
            for date in month_records['date'].unique():
                day_records = month_records[month_records['date'] == date]
                total_hours += calculate_working_hours(day_records)[0]
            
            labels.append(month.strftime('%Y-%m'))
            data.append(round(total_hours, 2))
    
    return jsonify({'labels': labels, 'data': data})

if __name__ == '__main__':
    load_multi_floor_data()
    app.run(debug=True, host='0.0.0.0', port=8080)
