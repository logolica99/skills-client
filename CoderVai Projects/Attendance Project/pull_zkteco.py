# pull_zkteco.py
from zk import ZK, const
import csv
from datetime import datetime

DEVICE_IP = "10.10.19.171"   # e.g. "192.168.1.203"
PORT = 4370
TIMEOUT = 10

def save_csv(filename, rows, headers):
    with open(filename, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(headers)
        writer.writerows(rows)

def main():
    zk = ZK(DEVICE_IP, port=PORT, timeout=TIMEOUT)
    conn = None
    try:
        print(f"Connecting to {DEVICE_IP}:{PORT} ...")
        conn = zk.connect()
        conn.disable_device()   # optional: freeze device while reading
        print("Connected. Getting users ...")
        users = conn.get_users()
        user_rows = []
        for u in users:
            # u.uid, u.name, u.card, u.password, u.group_id, u.user_id
            user_rows.append([u.uid, u.name, getattr(u, "card", ""), getattr(u, "password", ""), getattr(u, "group_id", ""), getattr(u, "user_id", "")])
        save_csv("zkteco_users.csv", user_rows, ["uid","name","card","password","group_id","user_id"])
        print(f"Saved {len(user_rows)} users to zkteco_users.csv")

        print("Getting attendance logs ...")
        attendance = conn.get_attendance()  # returns tuples (uid, timestamp, ptype, status)
        att_rows = []
        for a in attendance:
            # specific tuple contents vary: often (user_id, timestamp, status)
            # pyzk returns a list of ZKAttendance objects sometimes — normalize:
            try:
                uid = a.user_id
                ts = a.timestamp
                status = a.status
            except AttributeError:
                # fallback if get_attendance returned tuples
                uid, ts, status = a[0], a[1], a[2] if len(a) > 2 else ""
            # ts may be a datetime or integer => convert
            if isinstance(ts, (int, float)):
                ts = datetime.fromtimestamp(ts)
            att_rows.append([uid, str(ts), status])
        save_csv("zkteco_attendance.csv", att_rows, ["user_id", "timestamp", "status"])
        print(f"Saved {len(att_rows)} attendance rows to zkteco_attendance.csv")

    except Exception as e:
        print("Error:", e)
    finally:
        if conn:
            try:
                conn.enable_device()
                conn.disconnect()
            except:
                pass

if __name__ == "__main__":
    main()
