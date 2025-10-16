#!/usr/bin/env python3
"""
Analyze attendance data to identify issues and provide insights
"""
import pandas as pd
from datetime import datetime

def analyze():
    print("=" * 80)
    print("ZKTeco Attendance Data Analysis")
    print("=" * 80)
    
    # Load data
    users = pd.read_csv('zkteco_users.csv')
    attendance = pd.read_csv('zkteco_attendance_partial.csv', 
                            names=['uid', 'timestamp', 'status'])
    
    print(f"\n📊 SUMMARY")
    print(f"   Total users in database: {len(users)}")
    print(f"   Total attendance records: {len(attendance)}")
    print(f"   Unique users with attendance: {attendance['uid'].nunique()}")
    print(f"   Date range: {attendance['timestamp'].min()} to {attendance['timestamp'].max()}")
    
    # Status code distribution
    print(f"\n📈 STATUS CODE DISTRIBUTION")
    status_map = {
        0: 'Check In',
        1: 'Check Out', 
        2: 'Break Out',
        3: 'Break In',
        4: 'Overtime In',
        5: 'Overtime Out'
    }
    
    status_counts = attendance['status'].value_counts().sort_index()
    total = len(attendance)
    for status, count in status_counts.items():
        status_name = status_map.get(status, f'Unknown ({status})')
        percentage = (count / total) * 100
        print(f"   {status_name:20s}: {count:7d} ({percentage:5.2f}%)")
    
    # Check for users with attendance but no user record
    print(f"\n⚠️  USERS WITH ATTENDANCE BUT MISSING FROM USER DATABASE")
    users_in_attendance = set(attendance['uid'].unique())
    users_in_db = set(users['uid'].unique())
    missing_users = users_in_attendance - users_in_db
    
    if missing_users:
        print(f"   Found {len(missing_users)} users with attendance but not in user database:")
        for uid in sorted(missing_users):
            count = len(attendance[attendance['uid'] == uid])
            print(f"   - User ID {uid}: {count} attendance records")
    else:
        print("   ✅ All users with attendance records exist in user database")
    
    # Check for users in DB but no attendance
    print(f"\n👥 USERS WITH NO ATTENDANCE RECORDS")
    users_without_attendance = users_in_db - users_in_attendance
    if users_without_attendance:
        print(f"   Found {len(users_without_attendance)} users with no attendance:")
        for uid in sorted(users_without_attendance)[:10]:  # Show first 10
            user_name = users[users['uid'] == uid]['name'].iloc[0]
            print(f"   - User ID {uid}: {user_name}")
        if len(users_without_attendance) > 10:
            print(f"   ... and {len(users_without_attendance) - 10} more")
    else:
        print("   ✅ All users have attendance records")
    
    # Specific user analysis
    print(f"\n🔍 SPECIFIC USER ANALYSIS")
    
    # User ID 4
    if 4 in users['uid'].values:
        user4_name = users[users['uid'] == 4]['name'].iloc[0]
        user4_card = users[users['uid'] == 4]['card'].iloc[0]
        user4_attendance = attendance[attendance['uid'] == 4]
        print(f"\n   User ID 4 (from database):")
        print(f"   - Name: {user4_name}")
        print(f"   - Card: {user4_card}")
        print(f"   - Attendance records: {len(user4_attendance)}")
        if len(user4_attendance) > 0:
            print(f"   - First attendance: {user4_attendance['timestamp'].min()}")
            print(f"   - Last attendance: {user4_attendance['timestamp'].max()}")
            print(f"   - Recent attendance (last 5):")
            for _, row in user4_attendance.tail(5).iterrows():
                status_name = status_map.get(row['status'], f"Status {row['status']}")
                print(f"     • {row['timestamp']} - {status_name}")
    
    # User ID 20 (Emran Mostofa)
    if 20 in users['uid'].values:
        user20_name = users[users['uid'] == 20]['name'].iloc[0]
        user20_card = users[users['uid'] == 20]['card'].iloc[0]
        user20_attendance = attendance[attendance['uid'] == 20]
        print(f"\n   User ID 20 (from database):")
        print(f"   - Name: {user20_name}")
        print(f"   - Card: {user20_card}")
        print(f"   - Attendance records: {len(user20_attendance)}")
        if len(user20_attendance) > 0:
            print(f"   - First attendance: {user20_attendance['timestamp'].min()}")
            print(f"   - Last attendance: {user20_attendance['timestamp'].max()}")
        else:
            print(f"   ⚠️  No attendance records found!")
    
    # Recent activity (today)
    print(f"\n📅 TODAY'S ACTIVITY (2025-09-30)")
    attendance['timestamp'] = pd.to_datetime(attendance['timestamp'])
    today = attendance[attendance['timestamp'].dt.date == pd.to_datetime('2025-09-30').date()]
    
    print(f"   Total punches today: {len(today)}")
    print(f"   Unique users today: {today['uid'].nunique()}")
    print(f"\n   Last 10 punches today:")
    
    for _, row in today.tail(10).iterrows():
        uid = row['uid']
        user_name = users[users['uid'] == uid]['name'].iloc[0] if uid in users['uid'].values else "Unknown User"
        status_name = status_map.get(row['status'], f"Status {row['status']}")
        print(f"   • {row['timestamp']} - User {uid:3d} ({user_name:30s}) - {status_name}")
    
    print(f"\n" + "=" * 80)
    print("RECOMMENDATIONS:")
    print("=" * 80)
    
    # Check if all status codes are the same
    if len(status_counts) == 1:
        print("\n⚠️  All attendance records have the same status code!")
        print("   This means the device is not differentiating between check-in and check-out.")
        print("   Recommendation: Configure device to use status codes 0 (in) and 1 (out)")
    
    # Check for the Emran Mostofa issue
    if 20 in users['uid'].values and len(attendance[attendance['uid'] == 20]) == 0:
        if 4 in users['uid'].values and len(attendance[attendance['uid'] == 4]) > 0:
            print("\n⚠️  User ID Mismatch Detected!")
            print("   - Device shows: User ID 4 = Emran Mostofa")
            print(f"   - Database shows: User ID 4 = {users[users['uid'] == 4]['name'].iloc[0]}")
            print(f"   - Database shows: User ID 20 = Emran Mostofa")
            print("\n   POSSIBLE CAUSES:")
            print("   1. Emran Mostofa was re-enrolled on device as ID 4")
            print("   2. Device user database was manually edited")
            print("   3. Multiple people share fingerprints (unlikely)")
            print("\n   SOLUTIONS:")
            print("   1. Re-run update.py to sync user database")
            print("   2. Check device admin panel for user ID 4")
            print("   3. If needed, delete and re-enroll the user")
    
    print("\n")

if __name__ == "__main__":
    analyze()
