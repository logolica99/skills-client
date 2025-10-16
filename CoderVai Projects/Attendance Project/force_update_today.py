#!/usr/bin/env python3
"""
Force Update Today's Data
Extracts fresh data and creates corrected mapping with today's records
"""

import subprocess
import sys
import os
from datetime import datetime
import pandas as pd

def run_command(command, description):
    """Run a command and return success status"""
    print(f"\n🔄 {description}...")
    try:
        result = subprocess.run(command, capture_output=True, text=True, timeout=300)
        if result.returncode == 0:
            print(f"✅ {description} completed successfully!")
            if result.stdout.strip():
                print("Output:", result.stdout.strip()[-200:])  # Last 200 chars
            return True
        else:
            print(f"❌ {description} failed!")
            print("Error:", result.stderr.strip()[-200:])  # Last 200 chars
            return False
    except subprocess.TimeoutExpired:
        print(f"⏰ {description} timed out!")
        return False
    except Exception as e:
        print(f"❌ {description} error: {e}")
        return False

def check_latest_data():
    """Check what's the latest date in our data"""
    try:
        if os.path.exists('zkteco_attendance_final_corrected.csv'):
            df = pd.read_csv('zkteco_attendance_final_corrected.csv')
            df['datetime'] = pd.to_datetime(df['timestamp'])
            latest_date = df['datetime'].max().strftime('%Y-%m-%d')
            print(f"📅 Latest data in corrected file: {latest_date}")
            return latest_date
        else:
            print("⚠️ No corrected data file found")
            return None
    except Exception as e:
        print(f"❌ Error checking data: {e}")
        return None

def main():
    print("🎓 ACS FUTURE SCHOOL - Force Data Update")
    print("=" * 50)
    print(f"🕐 Current time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    # Check current data status
    latest_date = check_latest_data()
    today = datetime.now().strftime('%Y-%m-%d')
    
    if latest_date == today:
        print(f"✅ Data is already up to date for {today}")
        return True
    
    print(f"🔄 Need to update data from {latest_date} to {today}")
    
    # Step 1: Extract fresh data from devices
    success1 = run_command(['python', 'update.py'], 'Extracting fresh data from devices')
    if not success1:
        print("❌ Cannot proceed without fresh data extraction")
        return False
    
    # Step 2: Create corrected mapping
    success2 = run_command(['python', 'create_correct_mapping.py'], 'Creating corrected user mapping')
    if not success2:
        print("⚠️ Mapping correction failed, but continuing...")
    
    # Step 3: Check if we now have today's data
    new_latest_date = check_latest_data()
    if new_latest_date:
        print(f"✅ Data updated! Latest date now: {new_latest_date}")
        
        # Check for today's records specifically
        try:
            df = pd.read_csv('zkteco_attendance_final_corrected.csv')
            df['datetime'] = pd.to_datetime(df['timestamp'])
            today_records = len(df[df['datetime'].dt.date == datetime.now().date()])
            print(f"📊 Records for today ({today}): {today_records}")
            
            if today_records > 0:
                print(f"🎉 SUCCESS! Found {today_records} records for today!")
                return True
            else:
                print(f"⚠️ No records found for today. Latest available: {new_latest_date}")
                return True  # Still success, just no activity today
                
        except Exception as e:
            print(f"❌ Error checking today's data: {e}")
            return False
    else:
        print("❌ Data update failed")
        return False

if __name__ == "__main__":
    success = main()
    if success:
        print("\n🎉 Data update process completed!")
        print("🌐 Restart your Flask app to see the latest data")
        print("💡 Tip: Use 'bash start_app.sh' to restart with all features")
    else:
        print("\n❌ Data update process failed!")
        print("🔧 Check your device connections and try again")
        sys.exit(1)
