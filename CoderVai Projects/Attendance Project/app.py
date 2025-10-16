from flask import Flask, render_template, request, jsonify, make_response, send_file
import pandas as pd
import json
from datetime import datetime, timedelta
import calendar
import os
from reportlab.lib.pagesizes import letter, A4
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors
from io import BytesIO
import subprocess

app = Flask(__name__)

# Global variables to store data
users_df = None
attendance_df = None

def load_data():
    """Load and prepare the CSV data"""
    global users_df, attendance_df
    
    # Load users data
    users_df = pd.read_csv('zkteco_users.csv')
    
    # Load attendance data
    attendance_df = pd.read_csv('zkteco_attendance_partial.csv', 
                               names=['uid', 'timestamp', 'status'])
    
    # Convert timestamp to datetime
    attendance_df['timestamp'] = pd.to_datetime(attendance_df['timestamp'])
    
    # Add date and time columns for easier filtering
    attendance_df['date'] = attendance_df['timestamp'].dt.date
    attendance_df['time'] = attendance_df['timestamp'].dt.time
    attendance_df['hour'] = attendance_df['timestamp'].dt.hour
    attendance_df['day_of_week'] = attendance_df['timestamp'].dt.day_name()
    attendance_df['week'] = attendance_df['timestamp'].dt.isocalendar().week
    attendance_df['month'] = attendance_df['timestamp'].dt.month
    attendance_df['year'] = attendance_df['timestamp'].dt.year
    
    # Map status codes to readable names
    status_map = {
        0: 'Check In',
        1: 'Check Out', 
        2: 'Break Out',
        3: 'Break In',
        4: 'Overtime In',
        5: 'Overtime Out'
    }
    attendance_df['status_name'] = attendance_df['status'].map(status_map).fillna('Unknown')
    
    # Merge with user data to get names
    attendance_df = attendance_df.merge(users_df[['uid', 'name']], on='uid', how='left')
    attendance_df['name'] = attendance_df['name'].fillna('Unknown User')

def get_user_stats():
    """Get basic statistics about users and attendance"""
    total_users = len(users_df)
    total_records = len(attendance_df)
    date_range = {
        'start': attendance_df['timestamp'].min().strftime('%Y-%m-%d'),
        'end': attendance_df['timestamp'].max().strftime('%Y-%m-%d')
    }
    
    # Active users (users with attendance records)
    active_users = attendance_df['uid'].nunique()
    
    return {
        'total_users': total_users,
        'active_users': active_users,
        'total_records': total_records,
        'date_range': date_range
    }

def get_daily_attendance(date_str=None):
    """Get attendance for a specific date with enhanced logic"""
    if date_str:
        target_date = pd.to_datetime(date_str).date()
        daily_data = attendance_df[attendance_df['date'] == target_date]
        selected_date = target_date
    else:
        # Get today's data or latest date if no data for today
        latest_date = attendance_df['date'].max()
        daily_data = attendance_df[attendance_df['date'] == latest_date]
        selected_date = latest_date
    
    # Get all users and mark absent ones
    all_users = set(users_df['uid'].unique())
    present_users = set(daily_data['uid'].unique()) if not daily_data.empty else set()
    
    daily_summary = []
    
    # Process present users
    for uid in present_users:
        user_data = daily_data[daily_data['uid'] == uid].sort_values('timestamp')
        user_name = user_data['name'].iloc[0]
        
        # Get all timestamps for this user
        all_entries = user_data['timestamp'].tolist()
        
        # Use first entry as check-in and last entry as check-out
        first_entry = all_entries[0] if all_entries else None
        last_entry = all_entries[-1] if len(all_entries) > 1 else None
        
        # Calculate working hours
        working_hours = None
        status = "Absent"
        
        if len(all_entries) == 1:
            status = "Checked In"
            working_hours = "NA"
        elif len(all_entries) > 1:
            if len(all_entries) > 2:
                status = "Multiple Entry"
            else:
                status = "Completed"
            # Calculate duration between first and last entry
            working_hours = (last_entry - first_entry).total_seconds() / 3600
            working_hours = round(working_hours, 2)
        
        daily_summary.append({
            'uid': uid,
            'name': user_name,
            'first_in': first_entry.strftime('%H:%M:%S') if first_entry else None,
            'last_out': last_entry.strftime('%H:%M:%S') if last_entry and last_entry != first_entry else None,
            'working_hours': working_hours,
            'total_entries': len(user_data),
            'status': status,
            'all_timestamps': [entry.strftime('%H:%M:%S') for entry in all_entries],
            'date': selected_date
        })
    
    # Add absent users
    absent_users = all_users - present_users
    for uid in absent_users:
        user_info = users_df[users_df['uid'] == uid]
        if not user_info.empty:
            user_name = user_info['name'].iloc[0]
            daily_summary.append({
                'uid': uid,
                'name': user_name,
                'first_in': None,
                'last_out': None,
                'working_hours': "NA",
                'total_entries': 0,
                'status': "Absent",
                'all_timestamps': [],
                'date': selected_date
        })
    
    return daily_summary

