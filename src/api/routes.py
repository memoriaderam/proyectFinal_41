"""
This module registers and organizes all API routes using a single Blueprint instance.
"""

# ---------- Importaciones ordenadas ----------
import os
from dotenv import load_dotenv
from flask import Blueprint
from flask_cors import CORS

# ---------- Registro modular de rutas ----------
from api.patient_routes import register_patient_routes
from api.order_routes import register_order_routes
from api.prescription_routes import register_prescription_routes
from api.appointment_routes import register_appointment_routes
from api.comment_routes import register_comment_routes
from api.doctor_routes import register_doctor_routes
from api.notification_routes import register_notification_routes
from api.stats_routes import register_stats_routes
from api.reset_routes import register_reset_routes
from api.calendly_routes import register_calendly_routes
from api.post_routes import register_post_routes
from api.serve_uploads_routes import register_serve_uploads_routes
# ---------- Inicialización ----------
load_dotenv()
api = Blueprint("api", __name__)
CORS(api, origins=["http://localhost:3000"], supports_credentials=True, allow_headers=["Content-Type", "Authorization"])

register_patient_routes(api)
register_order_routes(api)
register_prescription_routes(api)
register_appointment_routes(api)
register_comment_routes(api)
register_doctor_routes(api)
register_notification_routes(api)
register_stats_routes(api)
register_reset_routes(api)
register_calendly_routes(api)
register_post_routes(api)
register_serve_uploads_routes(api)


# ---------- Ruta de prueba ----------
from flask import jsonify

@api.route("/hello", methods=["POST", "GET"])
def handle_hello():
    return jsonify({"message": "Hello! I'm a message from the backend."}), 200