#!/usr/bin/env python3
"""
Create Correct User ID Mapping
Manual mapping based on actual name matching between device and our system
"""

import pandas as pd
import json
from datetime import datetime

def create_correct_user_mapping():
    """Create correct user mapping based on exact name matching"""
    
    print("🔧 CREATING CORRECT USER ID MAPPING")
    print("=" * 50)
    
    # Load exported data to get device users
    exported_df = pd.read_csv('_sept to october 7 2025 attendance logs.csv')
    device_users = exported_df[['No.', 'Name']].drop_duplicates().sort_values('No.')
    
    # Load our users
    our_users = pd.read_csv('zkteco_users.csv')
    
    # Manual mapping based on exact name analysis
    correct_mapping = {}
    
    print("📋 Creating manual mapping based on name analysis...")
    
    for _, device_user in device_users.iterrows():
        device_uid = device_user['No.']
        device_name = device_user['Name'].strip()
        
        # Find exact or close match in our system
        our_uid = None
        
        # Exact name matches first
        exact_matches = our_users[our_users['name'].str.strip() == device_name]
        if len(exact_matches) > 0:
            our_uid = exact_matches.iloc[0]['uid']
        else:
            # Try partial matches for common name variations
            for _, our_user in our_users.iterrows():
                our_name = our_user['name'].strip()
                
                # Check if names are similar (handle variations)
                if (device_name.lower() in our_name.lower() or 
                    our_name.lower() in device_name.lower() or
                    any(word in our_name.lower() for word in device_name.lower().split() if len(word) > 3)):
                    our_uid = our_user['uid']
                    break
        
        if our_uid:
            correct_mapping[device_uid] = our_uid
            our_name = our_users[our_users['uid'] == our_uid]['name'].iloc[0]
            print(f"  ✓ Device UID {device_uid} ({device_name}) → Our UID {our_uid} ({our_name})")
        else:
            print(f"  ✗ Device UID {device_uid} ({device_name}) → No match found")
    
    # Manual corrections for known mismatches
    manual_corrections = {
        4: 20,  # Emran Mostofa should map to UID 20 in our system
        6: 29,  # Hemal Madber should map to UID 29 in our system  
        8: 30,  # Md. Abu Sayem should map to UID 30 in our system
    }
    
    print(f"\n🔧 Applying manual corrections...")
    for device_uid, our_uid in manual_corrections.items():
        if device_uid in device_users['No.'].values and our_uid in our_users['uid'].values:
            device_name = device_users[device_users['No.'] == device_uid]['Name'].iloc[0]
            our_name = our_users[our_users['uid'] == our_uid]['name'].iloc[0]
            correct_mapping[device_uid] = our_uid
            print(f"  ✓ CORRECTED: Device UID {device_uid} ({device_name}) → Our UID {our_uid} ({our_name})")
    
    # Save the mapping (convert numpy int64 to regular int)
    mapping_data = {
        'user_mapping': {int(k): int(v) for k, v in correct_mapping.items()},
        'created_at': datetime.now().isoformat(),
        'total_device_users': int(len(device_users)),
        'mapped_users': int(len(correct_mapping)),
        'mapping_type': 'manual_corrected'
    }
    
    with open('correct_user_mapping.json', 'w') as f:
        json.dump(mapping_data, f, indent=2)
    
    print(f"\n💾 Saved correct mapping to correct_user_mapping.json")
    print(f"📊 Mapping Summary:")
    print(f"   Total device users: {len(device_users)}")
    print(f"   Successfully mapped: {len(correct_mapping)}")
    print(f"   Mapping success rate: {len(correct_mapping)/len(device_users)*100:.1f}%")
    
    return correct_mapping

