#!/usr/bin/env python3
"""
Fix User ID Mapping Issue
Creates a correlation between exported device data and our extracted data
"""

import pandas as pd
import json
from datetime import datetime

def create_user_mapping():
    """Create a mapping between device user IDs and our system user IDs"""
    
    print("🔧 FIXING USER ID MAPPING ISSUE")
    print("=" * 50)
    
    # Load exported data
    print("📊 Loading exported data...")
    exported_df = pd.read_csv('_sept to october 7 2025 attendance logs.csv')
    exported_df['DateTime'] = pd.to_datetime(exported_df['Date/Time'])
    
    # Load our users data
    print("👥 Loading our users data...")
    our_users_df = pd.read_csv('zkteco_users.csv')
    
    # Load our attendance data
    print("📋 Loading our attendance data...")
    our_attendance_df = pd.read_csv('zkteco_attendance_partial.csv', names=['uid', 'timestamp', 'status'])
    our_attendance_df['DateTime'] = pd.to_datetime(our_attendance_df['timestamp'])
    
    print(f"✓ Exported data: {len(exported_df)} records")
    print(f"✓ Our users: {len(our_users_df)} users")
    print(f"✓ Our attendance: {len(our_attendance_df)} records")
    
    # Create device user mapping from exported data
    device_users = exported_df[['No.', 'Name']].drop_duplicates()
    device_users.columns = ['device_uid', 'device_name']
    
    print(f"\n📱 Device Users: {len(device_users)}")
    
    # Create mapping by matching names and timestamps
    user_mapping = {}
    mapping_confidence = {}
    
    print("\n🔍 Creating user ID correlation...")
    
    for _, device_user in device_users.iterrows():
        device_uid = device_user['device_uid']
        device_name = device_user['device_name'].strip()
        
        # Get device attendance records for this user
        device_records = exported_df[exported_df['No.'] == device_uid]
        
        best_match_uid = None
        best_match_score = 0
        
        # Try to find matching user in our system by name similarity
        for _, our_user in our_users_df.iterrows():
            our_uid = our_user['uid']
            our_name = our_user['name'].strip()
            
            # Calculate name similarity (simple approach)
            name_similarity = 0
            if device_name.lower() == our_name.lower():
                name_similarity = 1.0
            elif device_name.lower() in our_name.lower() or our_name.lower() in device_name.lower():
                name_similarity = 0.8
            elif any(word in our_name.lower() for word in device_name.lower().split()):
                name_similarity = 0.6
            
            # Get our attendance records for this user
            our_records = our_attendance_df[our_attendance_df['uid'] == our_uid]
            
            # Calculate timestamp correlation
            timestamp_matches = 0
            total_device_records = len(device_records)
            
            if total_device_records > 0:
                for _, device_record in device_records.head(20).iterrows():  # Check first 20 records
                    device_time = device_record['DateTime']
                    
                    # Find matching timestamps in our data (within 1 minute)
                    time_diff = abs(our_records['DateTime'] - device_time)
                    matches = our_records[time_diff <= pd.Timedelta(minutes=1)]
                    
                    if len(matches) > 0:
                        timestamp_matches += 1
                
                timestamp_correlation = timestamp_matches / min(20, total_device_records)
            else:
                timestamp_correlation = 0
            
            # Combined score
            combined_score = (name_similarity * 0.4) + (timestamp_correlation * 0.6)
            
            if combined_score > best_match_score and combined_score > 0.3:
                best_match_score = combined_score
                best_match_uid = our_uid
        
        if best_match_uid:
            user_mapping[device_uid] = best_match_uid
            mapping_confidence[device_uid] = best_match_score
            our_name = our_users_df[our_users_df['uid'] == best_match_uid]['name'].iloc[0]
            print(f"  ✓ Device UID {device_uid} ({device_name}) → Our UID {best_match_uid} ({our_name}) [Score: {best_match_score:.2f}]")
        else:
            print(f"  ✗ Device UID {device_uid} ({device_name}) → No match found")
    
    # Save the mapping
    mapping_data = {
        'user_mapping': user_mapping,
        'mapping_confidence': mapping_confidence,
        'created_at': datetime.now().isoformat(),
        'total_device_users': len(device_users),
        'mapped_users': len(user_mapping)
    }
    
    with open('user_id_mapping.json', 'w') as f:
        json.dump(mapping_data, f, indent=2)
    
    print(f"\n💾 Saved user mapping to user_id_mapping.json")
    print(f"📊 Mapping Summary:")
    print(f"   Total device users: {len(device_users)}")
    print(f"   Successfully mapped: {len(user_mapping)}")
    print(f"   Mapping success rate: {len(user_mapping)/len(device_users)*100:.1f}%")
    
    return user_mapping, mapping_confidence

