"""
This module registers the API routes and loads necessary configurations.
"""

from flask import Blueprint, jsonify
from api.utils import generate_sitemap, APIException

# Instancia principal de Blueprint
api = Blueprint("api", __name__)

# ----------------------------
# Módulos de rutas
# ----------------------------
from api.patient_routes import register_patient_routes
from api.order_routes import register_order_routes
from api.prescription_routes import register_prescription_routes
from api.appointment_routes import register_appointment_routes
from api.comment_routes import register_comment_routes
from api.doctor_routes import register_doctor_routes
from api.notification_routes import register_notification_routes
from api.stats_routes import register_stats_routes
from flask import Flask, request, jsonify, url_for, Blueprint, session, redirect
from api.models import db, User
from api.utils import generate_sitemap, APIException
from api.utils import send_reset_email, send_password_changed_email
from flask_cors import CORS
from dotenv import load_dotenv
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager
from datetime import timedelta
from werkzeug.security import generate_password_hash
from flask_jwt_extended import decode_token
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError
from urllib.parse import urlparse
#Ivan
import os
import jwt
import requests
import datetime
load_dotenv()

api_v1 = Blueprint('api_v1', __name__)

CALENDLY_TOKEN = os.getenv("CALENDLY_TOKEN")  # Idealmente en .env
BASE_URL = "https://api.calendly.com"

HEADERS = {
    "Authorization": f"Bearer {CALENDLY_TOKEN}",
    "Content-Type": "application/json"
}

MAILGUN_API_KEY = os.getenv("MAILGUN_API_KEY")
MAILGUN_DOMAIN = os.getenv("MAILGUN_DOMAIN")

CORS(api_v1, origins=["http://localhost:3000"], supports_credentials=True, allow_headers=["Content-Type", "Authorization"])

from api import post_routes
from api import sing_up
from api import login

# Registro modular de rutas
register_patient_routes(api)
register_order_routes(api)
register_prescription_routes(api)
register_appointment_routes(api)
register_comment_routes(api)
register_doctor_routes(api)
register_notification_routes(api)
register_stats_routes(api)

@api_v1.route('/reset', methods=['POST'])
def reset_password():
    email = request.json.get('email', None)
    if not email:
        return jsonify({"msg": "Email is required"}), 400
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"msg": "User with this email does not exist."}), 404
    import secrets
    reset_token = secrets.token_urlsafe(32)
    user.reset_token = reset_token
    db.session.commit()
    reset_url = f"{os.getenv('FRONTEND_URL')}/new_password?token={reset_token}"
    try:
        send_reset_email(user.email, reset_url)
    except Exception as e:
        return jsonify({"msg": f"Error sending reset email: {str(e)}"}), 500
    return jsonify({"msg": "Password reset email sent."}), 200

@api.route("/hello", methods=["POST", "GET"])
def handle_hello():
    return (
        jsonify(
            {
                "message": "Hello! I'm a message from the backend. Check the network tab in your browser's developer tools."
            }
        ),
        200,
    )
@api_v1.route('/new_password', methods=['PUT'])
def set_new_password():
    token = request.json.get("token")
    new_password = request.json.get("password")
    if not token or not new_password:
        return jsonify({"msg": "Token y nueva contraseña son requeridos"}), 400
    user = User.query.filter_by(reset_token=token).first()
    if not user:
        return jsonify({"msg": "Token inválido o expirado"}), 422
    user.password_hash = generate_password_hash(new_password)  # <- cambio aquí
    user.reset_token = None
    db.session.commit()
    try:
        send_password_changed_email(user.email)
    except Exception as e:
        print("Error al enviar email de confirmación:", e)
    return jsonify({"msg": "Contraseña actualizada correctamente"}), 200


# 1. Obtener tipos de eventos
@api_v1.route('/calendly/events', methods=['GET'])
def get_event_types():
    user_response = requests.get(f"{BASE_URL}/users/me", headers=HEADERS)
    user_uri = user_response.json()["resource"]["uri"]

    events_response = requests.get(f"{BASE_URL}/event_types?user={user_uri}", headers=HEADERS)
    return jsonify(events_response.json())

# 3. Webhook que recibe eventos desde Calendly
@api_v1.route('/calendly/webhook', methods=['POST'])
def calendly_webhook():
    data = request.json
    print("Webhook recibido:", data)

    event = data.get("event")
    payload = data.get("payload", {})
    # Aquí podrías guardar en la base de datos, por ejemplo:
    if event == "invitee.created":
        print("Cita agendada:", payload.get("event"))
    elif event == "invitee.canceled":
        print("Cita cancelada:", payload.get("event"))

    return jsonify({"status": "ok"}), 200

# 4. Registrar el webhook (una sola vez)
@api_v1.route('/calendly/register_webhook', methods=['POST'])
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

@api_v1.route("/calendly/appointments", methods=["GET"])
def get_calendly_appointments():
    try:
        # Obtener el URI del usuario autenticado
        user_resp = requests.get(f"{BASE_URL}/users/me", headers=HEADERS)
        user_uri = user_resp.json()["resource"]["uri"]

        # Obtener todos los eventos programados
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
            # Filtrar solo eventos activos
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
                            "status": event.get("status", "unknown")  # <-- Agregamos esto
                        })

        return jsonify({"items": filtered_events}), 200

    except Exception as e:
        print("Error obteniendo citas:", e)
        return jsonify({"msg": "Error interno del servidor"}), 500


@api_v1.route('/calendly/cancel', methods=['POST'])
def cancel_event():
    data = request.json
    event_uri = data.get("event_uri")
    reason = data.get("reason", "Cancelado por el usuario")  # Razón opcional
    email = data.get("email")  # Guardamos el email si es necesario para otros procesos

    if not event_uri:
        return jsonify({"msg": "Falta el event_uri"}), 400

    # Construir la URL para la cancelación
    cancel_url = f"{event_uri}/cancellation"
    cancel_payload = {"reason": reason}
    
    # Realizar la solicitud a la API de Calendly
    cancel_response = requests.post(cancel_url, headers=HEADERS, json=cancel_payload)

    if cancel_response.status_code == 201:
        return jsonify({"msg": "Evento cancelado correctamente"}), 201
    return jsonify(cancel_response.json()), cancel_response.status_code

# Ruta para obtener la información del usuario autenticado
@api_v1.route("/profile", methods=["GET"])
def get_user_profile():
    try:
        # Por ahora, obtendremos el primer usuario de la base de datos
        user = User.query.first()  # Esto obtiene el primer usuario de la base de datos

        if user:
            # Devolvemos los datos del usuario, excluyendo la contraseña
            return jsonify({
                "full_name": user.full_name,
                "email": user.email,
                "gender": user.gender,
                "age": user.age,
                "address": user.address,
                "phone": user.phone,
                "speciality": user.speciality,
                "is_active": user.is_active,
                "create_at": user.create_at
            }), 200
        else:
            return jsonify({"msg": "Usuario no encontrado"}), 404

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"msg": "Error interno del servidor"}), 500

#@api_v1.route('/hello', methods=['POST', 'GET'])
#def handle_hello():

#    response_body = {
#        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
#    }

#    return jsonify(response_body), 200