def create_corrected_attendance_with_proper_status():
    """Create corrected attendance data with proper status mapping"""
    
    print("\n🔄 CREATING CORRECTED ATTENDANCE DATA")
    print("=" * 50)
    
    # Load the correct mapping
    try:
        with open('correct_user_mapping.json', 'r') as f:
            mapping_data = json.load(f)
        user_mapping = {int(k): v for k, v in mapping_data['user_mapping'].items()}
    except FileNotFoundError:
        print("❌ Correct mapping file not found. Run create_correct_user_mapping() first.")
        return
    
    # Load exported data
    exported_df = pd.read_csv('_sept to october 7 2025 attendance logs.csv')
    exported_df['DateTime'] = pd.to_datetime(exported_df['Date/Time'])
    
    # Create corrected attendance data with proper status inference
    corrected_records = []
    
    # Group by user and date to determine check-in/check-out patterns
    for device_uid in user_mapping.keys():
        if device_uid not in user_mapping:
            continue
            
        our_uid = user_mapping[device_uid]
        user_records = exported_df[exported_df['No.'] == device_uid].sort_values('DateTime')
        
        # Group by date
        for date, day_records in user_records.groupby(user_records['DateTime'].dt.date):
            day_records = day_records.sort_values('DateTime')
            
            for i, (_, record) in enumerate(day_records.iterrows()):
                # Determine status based on time and sequence
                # First record of day = Check In (0), Last = Check Out (1)
                # Middle records alternate or use time-based logic
                
                if len(day_records) == 1:
                    # Single record - assume check out
                    status = 1
                elif i == 0:
                    # First record of day - check in
                    status = 0
                elif i == len(day_records) - 1:
                    # Last record of day - check out
                    status = 1
                else:
                    # Middle records - alternate or use time logic
                    hour = record['DateTime'].hour
                    if hour < 12:
                        status = 0  # Morning = check in
                    else:
                        status = 1  # Afternoon/Evening = check out
                
                corrected_records.append({
                    'uid': our_uid,
                    'timestamp': record['DateTime'].strftime('%Y-%m-%d %H:%M:%S'),
                    'status': status,
                    'device_uid': device_uid,
                    'verify_method': record['VerifyCode'],
                    'location_id': record['Location ID'],
                    'card_no': record['CardNo'] if pd.notna(record['CardNo']) else '',
                    'department': record['Department']
                })
    
    # Save corrected data
    corrected_df = pd.DataFrame(corrected_records)
    corrected_df.to_csv('zkteco_attendance_final_corrected.csv', index=False)
    
    print(f"✓ Created final corrected attendance data: {len(corrected_records)} records")
    print(f"💾 Saved to zkteco_attendance_final_corrected.csv")
    
    return corrected_df

def test_emran_mostofa_today():
    """Test if Emran Mostofa's data is now correctly mapped"""
    
    print("\n🎯 TESTING EMRAN MOSTOFA'S DATA")
    print("=" * 50)
    
    try:
        # Load corrected data
        corrected_df = pd.read_csv('zkteco_attendance_final_corrected.csv')
        corrected_df['DateTime'] = pd.to_datetime(corrected_df['timestamp'])
        
        # Load users
        users_df = pd.read_csv('zkteco_users.csv')
        
        # Today's date
        today = pd.to_datetime('2025-10-07').date()
        
        # Find Emran Mostofa (should be UID 20)
        emran_uid = 20
        emran_name = users_df[users_df['uid'] == emran_uid]['name'].iloc[0] if emran_uid in users_df['uid'].values else 'Not found'
        
        print(f"👤 Emran Mostofa: UID {emran_uid} ({emran_name})")
        
        # Get today's records for Emran
        emran_today = corrected_df[
            (corrected_df['uid'] == emran_uid) & 
            (corrected_df['DateTime'].dt.date == today)
        ].sort_values('DateTime')
        
        print(f"📅 Records for {today}: {len(emran_today)}")
        
        if len(emran_today) > 0:
            print("🕐 Today's Activity:")
            for _, record in emran_today.iterrows():
                status_name = 'Check In' if record['status'] == 0 else 'Check Out'
                print(f"  {record['timestamp']} - {status_name} ({record['verify_method']})")
            
            # Calculate working hours
            check_ins = emran_today[emran_today['status'] == 0]
            check_outs = emran_today[emran_today['status'] == 1]
            
            if len(check_ins) > 0 and len(check_outs) > 0:
                first_in = check_ins['DateTime'].min()
                last_out = check_outs['DateTime'].max()
                working_hours = (last_out - first_in).total_seconds() / 3600
                print(f"⏰ Working Hours: {working_hours:.2f} hours")
                print(f"   First Check-in: {first_in.strftime('%H:%M:%S')}")
                print(f"   Last Check-out: {last_out.strftime('%H:%M:%S')}")
        else:
            print("❌ No records found for Emran Mostofa today")
            
    except FileNotFoundError:
        print("❌ Corrected data file not found.")

if __name__ == "__main__":
    # Step 1: Create correct user mapping
    correct_mapping = create_correct_user_mapping()
    
    # Step 2: Create corrected attendance data
    corrected_df = create_corrected_attendance_with_proper_status()
    
    # Step 3: Test Emran Mostofa's data
    test_emran_mostofa_today()
    
    print("\n🎉 CORRECT USER MAPPING COMPLETE!")
    print("Next step: Update Flask app to use zkteco_attendance_final_corrected.csv")
