from flask import jsonify
from api.utils import APIException
from api.models import (
    db,
    User,
    Appointment,
    Order,
    Prescription,
    Role,
    Post,
    Notification,
    Comment,
)


def register_stats_routes(api):

    @api.route("/stats/summary", methods=["GET"])
    def get_summary_stats():
        try:
            total_patients = User.query.filter_by(role_id=3).count()
            total_doctors = User.query.filter_by(role_id=2).count()
            total_admins = User.query.filter_by(role_id=1).count()

            total_appointments = Appointment.query.count()
            total_orders = Order.query.count()
            total_prescriptions = Prescription.query.count()
            total_posts = Post.query.count()  # no existe post aun
            total_notifications = Notification.query.count()
            total_comments = Comment.query.count()

            return (
                jsonify(
                    {
                        "usuarios": {
                            "pacientes": total_patients,
                            "doctores": total_doctors,
                            "administradores": total_admins,
                        },
                        "citas": total_appointments,
                        "pedidos": total_orders,
                        "recetas": total_prescriptions,
                        "publicaciones": total_posts,
                        "notificaciones": total_notifications,
                        "comentarios": total_comments,
                    }
                ),
                200,
            )
        except Exception as e:
            raise APIException(
                f"Error al obtener estadísticas: {str(e)}", status_code=500
            )
