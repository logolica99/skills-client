# ZKTeco Attendance Management System

A comprehensive web-based attendance management system for ZKTeco fingerprint devices.

## Features

### 📊 **Dashboard**

- Real-time attendance statistics
- Quick access to daily and monthly reports
- Interactive charts and visualizations
- Search functionality across all records

### 📅 **Daily Attendance**

- View daily attendance records
- Filter by date, employee, and status
- See check-in/check-out times and working hours
- Export daily reports

### 📈 **Monthly Reports**

- Comprehensive monthly attendance analysis
- Attendance rate calculation
- Average working hours tracking
- Performance categorization (Excellent, Good, Average, Poor)
- Monthly statistics and trends

### 👥 **User Management**

- Complete user directory
- User profile with attendance history
- Card number management
- Search and filter capabilities

### 🔍 **Advanced Features**

- Real-time search across all data
- Multiple filtering options
- Responsive design for mobile and desktop
- Print-friendly reports
- Modern, intuitive UI

## Installation

1. **Clone or download the project**
2. **Activate the virtual environment:**

   ```bash
   source zkenv/bin/activate
   ```

3. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Ensure your CSV files are present:**

   - `zkteco_users.csv` - User directory
   - `zkteco_attendance_partial.csv` - Attendance records

5. **Run the application:**

   **Option A - Using the launcher script (Recommended):**

   ```bash
   ./start_app.sh
   ```

   **Option B - Manual start:**

   ```bash
   python app.py
   ```

6. **Access the web interface:**
   Open your browser and go to: `http://localhost:8080`

## Data Structure

### Users CSV (`zkteco_users.csv`)

```csv
uid,name,card
1,John Doe,3702874
2,Jane Smith,0
```

### Attendance CSV (`zkteco_attendance_partial.csv`)

```csv
uid,timestamp,status
1,2024-10-16 08:30:00,1
1,2024-10-16 17:30:00,0
```

### Status Codes (3rd Column in Attendance CSV)

- `0`: **Check In** - Employee arriving at work
- `1`: **Check Out** - Employee leaving work
- `2`: **Break Out** - Employee going on break
- `3`: **Break In** - Employee returning from break
- `4`: **Overtime In** - Employee starting overtime work
- `5`: **Overtime Out** - Employee ending overtime work

### Understanding Your Data

The file `zkteco_attendance_partial.csv` contains **complete** attendance data (not partial). The name includes "partial" because the extraction script processes data in chunks for memory efficiency. Your data shows:

- Mostly status codes `1` (Check Out) and `4` (Overtime In)
- This indicates employees frequently work overtime and the system captures their departure times

## Usage

### Data Collection

1. Run `update.py` to connect to your ZKTeco device and extract data
2. The script will generate the CSV files automatically
3. The web application will read these files and provide the interface

### Web Interface

1. **Dashboard**: Overview of attendance statistics with refresh functionality
2. **Daily View**: Select any date to view daily attendance
3. **Monthly View**: Choose month/year for comprehensive reports
4. **Users**: Manage and view user profiles

### New Features

- **🔄 Refresh Data**: Click the "Refresh Data from Device" button on the dashboard to pull latest data
- **📊 Data Information**: View status code explanations and data distribution
- **⏰ Real-time Updates**: See when data was last updated

### Key Features

- **Search**: Use the search bar to find specific employees or records
- **Filters**: Apply various filters to narrow down data
- **Export**: Export data for external analysis
- **Responsive**: Works on desktop, tablet, and mobile devices

## Technical Details

### Backend

- **Flask**: Web framework
- **Pandas**: Data processing and analysis
- **Python**: Core language

### Frontend

- **Bootstrap 5**: Responsive UI framework
- **Chart.js**: Interactive charts and graphs
- **Font Awesome**: Icons
- **Custom CSS**: Modern styling

### Database

- CSV-based data storage
- Real-time data processing
- Efficient filtering and searching

## Customization

### Adding New Features

1. Modify `app.py` for new endpoints
2. Create/update templates in `templates/`
3. Add styling in `static/css/style.css`

### Styling

- Modify `static/css/style.css` for custom themes
- Bootstrap classes available for quick styling
- Dark mode support included

## Troubleshooting

### Common Issues

1. **Connection Error**: Check ZKTeco device IP and network
2. **Missing Data**: Ensure CSV files are properly generated
3. **Port Conflicts**: Change port in `app.py` if 8080 is in use

### Support

- Check the logs for detailed error messages
- Ensure all dependencies are installed
- Verify CSV file formats match expected structure

## Screenshots
The system provides:

- Modern dashboard with statistics cards
- Interactive tables with sorting and filtering
- Responsive design for all screen sizes
- Professional charts and visualizations
- Intuitive navigation and user experience

---
**Built with ❤️ for efficient attendance management**
