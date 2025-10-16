# pull_zkteco_debug.py
import logging
import csv
import time
import socket
import subprocess
import sys
from datetime import datetime
from zk import ZK
from zk.exception import ZKNetworkError
from socket import timeout as SocketTimeout

# CONFIG
DEVICE_IP = "10.10.19.171"    # ← replace
PORT = 4370
CONNECT_TIMEOUT = 120       # seconds (increase)
RETRY_ATTEMPTS = 3
SAVE_EVERY = 1000          # flush after this many rows
USERS_CSV = "zkteco_users.csv"
ATT_CSV = "zkteco_attendance_partial.csv"  # Will be renamed to complete after successful extraction

# Logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger("zk_debug")

def test_network_connectivity():
    """Test network connectivity to the device before attempting ZK connection"""
    log.info("Testing network connectivity to %s:%d", DEVICE_IP, PORT)
    
    # Test ping
    try:
        result = subprocess.run(['ping', '-c', '3', DEVICE_IP], 
                              capture_output=True, text=True, timeout=10)
        if result.returncode == 0:
            log.info("✓ Ping test successful")
        else:
            log.warning("✗ Ping test failed: %s", result.stderr.strip())
            return False
    except subprocess.TimeoutExpired:
        log.warning("✗ Ping test timed out")
        return False
    except Exception as e:
        log.warning("✗ Ping test error: %s", e)
        return False
    
    # Test port connectivity
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(10)
        result = sock.connect_ex((DEVICE_IP, PORT))
        sock.close()
        if result == 0:
            log.info("✓ Port %d is accessible", PORT)
            return True
        else:
            log.warning("✗ Port %d is not accessible (error: %d)", PORT, result)
            return False
    except Exception as e:
        log.warning("✗ Port test error: %s", e)
        return False

def save_csv(filename, rows, headers=None, mode="a"):
    write_header = False
    if mode == "w":
        write_header = True
    try:
        with open(filename, mode, newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            if write_header and headers:
                writer.writerow(headers)
            writer.writerows(rows)
    except Exception as e:
        log.exception("Failed to save CSV: %s", e)

def fetch():
    # First test network connectivity
    if not test_network_connectivity():
        log.error("Network connectivity test failed. Please check:")
        log.error("1. Device is powered on and connected to network")
        log.error("2. Device IP address is correct: %s", DEVICE_IP)
        log.error("3. Your computer can reach the device network")
        return False
    
    # Try different connection parameters and multiple attempts
    connection_configs = [
        {"timeout": CONNECT_TIMEOUT, "password": 0, "force_udp": False},
        {"timeout": 60, "password": 0, "force_udp": True},
        {"timeout": 30, "password": 0, "force_udp": False},
        {"timeout": CONNECT_TIMEOUT, "password": None, "force_udp": False},
    ]
    
    for attempt, config in enumerate(connection_configs, 1):
        log.info("Connection attempt %d/%d with config: %s", attempt, len(connection_configs), config)
        
        try:
            if config.get("force_udp"):
                zk = ZK(DEVICE_IP, port=PORT, timeout=config["timeout"], password=config["password"], force_udp=True)
            else:
                zk = ZK(DEVICE_IP, port=PORT, timeout=config["timeout"], password=config["password"])
            
            conn = None
            try:
                log.info("Attempting ZK connection to %s:%d (timeout=%ds)...", DEVICE_IP, PORT, config["timeout"])
                conn = zk.connect()
                log.info("✓ Successfully connected to device!")
                
                # Test basic device info
                try:
                    device_info = conn.get_device_name()
                    log.info("Device name: %s", device_info)
                except:
                    log.info("Device connected but couldn't get device name")
                
                log.info("Getting users ...")
                users = conn.get_users()
                urows = []
                for u in users:
                    urows.append([getattr(u, "uid", ""), getattr(u, "name", ""), getattr(u, "card", "")])
                save_csv(USERS_CSV, urows, headers=["uid","name","card"], mode="w")
                log.info("Saved %d users -> %s", len(urows), USERS_CSV)

                # Try reading attendance with retries
                att_attempt = 0
                att_rows = []
                while att_attempt < RETRY_ATTEMPTS:
                    att_attempt += 1
                    try:
                        log.info("Attendance attempt %d/%d ...", att_attempt, RETRY_ATTEMPTS)
                        # NOTE: comment out disable_device if your device misbehaves when frozen
                        # conn.disable_device()
                        logs = conn.get_attendance()
                        log.info("get_attendance() returned, iterating logs ...")
                        count = 0
                        first_batch = True
                        for l in logs:
                            # handle object or tuple shapes
                            try:
                                uid = str(l.user_id)
                                ts = l.timestamp
                                status = getattr(l, "status", "")
                            except Exception:
                                # tuple fallback
                                uid = str(l[0])
                                ts = l[1]
                                status = l[2] if len(l) > 2 else ""
                            if isinstance(ts, (int, float)):
                                ts = datetime.fromtimestamp(ts)
                            att_rows.append([uid, str(ts), status])
                            count += 1
                            if count % SAVE_EVERY == 0:
                                log.info("Flushing %d attendance rows to disk ...", len(att_rows))
                                # WRITE mode for first batch to clear old data, then APPEND for rest
                                mode = "w" if first_batch else "a"
                                # NO HEADERS - app.py expects raw data without headers
                                save_csv(ATT_CSV, att_rows, headers=None, mode=mode)
                                first_batch = False
                                att_rows = []
                        # flush remaining
                        if att_rows:
                            mode = "w" if first_batch else "a"
                            # NO HEADERS - app.py expects raw data without headers
                            save_csv(ATT_CSV, att_rows, headers=None, mode=mode)
                        log.info("Attendance fetch completed. Saved %d records to %s", count, ATT_CSV)
                        
                        # Add completion timestamp to the file
                        import os
                        from datetime import datetime
                        
                        # Create a completion marker file
                        completion_info = f"# Data extracted on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n"
                        completion_info += f"# Total users: {len(urows)}\n"
                        completion_info += f"# Total attendance records: {count}\n"
                        completion_info += f"# Device: {DEVICE_IP}:{PORT}\n"
                        
                        with open("data_extraction_info.txt", "w") as f:
                            f.write(completion_info)
                        
                        break  # success
                    except SocketTimeout as e:
                        log.warning("SocketTimeout on attendance attempt %d: %s", att_attempt, e)
                        time.sleep(2 * att_attempt)
                    except Exception as e:
                        log.exception("Exception while fetching attendance on attempt %d: %s", att_attempt, e)
                        time.sleep(2 * att_attempt)
                else:
                    log.error("All attendance attempts exhausted — attendance read failed.")
                    
                return True  # Successfully connected and got users at least
                
            except ZKNetworkError as e:
                log.error("ZK Network Error on attempt %d: %s", attempt, e)
                if attempt < len(connection_configs):
                    log.info("Trying next connection configuration...")
                    time.sleep(2)
                    continue
                else:
                    log.error("All connection attempts failed")
            except Exception as e:
                log.exception("Connection error on attempt %d: %s", attempt, e)
                time.sleep(2)
                continue
            finally:
                if conn:
                    try:
                        # conn.enable_device()
                        conn.disconnect()
                        log.info("Disconnected from device")
                    except Exception:
                        pass
        except Exception as e:
            log.exception("Unexpected error: %s", e)
            
    log.error("All connection attempts failed")
    return False

if __name__ == "__main__":
    fetch()
