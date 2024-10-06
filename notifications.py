# notifications.py
import os
import requests
from flask import jsonify

# Load environment variables
from dotenv import load_dotenv # type: ignore
load_dotenv()

SENDGRID_API_KEY = os.getenv('d-e2c462c04a4340fd8c3a7c9ae294620d')

# Function to send push notifications
def send_push_notification(user_email, message):
    url = "https://api.sendgrid.com/v3/mail/send"
    headers = {
        "Authorization": f"Bearer {'R1F3FBYRN1DMDZP65QACVXJV'}",
        "Content-Type": "application/json"
    }
    data = {
        "personalizations": [
            {
                "to": [{"email": user_email}],
                "subject": "Landsat Notification"
            }
        ],
        "from": {"email": "rahul160503@gmail.com"},
        "content": [
            {
                "type": "text/plain",
                "value": message
            }
        ]
    }

    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 202:
        return jsonify({"success": "Notification sent successfully!"}), 200
    else:
        return jsonify({"error": "Failed to send notification!"}), 500
