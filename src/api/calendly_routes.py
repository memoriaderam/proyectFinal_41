import os
import requests
from flask import Blueprint, jsonify, request

CALENDLY_TOKEN = os.getenv("CALENDLY_TOKEN")
BASE_URL = "https://api.calendly.com"
HEADERS = {
    "Authorization": f"Bearer {CALENDLY_TOKEN}",
    "Content-Type": "application/json"
}

def register_calendly_routes(api):

    @api.route('/calendly/events', methods=['GET'])
    def get_event_types():
        user_response = requests.get(f"{BASE_URL}/users/me", headers=HEADERS)
        user_uri = user_response.json()["resource"]["uri"]
        events_response = requests.get(f"{BASE_URL}/event_types?user={user_uri}", headers=HEADERS)
        return jsonify(events_response.json())

    @api.route('/calendly/webhook', methods=['POST'])
    def calendly_webhook():
        data = request.json
        event = data.get("event")
        payload = data.get("payload", {})

        if event == "invitee.created":
            print("Cita agendada:", payload.get("event"))
        elif event == "invitee.canceled":
            print("Cita cancelada:", payload.get("event"))

        return jsonify({"status": "ok"}), 200

    @api.route('/calendly/register_webhook', methods=['POST'])
    def register_webhook():
        webhook_url = request.json.get("url")
        if not webhook_url:
            return jsonify({"msg": "Falta la URL"}), 400

        user_response = requests.get(f"{BASE_URL}/users/me", headers=HEADERS)
        org_uri = user_response.json()["resource"]["current_organization"]

        payload = {
            "url": webhook_url,
            "events": ["invitee.created", "invitee.canceled"],
            "organization": org_uri,
            "scope": "organization"
        }

        response = requests.post(f"{BASE_URL}/webhook_subscriptions", headers=HEADERS, json=payload)
        return jsonify(response.json()), response.status_code

    @api.route("/calendly/appointments", methods=["GET"])
    def get_calendly_appointments():
        try:
            user_resp = requests.get(f"{BASE_URL}/users/me", headers=HEADERS)
            user_uri = user_resp.json()["resource"]["uri"]

            events_resp = requests.get(
                f"{BASE_URL}/scheduled_events",
                headers=HEADERS,
                params={"user": user_uri}
            )

            if events_resp.status_code != 200:
                return jsonify({"msg": "No se pudieron obtener las citas"}), events_resp.status_code

            all_events = events_resp.json().get("collection", [])
            email = request.args.get("email")
            filtered_events = []

            for event in all_events:
                if event.get("status") != "active":
                    continue

                invitees_url = f"{event['uri']}/invitees"
                invitees_resp = requests.get(invitees_url, headers=HEADERS)

                if invitees_resp.status_code == 200:
                    invitees = invitees_resp.json().get("collection", [])
                    for i in invitees:
                        if i["email"] == email:
                            filtered_events.append({
                                "name": event["name"],
                                "start_time": event["start_time"],
                                "email": i["email"],
                                "event_uri": event["uri"],
                                "invitee_uri": i["uri"],
                                "status": event.get("status", "unknown")
                            })

            return jsonify({"items": filtered_events}), 200
        except Exception as e:
            print("Error obteniendo citas:", e)
            return jsonify({"msg": "Error interno del servidor"}), 500

    @api.route('/calendly/cancel', methods=['POST'])
    def cancel_event():
        data = request.json
        event_uri = data.get("event_uri")
        reason = data.get("reason", "Cancelado por el usuario")

        if not event_uri:
            return jsonify({"msg": "Falta el event_uri"}), 400

        cancel_url = f"{event_uri}/cancellation"
        cancel_payload = {"reason": reason}
        cancel_response = requests.post(cancel_url, headers=HEADERS, json=cancel_payload)

        if cancel_response.status_code == 201:
            return jsonify({"msg": "Evento cancelado correctamente"}), 201
        return jsonify(cancel_response.json()), cancel_response.status_code
