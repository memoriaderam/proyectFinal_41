
from flask import request, jsonify
from api.utils import APIException
from api.models import db, Prescription
from api.schemas import PrescriptionSchema
from sqlalchemy.exc import SQLAlchemyError

prescription_schema = PrescriptionSchema()

def register_prescription_routes(api):

    @api.route('/prescriptions', methods=['POST'])
    def create_prescription():
        try:
            data = request.get_json()
            prescription = prescription_schema.load(data, session=db.session)
            db.session.add(prescription)
            db.session.commit()
            return jsonify({"msg": "Receta creada exitosamente", "prescription": prescription_schema.dump(prescription)}), 201
        except SQLAlchemyError as e:
            db.session.rollback()
            raise APIException(f"Error al crear la receta: {str(e)}", status_code=400)

    @api.route('/prescriptions/<int:prescrip_id>', methods=['GET'])
    def get_prescription(prescrip_id):
        prescription = Prescription.query.get(prescrip_id)
        if not prescription:
            raise APIException("Receta no encontrada", status_code=404)
        return jsonify(prescription_schema.dump(prescription)), 200
