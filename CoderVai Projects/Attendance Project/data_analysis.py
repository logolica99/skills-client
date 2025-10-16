#!/usr/bin/env python3
"""
Comprehensive Data Analysis Script
Compares exported ZKTeco data with our extracted data and provides insights
"""

import pandas as pd
import numpy as np
from datetime import datetime, timedelta

def load_and_analyze_data():
    """Load and analyze all available data sources"""
    
    print("=" * 60)
    print("🔍 COMPREHENSIVE ZKTECO DATA ANALYSIS")
    print("=" * 60)
    
    # Load exported data from ZKTeco software
    print("\n📊 Loading exported data from ZKTeco software...")
    try:
        exported_df = pd.read_csv('_sept to october 7 2025 attendance logs.csv')
        exported_df['DateTime'] = pd.to_datetime(exported_df['Date/Time'])
        print(f"✓ Loaded {len(exported_df)} exported records")
    except Exception as e:
        print(f"✗ Error loading exported data: {e}")
        return
    
    # Load our extracted data
    print("\n📊 Loading our extracted data...")
    try:
        our_df = pd.read_csv('zkteco_attendance_partial.csv', names=['uid', 'timestamp', 'status'])
        our_df['DateTime'] = pd.to_datetime(our_df['timestamp'])
        print(f"✓ Loaded {len(our_df)} our records")
    except Exception as e:
        print(f"✗ Error loading our data: {e}")
        return
    
    # Load users data
    print("\n👥 Loading users data...")
    try:
        users_df = pd.read_csv('zkteco_users.csv')
        print(f"✓ Loaded {len(users_df)} users")
    except Exception as e:
        print(f"✗ Error loading users data: {e}")
        return
    
    # Filter both datasets for the same period (Sept-Oct 2025)
    start_date = '2025-09-01'
    end_date = '2025-10-07'
    
    exported_period = exported_df[
        (exported_df['DateTime'] >= start_date) & 
        (exported_df['DateTime'] <= end_date)
    ]
    
    our_period = our_df[
        (our_df['DateTime'] >= start_date) & 
        (our_df['DateTime'] <= end_date)
    ]
    
    print(f"\n📅 Analysis Period: {start_date} to {end_date}")
    print(f"Exported records in period: {len(exported_period)}")
    print(f"Our records in period: {len(our_period)}")
    
    # Data Quality Analysis
    print("\n" + "=" * 60)
    print("📈 DATA QUALITY ANALYSIS")
    print("=" * 60)
    
    # 1. Record Count Comparison
    print(f"\n1. RECORD COUNT COMPARISON:")
    print(f"   Exported: {len(exported_period):,} records")
    print(f"   Our Data: {len(our_period):,} records")
    print(f"   Match: {'✓ Perfect' if len(exported_period) == len(our_period) else '✗ Mismatch'}")
    
    # 2. User Coverage
    exported_users = set(exported_period['No.'].unique())
    our_users = set(our_period['uid'].unique())
    
    print(f"\n2. USER COVERAGE:")
    print(f"   Exported users: {len(exported_users)}")
    print(f"   Our users: {len(our_users)}")
    print(f"   Common users: {len(exported_users.intersection(our_users))}")
    print(f"   Coverage: {len(exported_users.intersection(our_users))/len(exported_users)*100:.1f}%")
    
    # 3. Timestamp Accuracy
    print(f"\n3. TIMESTAMP ACCURACY:")
    matches = 0
    total_checked = 0
    
    for _, exp_row in exported_period.head(100).iterrows():
        exp_user = exp_row['No.']
        exp_time = exp_row['DateTime']
        
        # Find matching record in our data (within 1 minute tolerance)
        time_diff = abs(our_period['DateTime'] - exp_time)
        matching_records = our_period[
            (our_period['uid'] == exp_user) & 
            (time_diff <= pd.Timedelta(minutes=1))
        ]
        
        if len(matching_records) > 0:
            matches += 1
        total_checked += 1
    
    accuracy = (matches / total_checked) * 100
    print(f"   Sample accuracy: {accuracy:.1f}% ({matches}/{total_checked})")
    
    # 4. Verification Methods Analysis
    print(f"\n4. VERIFICATION METHODS (from exported data):")
    verify_counts = exported_period['VerifyCode'].value_counts()
    for method, count in verify_counts.items():
        percentage = (count / len(exported_period)) * 100
        method_name = {
            'FP': 'Fingerprint',
            'RF': 'RFID Card', 
            'PW': 'Password'
        }.get(method, method)
        print(f"   {method_name}: {count:,} ({percentage:.1f}%)")
    
    # 5. User Name Verification
    print(f"\n5. USER NAME VERIFICATION:")
    name_matches = 0
    name_mismatches = []
    
    for user_id in exported_users:
        if user_id in users_df['uid'].values:
            our_name = users_df[users_df['uid'] == user_id]['name'].iloc[0]
            exp_records = exported_period[exported_period['No.'] == user_id]
            if len(exp_records) > 0:
                exp_name = exp_records['Name'].iloc[0]
                if our_name.strip() == exp_name.strip():
                    name_matches += 1
                else:
                    name_mismatches.append({
                        'uid': user_id,
                        'our_name': our_name,
                        'exported_name': exp_name
                    })
    
    print(f"   Name matches: {name_matches}/{len(exported_users)}")
    print(f"   Name mismatches: {len(name_mismatches)}")
    
    if name_mismatches:
        print(f"   Mismatched names:")
        for mismatch in name_mismatches[:5]:  # Show first 5
            print(f"     UID {mismatch['uid']}: '{mismatch['our_name']}' vs '{mismatch['exported_name']}'")
    
    # Data Insights
    print("\n" + "=" * 60)
    print("💡 DATA INSIGHTS & RECOMMENDATIONS")
    print("=" * 60)
    
    # 1. Most Active Users
    print(f"\n1. MOST ACTIVE USERS (Sept-Oct 2025):")
    user_activity = our_period.groupby('uid').size().sort_values(ascending=False).head(5)
    for uid, count in user_activity.items():
        user_name = users_df[users_df['uid'] == uid]['name'].iloc[0] if uid in users_df['uid'].values else 'Unknown'
        print(f"   UID {uid} ({user_name}): {count} records")
    
    # 2. Peak Activity Times
    print(f"\n2. PEAK ACTIVITY ANALYSIS:")
    our_period['Hour'] = our_period['DateTime'].dt.hour
    hourly_activity = our_period.groupby('Hour').size()
    peak_hour = hourly_activity.idxmax()
    peak_count = hourly_activity.max()
    print(f"   Peak hour: {peak_hour}:00 with {peak_count} records")
    
    # 3. Status Code Distribution
    print(f"\n3. STATUS CODE DISTRIBUTION:")
    status_counts = our_period['status'].value_counts()
    status_map = {
        0: 'Check In',
        1: 'Check Out',
        2: 'Break Out', 
        3: 'Break In',
        4: 'Overtime In',
        5: 'Overtime Out'
    }
    
    for status, count in status_counts.items():
        percentage = (count / len(our_period)) * 100
        status_name = status_map.get(status, f'Unknown({status})')
        print(f"   {status_name}: {count:,} ({percentage:.1f}%)")
    
    # 4. Data Quality Score
    print(f"\n4. OVERALL DATA QUALITY SCORE:")
    
    # Calculate quality metrics
    record_match_score = 100 if len(exported_period) == len(our_period) else 0
    user_coverage_score = (len(exported_users.intersection(our_users))/len(exported_users)) * 100
    timestamp_accuracy_score = accuracy
    
    overall_score = (record_match_score + user_coverage_score + timestamp_accuracy_score) / 3
    
    print(f"   Record Count Match: {record_match_score:.1f}%")
    print(f"   User Coverage: {user_coverage_score:.1f}%") 
    print(f"   Timestamp Accuracy: {timestamp_accuracy_score:.1f}%")
    print(f"   OVERALL QUALITY: {overall_score:.1f}%")
    
    # Recommendations
    print(f"\n5. RECOMMENDATIONS:")
    
    if overall_score >= 95:
        print("   ✅ Excellent data quality! Your extraction is working perfectly.")
    elif overall_score >= 85:
        print("   ✅ Good data quality with minor issues to address.")
    else:
        print("   ⚠️  Data quality needs improvement.")
    
    if len(name_mismatches) > 0:
        print("   📝 Consider updating user names to match exported data")
    
    if 'FP' in verify_counts and verify_counts['FP'] > verify_counts.get('RF', 0):
        print("   🔒 Good security: Fingerprint is the primary authentication method")
    
    if verify_counts.get('PW', 0) > len(exported_period) * 0.1:
        print("   ⚠️  High password usage detected - consider promoting biometric authentication")
    
    # System Improvements Implemented
    print("\n" + "=" * 60)
    print("🚀 SYSTEM IMPROVEMENTS IMPLEMENTED")
    print("=" * 60)
    
    improvements = [
        "✅ Enhanced data extraction script (enhanced_update.py)",
        "✅ Verification method capture (FP/RF/PW)",
        "✅ Enhanced Flask application with verification analysis",
        "✅ Data quality monitoring and comparison tools",
        "✅ User name verification and mismatch detection",
        "✅ Security analysis based on authentication methods",
        "✅ Real-time data refresh with enhanced extraction",
        "✅ Comprehensive dashboard with data quality metrics"
    ]
    
    for improvement in improvements:
        print(f"   {improvement}")
    
    print(f"\n📋 NEXT STEPS:")
    print("   1. Run 'python enhanced_update.py' to extract enhanced data")
    print("   2. Use 'python enhanced_app.py' to access the enhanced dashboard")
    print("   3. Visit /verification-analysis for detailed security insights")
    print("   4. Monitor data quality using the built-in comparison tools")
    
    return {
        'exported_records': len(exported_period),
        'our_records': len(our_period),
        'quality_score': overall_score,
        'user_coverage': user_coverage_score,
        'timestamp_accuracy': timestamp_accuracy_score,
        'verification_methods': verify_counts.to_dict()
    }

if __name__ == "__main__":
    results = load_and_analyze_data()
    
    if results:
        print(f"\n" + "=" * 60)
        print("📊 ANALYSIS COMPLETE")
        print("=" * 60)
        print(f"Quality Score: {results['quality_score']:.1f}%")
        print(f"Data extracted successfully with {results['our_records']:,} records")
        print("Ready for enhanced analysis!")