def get_monthly_stats(year=None, month=None):
    """Get monthly attendance statistics"""
    if not year:
        year = datetime.now().year
    if not month:
        month = datetime.now().month
    
    monthly_data = attendance_df[
        (attendance_df['year'] == year) & 
        (attendance_df['month'] == month)
    ]
    
    # Get unique working days
    working_days = monthly_data['date'].nunique()
    
    # User attendance summary
    user_summary = []
    for uid in monthly_data['uid'].unique():
        user_data = monthly_data[monthly_data['uid'] == uid]
        user_name = user_data['name'].iloc[0]
        
        # Count unique days user was present
        days_present = user_data['date'].nunique()
        
        # Calculate average working hours
        daily_hours = []
        for date in user_data['date'].unique():
            day_data = user_data[user_data['date'] == date]
            check_ins = day_data[day_data['status'].isin([0, 4])]
            check_outs = day_data[day_data['status'].isin([1, 5])]
            
            if not check_ins.empty and not check_outs.empty:
                first_in = check_ins['timestamp'].min()
                last_out = check_outs['timestamp'].max()
                if pd.notna(first_in) and pd.notna(last_out):
                    hours = (last_out - first_in).total_seconds() / 3600
                    daily_hours.append(hours)
        
        avg_hours = sum(daily_hours) / len(daily_hours) if daily_hours else 0
        attendance_rate = (days_present / working_days * 100) if working_days > 0 else 0
        
        user_summary.append({
            'uid': uid,
            'name': user_name,
            'days_present': days_present,
            'working_days': working_days,
            'attendance_rate': round(attendance_rate, 1),
            'avg_working_hours': round(avg_hours, 2),
            'total_entries': len(user_data)
        })
    
    return user_summary

@app.route('/')
def index():
    """Main dashboard page"""
    stats = get_user_stats()
    return render_template('index.html', stats=stats)

@app.route('/daily')
def daily():
    """Daily attendance view"""
    date = request.args.get('date')
    daily_data = get_daily_attendance(date)
    return render_template('daily.html', attendance=daily_data, date=date)

@app.route('/monthly')
def monthly():
    """Monthly attendance view"""
    year = request.args.get('year', type=int)
    month = request.args.get('month', type=int)
    monthly_data = get_monthly_stats(year, month)
    return render_template('monthly.html', attendance=monthly_data, year=year, month=month)

@app.route('/users')
def users():
    """Users management page"""
    return render_template('users.html', users=users_df.to_dict('records'))

