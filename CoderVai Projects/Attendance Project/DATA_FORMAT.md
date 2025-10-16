# ZKTeco Attendance Data Format Documentation

## Overview

This document explains the data format used by the ZKTeco attendance system and how it's stored in the CSV files.

## CSV Files

### 1. `zkteco_users.csv`

Contains user information extracted from the device.

**Format:**

```csv
uid,name,card
1,NUMERI SATTAR APAR,0
4,Borhan Uddin Prodhan,11379922
20,Emran Mostofa,0
```

**Columns:**

- `uid`: User ID (integer) - **This is the internal device user ID**
- `name`: User's full name
- `card`: RFID card number (0 if no card assigned)

**Important Notes:**

- User IDs are assigned by the ZKTeco device itself
- User IDs may not be sequential (gaps are normal)
- The same person might have different IDs if re-enrolled

### 2. `zkteco_attendance_partial.csv`

Contains all attendance records (punch-in/out events).

**Format:**

```csv
uid,timestamp,status
4,2025-09-30 14:53:05,1
4,2025-09-30 14:57:28,1
97,2025-09-30 15:27:08,1
```

**Columns:**

- `uid`: User ID (matches uid in users CSV)
- `timestamp`: Date and time of the punch (YYYY-MM-DD HH:MM:SS)
- `status`: Status code indicating the type of punch

## Status Codes

The `status` field indicates what type of attendance action was performed:

| Code | Meaning      | Description             |
| ---- | ------------ | ----------------------- |
| 0    | Check In     | Regular work start time |
| 1    | Check Out    | Regular work end time   |
| 2    | Break Out    | Going on break          |
| 3    | Break In     | Returning from break    |
| 4    | Overtime In  | Starting overtime work  |
| 5    | Overtime Out | Ending overtime work    |

### Status Code Usage

Based on your device settings (see screenshots):

- **Verification Method**: Fingerprint
- **Duplicate Punch Period**: None (allows multiple punches)
- **Authentication Timeout**: 3 seconds

When you scan your fingerprint, the device records it with the status code configured for that time/action. Looking at your data:

- Most records have `status=1` (Check Out)
- This suggests your device may be configured to record all punches as "Check Out" by default
- OR the device uses different logic to determine check-in vs check-out

## Data Interpretation

### How Check-In/Check-Out Works

The application (`app.py`) interprets the data as follows:

1. **First In Time**: Earliest timestamp with status 0 or 4 (Check In or Overtime In)
2. **Last Out Time**: Latest timestamp with status 1 or 5 (Check Out or Overtime Out)
3. **Working Hours**: Time difference between First In and Last Out

**Example:**

```
User ID: 4 (Borhan Uddin Prodhan)
Date: 2025-09-30

Records:
- 14:53:05, status=1
- 14:57:28, status=1
- 17:19:31, status=1
- 17:26:19, status=1
- 17:26:30, status=1

Interpretation:
- First In: None (no status 0 or 4 records)
- Last Out: 17:26:30 (latest status 1)
- Working Hours: Cannot calculate (no check-in record)
```

## Common Issues

### Issue 1: User ID Mismatch

**Problem**: Device shows "User ID: 4" but you expect a different ID.

**Explanation**: User IDs are assigned by the device during enrollment, not by you. The ID shown on the device screen is the correct internal ID.

**Solution**: Check the `zkteco_users.csv` file to see what name is associated with that UID.

### Issue 2: Missing Recent Scans

**Problem**: Just scanned fingerprint but don't see it in the data.

**Possible Causes:**

1. Device buffers data - may take a few seconds to be available via network
2. Device clock might be wrong
3. Network connection issue during data pull

**Solution**:

- Wait 30-60 seconds after scanning
- Run `python update.py` again to fetch latest data
- Check device clock settings

### Issue 3: All Punches Show Same Status

**Problem**: All attendance records have `status=1`.

**Explanation**: Your device might be configured to record all fingerprint scans with a default status, or the device determines status based on time of day rather than user selection.

**Device Settings to Check:**

1. Attendance → Attendance Status Settings
2. Check if "Auto Status" is enabled
3. Check if time-based rules are configured

### Issue 4: Duplicate Data in CSV

**Problem**: Running `update.py` multiple times creates duplicate records.

**Cause**: The original script was appending data instead of replacing it.

**Fix**: Updated `update.py` to use write mode for the first batch, clearing old data before adding new records.

## Data Synchronization

### How to Update Data

```bash
# Activate virtual environment
source zkenv/bin/activate

# Fetch latest data from device
python update.py
```

This will:

1. Connect to the ZKTeco device at IP 10.10.19.171
2. Fetch all users → saves to `zkteco_users.csv`
3. Fetch all attendance records → saves to `zkteco_attendance_partial.csv`
4. Create `data_extraction_info.txt` with extraction details

### Web Application Refresh

The web application loads data when it starts. To see new data:

**Option 1 - Use Web UI:**

- Visit http://localhost:8080
- Click the "Refresh Data" button (if available)

**Option 2 - Restart Application:**

```bash
# Stop the app (Ctrl+C)
# Start it again
./start_app.sh
```

**Option 3 - API Endpoint:**

```bash
curl -X POST http://localhost:8080/api/refresh-data
```

## Verifying Your Data

### Check if your user exists:

```bash
grep "Emran Mostofa" zkteco_users.csv
# Should show: 20,Emran Mostofa,0
```

### Check your attendance records:

```bash
grep "^20," zkteco_attendance_partial.csv | tail -10
# Shows last 10 attendance records for user ID 20
```

### Check today's attendance:

```bash
grep "2025-09-30" zkteco_attendance_partial.csv | tail -20
```

### Count total records:

```bash
wc -l zkteco_attendance_partial.csv
```

## Device Settings Reference

Based on your screenshots, your device has:

- **Fingerprint Settings:**

  - 1:1 Threshold Value: 15
  - 1:N Threshold Value: 35
  - FP Sensor Sensitivity: Low
  - 1:1 Retry Attempts: 3
  - Fingerprint Image: Always show

- **Attendance Settings:**
  - Duplicate Punch Period: None (allows rapid multiple punches)
  - Alphanumeric User ID: OFF
  - Attendance Log Alert: Disabled
  - Periodic Del of ATT Data: 999 days
  - Authentication Timeout: 3 seconds

## Troubleshooting

### No data appears for recent scan

1. Check device time:

   ```bash
   # Look at the latest timestamp in your data
   tail zkteco_attendance_partial.csv
   ```

2. Verify device connection:

   ```bash
   ping 10.10.19.171
   ```

3. Re-run data extraction:

   ```bash
   python update.py
   ```

4. Check the logs for errors

### Working hours show as NULL

This happens when:

- Only check-out records exist (status=1) with no check-in (status=0)
- The device is recording all punches with the same status code

**Solution**: Configure device to use different status codes for check-in vs check-out, or implement smart logic to treat first punch as in, last as out.

## Next Steps

1. ✅ Run `python update.py` to get fresh data
2. ✅ Check if your recent fingerprint scan appears
3. ✅ Verify your user ID and name mapping
4. 🔧 Configure device status codes if needed
5. 🔧 Implement alternative logic for check-in/out if all status codes are the same
