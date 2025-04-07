from flask import request, jsonify
from api.models import db, Notification
from api.schemas import NotificationSchema
from api.utils import APIException

notification_schema = NotificationSchema()
notifications_schema = NotificationSchema(many=True)


def register_notification_routes(api):

    @api.route("/notifications", methods=["POST"])
    def create_notification():
        try:
            data = request.get_json()
            if not data or "message" not in data:
                raise APIException("El campo 'message' es obligatorio", 400)

            notification = notification_schema.load(data, session=db.session)
            db.session.add(notification)
            db.session.commit()
            return jsonify(notification_schema.dump(notification)), 201
        except Exception as e:
            raise APIException(f"Error al crear notificación: {str(e)}", 500)

    @api.route("/notifications", methods=["GET"])
    def get_notifications():
        notifications = Notification.query.all()
        return jsonify(notifications_schema.dump(notifications)), 200

    @api.route("/notifications/<int:id>/read", methods=["PATCH"])
    def mark_notification_as_read(id):
        notification = Notification.query.get(id)
        if not notification:
            raise APIException("Notificación no encontrada", 404)

        notification.is_read = True
        db.session.commit()
        return jsonify({"message": "Notificación marcada como leída"}), 200