@app.route('/user/<int:uid>')
def user_profile(uid):
    """Individual user profile page"""
    # Get user information
    user_data = users_df[users_df['uid'] == uid]
    if user_data.empty:
        return render_template('error.html', message='User not found'), 404
    
    user = user_data.iloc[0].to_dict()
    
    # Get user's attendance data
    user_attendance = attendance_df[attendance_df['uid'] == uid].copy()
    
    # Calculate statistics
    stats = {
        'total_records': len(user_attendance),
        'total_days': user_attendance['date'].nunique() if not user_attendance.empty else 0,
        'total_hours': 0,
        'avg_hours': 0,
        'daily_stats': []
    }
    
    if not user_attendance.empty:
        # Calculate daily stats
        daily_hours = []
        for date in user_attendance['date'].unique():
            day_data = user_attendance[user_attendance['date'] == date].sort_values('timestamp')
            first_time = day_data['timestamp'].min()
            last_time = day_data['timestamp'].max()
            
            working_hours = 0
            status = "Incomplete"
            if len(day_data) > 1:
                working_hours = (last_time - first_time).total_seconds() / 3600
                status = "Completed"
                daily_hours.append(working_hours)
            
            stats['daily_stats'].append({
                'date': date.strftime('%Y-%m-%d'),
                'first_time': first_time.strftime('%H:%M:%S'),
                'last_time': last_time.strftime('%H:%M:%S') if last_time != first_time else None,
                'working_hours': working_hours,
                'records': len(day_data),
                'status': status
            })
        
        stats['total_hours'] = sum(daily_hours)
        stats['avg_hours'] = stats['total_hours'] / len(daily_hours) if daily_hours else 0
    
    # Sort daily stats by date (most recent first)
    stats['daily_stats'] = sorted(stats['daily_stats'], key=lambda x: x['date'], reverse=True)
    
    return render_template('user_profile.html', user=user, stats=stats)

@app.route('/user/<int:uid>/edit', methods=['POST'])
def edit_user(uid):
    """API endpoint to edit user information"""
    global users_df
    
    try:
        data = request.get_json()
        
        # Find user index
        user_idx = users_df[users_df['uid'] == uid].index
        if len(user_idx) == 0:
            return jsonify({'success': False, 'message': 'User not found'}), 404
        
        # Update user data
        idx = user_idx[0]
        if 'name' in data:
            users_df.at[idx, 'name'] = data['name']
        if 'department' in data:
            users_df.at[idx, 'department'] = data.get('department', '')
        if 'position' in data:
            users_df.at[idx, 'position'] = data.get('position', '')
        if 'phone' in data:
            users_df.at[idx, 'phone'] = data.get('phone', '')
        if 'email' in data:
            users_df.at[idx, 'email'] = data.get('email', '')
        if 'privilege' in data:
            users_df.at[idx, 'privilege'] = int(data.get('privilege', 0))
        
        # Save to CSV
        users_df.to_csv('zkteco_users.csv', index=False)
        
        # Reload data to update attendance_df with new names
        load_data()
        
        return jsonify({'success': True, 'message': 'User updated successfully'})
        
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/attendance')
def api_attendance():
    """API endpoint for attendance data"""
    uid = request.args.get('uid', type=int)
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    
    filtered_data = attendance_df.copy()
    
    if uid:
        filtered_data = filtered_data[filtered_data['uid'] == uid]
    
    if start_date:
        start_date = pd.to_datetime(start_date).date()
        filtered_data = filtered_data[filtered_data['date'] >= start_date]
    
    if end_date:
        end_date = pd.to_datetime(end_date).date()
        filtered_data = filtered_data[filtered_data['date'] <= end_date]
    
    # Convert to JSON-serializable format
    result = filtered_data[['uid', 'name', 'timestamp', 'status_name']].copy()
    result['timestamp'] = result['timestamp'].dt.strftime('%Y-%m-%d %H:%M:%S')
    
    return jsonify(result.to_dict('records'))

@app.route('/api/stats')
def api_stats():
    """API endpoint for statistics"""
    return jsonify(get_user_stats())

