#!/bin/bash

# ACS FUTURE SCHOOL Attendance Management System Launcher
echo "🎓 Starting ACS FUTURE SCHOOL Attendance Management System..."
echo "🔄 Enhanced with Raw Data Viewer, Device Management & Dynamic Sync"

# Activate virtual environment
source zkenv/bin/activate

# Check if corrected data exists, otherwise check for original data
if [ -f "zkteco_attendance_final_corrected.csv" ] && [ -f "correct_user_mapping.json" ]; then
    echo "✅ Found corrected attendance data with proper user ID mapping!"
    echo "🎯 Using corrected_app.py with fixed user mappings"
    APP_FILE="corrected_app.py"
elif [ -f "zkteco_users.csv" ] && [ -f "zkteco_attendance_partial.csv" ]; then
    echo "⚠️  Found original data files, but corrected data is recommended!"
    echo "📋 For best results, run the user ID mapping correction first"
    echo ""
    read -p "Do you want to create corrected user mapping now? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🔄 Creating corrected user ID mapping..."
        python create_correct_mapping.py
        if [ $? -eq 0 ]; then
            echo "✅ User ID mapping correction completed successfully!"
            APP_FILE="corrected_app.py"
        else
            echo "❌ Mapping correction failed. Using original app..."
            APP_FILE="app.py"
        fi
    else
        echo "📝 Using original app with potential ID mismatches..."
        APP_FILE="app.py"
    fi
else
    echo "⚠️  Warning: No attendance data found!"
    echo "📋 Please run 'python update.py' first to extract data from your ZKTeco device"
    echo ""
    read -p "Do you want to run the data extraction now? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🔄 Extracting data from ZKTeco device..."
        python update.py
        if [ $? -eq 0 ]; then
            echo "✅ Data extraction completed successfully!"
            echo "🔄 Now creating corrected user mapping..."
            python create_correct_mapping.py
            if [ $? -eq 0 ]; then
                echo "✅ User ID mapping correction completed!"
                APP_FILE="corrected_app.py"
            else
                echo "⚠️  Using original app without corrections..."
                APP_FILE="app.py"
            fi
        else
            echo "❌ Data extraction failed. Please check your device connection."
            exit 1
        fi
    else
        echo "❌ Cannot start without data files. Exiting..."
        exit 1
    fi
fi

# Kill any existing Flask processes on port 8080
echo "🧹 Cleaning up any existing processes..."
pkill -f "python.*app.py" 2>/dev/null || true
sleep 2

# Start the web application
echo "🌐 Starting web server on http://localhost:8080"
echo "📊 Access your attendance dashboard at: http://localhost:8080"
echo ""
echo "🎯 Available Features:"
echo "   • Dashboard: http://localhost:8080"
echo "   • Daily Reports: http://localhost:8080/daily"
echo "   • Monthly Reports: http://localhost:8080/monthly"
echo "   • User Management: http://localhost:8080/users (CRUD operations)"
echo "   • Raw Data Viewer: http://localhost:8080/raw-data (Live device data)"
echo ""
if [ "$APP_FILE" = "corrected_app.py" ]; then
    echo "✅ Using enhanced app with:"
    echo "   • Fixed user ID mappings"
    echo "   • Raw device data access"
    echo "   • Live device status monitoring"
    echo "   • Dynamic data synchronization"
    echo "   • Complete user management"
fi
echo "🛑 Press Ctrl+C to stop the server"
echo ""

python $APP_FILE
