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

# Registro modular de rutas
register_patient_routes(api)
register_order_routes(api)
register_prescription_routes(api)
register_appointment_routes(api)
register_comment_routes(api)
register_doctor_routes(api)
register_notification_routes(api)
register_stats_routes(api)


# ----------------------------
# Ruta simple de prueba
# ----------------------------
@api.route("/hello", methods=["GET", "POST"])
def handle_hello():
    return (
        jsonify(
            {
                "message": "Hello! I'm a message from the backend. Check the network tab in your browser's developer tools."
            }
        ),
        200,
    )