@app.route('/api/refresh-data', methods=['POST'])
def api_refresh_data():
    """API endpoint to refresh data from ZKTeco device"""
    import subprocess
    import os
    
    try:
        # Run the update script
        result = subprocess.run(
            ['python', 'update.py'], 
            capture_output=True, 
            text=True, 
            timeout=300,  # 5 minute timeout
            cwd=os.path.dirname(os.path.abspath(__file__))
        )
        
        if result.returncode == 0:
            # Reload data after successful update
            load_data()
            
            # Count new records
            stats = get_user_stats()
            
            return jsonify({
                'success': True,
                'message': f'Updated with {stats["total_records"]} total records from {stats["active_users"]} users'
            })
        else:
            return jsonify({
                'success': False,
                'message': f'Update script failed: {result.stderr}'
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
    import os
    from datetime import datetime
    
    try:
        # Get the modification time of the attendance CSV file
        file_path = 'zkteco_attendance_partial.csv'
        if os.path.exists(file_path):
            mtime = os.path.getmtime(file_path)
            last_update = datetime.fromtimestamp(mtime).strftime('%Y-%m-%d %H:%M:%S')
        else:
            last_update = 'File not found'
            
        return jsonify({
            'last_update': last_update,
            'auto_refresh': True,
            'next_refresh': (datetime.now() + timedelta(minutes=30)).strftime('%Y-%m-%d %H:%M:%S')
        })
    except Exception as e:
        return jsonify({
            'last_update': f'Error: {str(e)}',
            'auto_refresh': False,
            'next_refresh': 'Unknown'
        })

@app.route('/api/device-status')
def api_device_status():
    """API endpoint for device connectivity status"""
    import socket
    import time
    
    devices = [
        {'floor': '2nd Floor', 'ip': '10.10.19.171', 'name': '2nd Floor Device'},
        {'floor': '1st Floor', 'ip': '10.10.19.172', 'name': '1st Floor Device'}
    ]
    
    device_status = []
    
    for device in devices:
        try:
            # Try to ping the device (simplified check)
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.settimeout(2)  # 2 second timeout
            result = sock.connect_ex((device['ip'], 4370))  # ZKTeco default port
            sock.close()
            
            if result == 0:
                status = 'online'
                status_text = 'Online: Reachable from network'
                status_class = 'success'
            else:
                status = 'offline'
                status_text = 'Offline: Not reachable'
                status_class = 'danger'
                
        except Exception as e:
            status = 'offline'
            status_text = 'Offline: Not reachable'
            status_class = 'danger'
        
        device_status.append({
            'floor': device['floor'],
            'ip': device['ip'],
            'name': device['name'],
            'status': status,
            'status_text': status_text,
            'status_class': status_class,
            'last_check': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        })
    
    return jsonify({
        'devices': device_status,
        'last_check': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    })

@app.route('/api/daily-attendance-trend')
def api_daily_attendance_trend():
    """API endpoint for daily attendance trend data"""
    try:
        # Get the last 7 days of data
        end_date = datetime.now().date()
        start_date = end_date - timedelta(days=6)
        
        # Filter data for the last 7 days
        recent_data = attendance_df[
            (attendance_df['date'] >= start_date) & 
            (attendance_df['date'] <= end_date)
        ]
        
        # Group by date and count unique users
        daily_counts = recent_data.groupby('date')['uid'].nunique().reset_index()
        daily_counts.columns = ['date', 'count']
        
        # Create labels and data arrays
        labels = []
        data = []
        
        for i in range(7):
            current_date = start_date + timedelta(days=i)
            day_name = current_date.strftime('%a')  # Mon, Tue, etc.
            date_str = current_date.strftime('%Y-%m-%d')
            
            # Check if this is today
            is_today = current_date == datetime.now().date()
            if is_today:
                labels.append(f"{day_name} (Today)")
            else:
                labels.append(day_name)
            
            # Get count for this date
            count = daily_counts[daily_counts['date'] == current_date]['count'].iloc[0] if not daily_counts[daily_counts['date'] == current_date].empty else 0
            data.append(count)
        
        return jsonify({
            'labels': labels,
            'data': data,
            'date_range': {
                'start': start_date.strftime('%Y-%m-%d'),
                'end': end_date.strftime('%Y-%m-%d')
            }
        })
        
    except Exception as e:
        return jsonify({
            'labels': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            'data': [0, 0, 0, 0, 0, 0, 0],
            'error': str(e)
        })

@app.route('/api/daily-report/pdf')
def generate_daily_report_pdf():
    """Generate PDF report for daily attendance"""
    date = request.args.get('date')
    daily_data = get_daily_attendance(date)
    
    # Create PDF in memory
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4)
    story = []
    
    # Styles
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=18,
        textColor=colors.HexColor('#2c3e50'),
        alignment=1  # Center alignment
    )
    
    # Title
    report_date = date if date else datetime.now().strftime('%Y-%m-%d')
    title = Paragraph(f"Daily Attendance Report - {report_date}", title_style)
    story.append(title)
    story.append(Spacer(1, 0.3*inch))
    
    # Summary statistics
    total_employees = len(daily_data)
    present_employees = len([emp for emp in daily_data if emp['status'] != 'Absent'])
    completed_employees = len([emp for emp in daily_data if emp['status'] == 'Completed'])
    
    summary_data = [
        ['Summary', ''],
        ['Total Employees', str(total_employees)],
        ['Present Today', str(present_employees)],
        ['Completed Work', str(completed_employees)],
        ['Absent Today', str(total_employees - present_employees)]
    ]
    
    summary_table = Table(summary_data, colWidths=[2*inch, 1*inch])
    summary_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#3498db')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 12),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
        ('GRID', (0, 0), (-1, -1), 1, colors.black)
    ]))
    
    story.append(summary_table)
    story.append(Spacer(1, 0.3*inch))
    
    # Detailed attendance table
    detail_title = Paragraph("Detailed Attendance", styles['Heading2'])
    story.append(detail_title)
    story.append(Spacer(1, 0.2*inch))
    
    # Table headers
    table_data = [['Employee ID', 'Name', 'Check In', 'Check Out', 'Hours', 'Status']]
    
    # Add employee data
    for emp in daily_data:
        working_hours = emp['working_hours']
        if working_hours == "NA":
            hours_display = "NA"
        elif isinstance(working_hours, (int, float)):
            hours_display = f"{working_hours:.2f}h"
        else:
            hours_display = str(working_hours)
        
        table_data.append([
            str(emp['uid']),
            emp['name'][:25] + '...' if len(emp['name']) > 25 else emp['name'],
            emp['first_in'] or 'N/A',
            emp['last_out'] or 'N/A',
            hours_display,
            emp['status']
        ])
    
    # Create table
    detail_table = Table(table_data, colWidths=[0.8*inch, 2*inch, 0.8*inch, 0.8*inch, 0.6*inch, 1*inch])
    detail_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#34495e')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 10),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.white),
        ('ALTERNATEROWCOLORS', (0, 1), (-1, -1), [colors.white, colors.lightgrey]),
        ('GRID', (0, 0), (-1, -1), 1, colors.black),
        ('FONTSIZE', (0, 1), (-1, -1), 8)
    ]))
    
    story.append(detail_table)
    
    # Footer
    story.append(Spacer(1, 0.5*inch))
    footer = Paragraph(f"Generated on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} | ACS FUTURE SCHOOL", styles['Normal'])
    story.append(footer)
    
    # Build PDF
    doc.build(story)
    buffer.seek(0)
    
    # Return PDF response
    response = make_response(buffer.getvalue())
    response.headers['Content-Type'] = 'application/pdf'
    response.headers['Content-Disposition'] = f'attachment; filename=daily_report_{report_date}.pdf'
    
    return response