def create_corrected_attendance_data():
    """Create corrected attendance data using the user mapping"""
    
    print("\n🔄 CREATING CORRECTED ATTENDANCE DATA")
    print("=" * 50)
    
    # Load the mapping
    try:
        with open('user_id_mapping.json', 'r') as f:
            mapping_data = json.load(f)
        user_mapping = {int(k): v for k, v in mapping_data['user_mapping'].items()}
    except FileNotFoundError:
        print("❌ User mapping file not found. Run create_user_mapping() first.")
        return
    
    # Load exported data
    exported_df = pd.read_csv('_sept to october 7 2025 attendance logs.csv')
    exported_df['DateTime'] = pd.to_datetime(exported_df['Date/Time'])
    
    # Create corrected attendance data
    corrected_records = []
    
    for _, record in exported_df.iterrows():
        device_uid = record['No.']
        
        if device_uid in user_mapping:
            our_uid = user_mapping[device_uid]
            
            corrected_records.append({
                'uid': our_uid,
                'timestamp': record['DateTime'].strftime('%Y-%m-%d %H:%M:%S'),
                'status': 1,  # Most records in exported data seem to be check-out
                'device_uid': device_uid,
                'verify_method': record['VerifyCode'],
                'location_id': record['Location ID'],
                'card_no': record['CardNo']
            })
    
    # Save corrected data
    corrected_df = pd.DataFrame(corrected_records)
    corrected_df.to_csv('zkteco_attendance_corrected.csv', index=False)
    
    print(f"✓ Created corrected attendance data: {len(corrected_records)} records")
    print(f"💾 Saved to zkteco_attendance_corrected.csv")
    
    return corrected_df

def analyze_correction_results():
    """Analyze the results of the correction"""
    
    print("\n📈 ANALYZING CORRECTION RESULTS")
    print("=" * 50)
    
    # Load data
    try:
        corrected_df = pd.read_csv('zkteco_attendance_corrected.csv')
        corrected_df['DateTime'] = pd.to_datetime(corrected_df['timestamp'])
        
        users_df = pd.read_csv('zkteco_users.csv')
        
        # Today's date
        today = pd.to_datetime('2025-10-07').date()
        
        # Filter for today
        today_records = corrected_df[corrected_df['DateTime'].dt.date == today]
        
        print(f"📅 Today's Records ({today}): {len(today_records)}")
        
        # Group by user
        user_activity = today_records.groupby('uid').agg({
            'timestamp': ['count', 'min', 'max'],
            'verify_method': lambda x: ', '.join(x.unique())
        }).round(2)
        
        user_activity.columns = ['Total Records', 'First Record', 'Last Record', 'Verify Methods']
        
        print("\n👥 Today's User Activity:")
        for uid, stats in user_activity.iterrows():
            user_name = users_df[users_df['uid'] == uid]['name'].iloc[0] if uid in users_df['uid'].values else 'Unknown'
            print(f"  {user_name} (UID {uid}):")
            print(f"    Records: {stats['Total Records']}")
            print(f"    First: {stats['First Record']}")
            print(f"    Last: {stats['Last Record']}")
            print(f"    Methods: {stats['Verify Methods']}")
            print()
        
        # Check Emran Mostofa specifically
        emran_records = today_records[today_records['uid'] == 20]  # Emran should be UID 20 in our system
        if len(emran_records) > 0:
            print("🎯 EMRAN MOSTOFA TODAY:")
            for _, record in emran_records.iterrows():
                print(f"  {record['timestamp']} - {record['verify_method']}")
        else:
            print("❌ No records found for Emran Mostofa today")
            
    except FileNotFoundError:
        print("❌ Corrected data file not found. Run create_corrected_attendance_data() first.")

if __name__ == "__main__":
    # Step 1: Create user mapping
    user_mapping, confidence = create_user_mapping()
    
    # Step 2: Create corrected attendance data
    corrected_df = create_corrected_attendance_data()
    
    # Step 3: Analyze results
    analyze_correction_results()
    
    print("\n🎉 USER ID MAPPING CORRECTION COMPLETE!")
    print("Next steps:")
    print("1. Update the Flask app to use corrected data")
    print("2. Fix daily route calculations")
    print("3. Test with today's data")
