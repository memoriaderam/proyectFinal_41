from flask import request, jsonify
from api.utils import APIException
from api.models import db, Order
from api.schemas import OrderSchema
from sqlalchemy.exc import SQLAlchemyError
from datetime import datetime


order_schema = OrderSchema()


def register_order_routes(api):

    @api.route("/orders", methods=["POST"])
    def create_order():
        try:
            data = request.get_json()
            order = order_schema.load(data, session=db.session)
            db.session.add(order)
            db.session.commit()
            return (
                jsonify(
                    {
                        "msg": "Pedido creado exitosamente",
                        "order": order_schema.dump(order),
                    }
                ),
                201,
            )
        except SQLAlchemyError as e:
            db.session.rollback()
            raise APIException(f"Error al crear el pedido: {str(e)}", status_code=400)

    @api.route("/orders/<int:order_id>", methods=["GET"])
    def get_order(order_id):
        order = Order.query.get(order_id)
        if not order:
            raise APIException("Pedido no encontrado", status_code=404)
        return jsonify(order_schema.dump(order)), 200

    @api.route("/orders", methods=["GET"])
    def get_all_orders():
        try:
            orders = Order.query.all()
            return jsonify(order_schema.dump(orders, many=True)), 200
        except SQLAlchemyError as e:
            raise APIException(
                f"Error al obtener las órdenes: {str(e)}", status_code=500
            )

    @api.route("/orders/<int:order_id>", methods=["PUT"])
    def update_order(order_id):
        order = Order.query.get(order_id)
        if not order:
            raise APIException("Pedido no encontrado", status_code=404)

        try:
            data = request.get_json()
            campos_permitidos = [
                "identity_number",
                "prescrip_id",
                "status",
                "lens_type",
                "frame_type",
                "price",
                "dated_at",
            ]
            for key, value in data.items():
                if key in campos_permitidos:
                    # Convertir fecha si es necesario
                    if key == "dated_at":
                        try:
                            value = datetime.fromisoformat(value)
                        except ValueError:
                            raise APIException(
                                "Formato de fecha inválido. Usa ISO 8601: YYYY-MM-DDTHH:MM:SS",
                                400,
                            )
                    setattr(order, key, value)

            db.session.commit()
            return (
                jsonify(
                    {"msg": "Pedido actualizado", "order": order_schema.dump(order)}
                ),
                200,
            )

        except SQLAlchemyError as e:
            db.session.rollback()
            raise APIException(
                f"Error al actualizar el pedido: {str(e)}", status_code=400
            )