@app.route('/api/manual-checkout', methods=['POST'])
def manual_checkout():
    """API endpoint for manual checkout"""
    data = request.get_json()
    uid = data.get('uid')
    checkout_time = data.get('checkout_time')
    date = data.get('date')
    
    if not uid or not checkout_time or not date:
        return jsonify({'success': False, 'message': 'Missing required parameters'})
    
    try:
        # Here you would normally update the database or CSV file
        # For now, we'll simulate the response
        return jsonify({
            'success': True,
            'message': f'Manual checkout recorded for user {uid} at {checkout_time}'
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error recording manual checkout: {str(e)}'
        })

@app.route('/raw-data')
def raw_data_viewer():
    """Raw data viewer page with corrected user names"""
    return render_template('raw_data_viewer.html')

@app.route('/api/raw-data/<device_floor>')
def get_raw_data(device_floor):
    """Get raw data from device with proper user name mapping"""
    try:
        # Simulate device connection and data retrieval
        # In real implementation, this would connect to the actual device
        
        start_date = request.args.get('start_date', '2025-10-07')
        end_date = request.args.get('end_date', '2025-10-14')
        limit = int(request.args.get('limit', 100))
        
        # Filter attendance data based on parameters
        filtered_data = attendance_df.copy()
        
        if start_date:
            start_date_parsed = pd.to_datetime(start_date).date()
            filtered_data = filtered_data[filtered_data['date'] >= start_date_parsed]
        
        if end_date:
            end_date_parsed = pd.to_datetime(end_date).date()
            filtered_data = filtered_data[filtered_data['date'] <= end_date_parsed]
        
        # Limit results
        filtered_data = filtered_data.tail(limit)
        
        # Prepare attendance records with proper names
        attendance_records = []
        for _, record in filtered_data.iterrows():
            # Look up user name from users_df
            uid = record['uid']
            user_info = users_df[users_df['uid'] == uid]
            if not user_info.empty:
                user_name = user_info.iloc[0]['name']
            else:
                user_name = f'Unknown User (UID: {uid})'
            
            attendance_records.append({
                'uid': uid,
                'name': user_name,
                'date': record['date'].strftime('%Y-%m-%d'),
                'time': record['time'].strftime('%H:%M:%S'),
                'status': record['status']
            })
        
        # Prepare user records
        user_records = []
        for _, user in users_df.iterrows():
            user_records.append({
                'uid': user['uid'],
                'name': user['name'],
                'privilege': user.get('privilege', 0),
                'group_id': user.get('group_id', 0),
                'user_id': user.get('user_id', user['uid'])
            })
        
        response_data = {
            'success': True,
            'attendance': attendance_records,
            'users': user_records,
            'device_info': {
                'ip': '10.10.19.171' if '2nd' in device_floor else '10.10.19.172',
                'name': f'{device_floor.replace("_", " ").title()} Device',
                'platform': 'ZKTeco',
                'firmware_version': '6.60',
                'serialnumber': 'ACS2025001'
            },
            'total_users': len(user_records),
            'filters_applied': {
                'start_date': start_date,
                'end_date': end_date,
                'limit': limit
            }
        }
        
        return jsonify(response_data)
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error retrieving data: {str(e)}'
        })

if __name__ == '__main__':
    load_data()
    
    # Set up auto-refresh (in a real app, you'd use a proper scheduler)
    import threading
    import time
    
    def auto_refresh_data():
        while True:
            time.sleep(1800)  # 30 minutes
            try:
                subprocess.run(['python', 'update.py'], timeout=300)
                load_data()
                print(f"Auto-refresh completed at {datetime.now()}")
            except Exception as e:
                print(f"Auto-refresh failed: {e}")
    
    # Start auto-refresh in background thread
    refresh_thread = threading.Thread(target=auto_refresh_data, daemon=True)
    refresh_thread.start()
    
    app.run(debug=True, host='0.0.0.0', port=8080)
