
from flask import request, jsonify
from api.utils import APIException
from api.models import db, Order
from api.schemas import OrderSchema
from sqlalchemy.exc import SQLAlchemyError

order_schema = OrderSchema()

def register_order_routes(api):

    @api.route('/orders', methods=['POST'])
    def create_order():
        try:
            data = request.get_json()
            order = order_schema.load(data, session=db.session)
            db.session.add(order)
            db.session.commit()
            return jsonify({"msg": "Pedido creado exitosamente", "order": order_schema.dump(order)}), 201
        except SQLAlchemyError as e:
            db.session.rollback()
            raise APIException(f"Error al crear el pedido: {str(e)}", status_code=400)

    @api.route('/orders/<int:order_id>', methods=['GET'])
    def get_order(order_id):
        order = Order.query.get(order_id)
        if not order:
            raise APIException("Pedido no encontrado", status_code=404)
        return jsonify(order_schema.dump(order)), 200

    @api.route('/orders/<int:order_id>', methods=['PUT'])
    def update_order(order_id):
        order = Order.query.get(order_id)
        if not order:
            raise APIException("Pedido no encontrado", status_code=404)

        try:
            data = request.get_json()
            for key, value in data.items():
                if hasattr(order, key):
                    setattr(order, key, value)
            db.session.commit()
            return jsonify({"msg": "Pedido actualizado", "order": order_schema.dump(order)}), 200
        except SQLAlchemyError as e:
            db.session.rollback()
            raise APIException(f"Error al actualizar el pedido: {str(e)}", status_code=400)
