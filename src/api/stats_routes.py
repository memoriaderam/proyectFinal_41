
from flask import jsonify
from api.utils import APIException
from api.models import db, User, Appointment, Order, Prescription

def register_stats_routes(api):

    @api.route('/stats/summary', methods=['GET'])
    def get_summary_stats():
        try:
            total_patients = User.query.filter_by(role_id=3).count()  # Suponiendo 3 = paciente
            total_appointments = Appointment.query.count()
            total_orders = Order.query.count()
            total_prescriptions = Prescription.query.count()

            return jsonify({
                "total_patients": total_patients,
                "total_appointments": total_appointments,
                "total_orders": total_orders,
                "total_prescriptions": total_prescriptions
            }), 200
        except Exception as e:
            raise APIException(f"Error al obtener estadísticas: {str(e)}", status_code=500)
