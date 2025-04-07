from flask import request, jsonify
from api.utils import APIException
from api.models import db, Prescription
from api.schemas import PrescriptionSchema
from sqlalchemy.exc import SQLAlchemyError
from datetime import datetime


prescription_schema = PrescriptionSchema()
prescriptions_schema = PrescriptionSchema(many=True)


def register_prescription_routes(api):

    @api.route("/prescriptions", methods=["POST"])
    def create_prescription():
        try:
            data = request.get_json()
            prescription = prescription_schema.load(data, session=db.session)
            db.session.add(prescription)
            db.session.commit()
            return (
                jsonify(
                    {
                        "msg": "Receta creada exitosamente",
                        "prescription": prescription_schema.dump(prescription),
                    }
                ),
                201,
            )
        except SQLAlchemyError as e:
            db.session.rollback()
            raise APIException(f"Error al crear la receta: {str(e)}", status_code=400)

    @api.route("/prescriptions/<int:prescrip_id>", methods=["GET"])
    def get_prescription(prescrip_id):
        prescription = Prescription.query.get(prescrip_id)
        if not prescription:
            raise APIException("Receta no encontrada", status_code=404)
        return jsonify(prescription_schema.dump(prescription)), 200

    @api.route("/prescriptions/<int:prescrip_id>", methods=["PUT"])
    def update_prescription(prescrip_id):
        prescription = Prescription.query.get(prescrip_id)
        if not prescription:
            raise APIException("Receta no encontrada", status_code=404)

        updates = request.get_json()
        campos_permitidos = [
            "identity_number",
            "left_eye_sph",
            "right_eye_sph",
            "left_eye_cyl",
            "right_eye_cyl",
            "left_eye_axis",
            "right_eye_axis",
            "notes",
            "dated_at",
        ]

        for field, value in updates.items():
            if field in campos_permitidos:
                if field == "dated_at":
                    try:
                        value = datetime.fromisoformat(value)
                    except ValueError:
                        raise APIException("Formato de fecha inválido", 400)
                setattr(prescription, field, value)

        db.session.commit()
        return jsonify({"message": "Receta actualizada correctamente"}), 200

    @api.route("/prescriptions/<int:prescrip_id>", methods=["DELETE"])
    def delete_prescription(prescrip_id):
        prescription = Prescription.query.get(prescrip_id)
        if not prescription:
            raise APIException("Receta no encontrada", status_code=404)

        db.session.delete(prescription)
        db.session.commit()
        return jsonify({"message": "Receta eliminada correctamente"}), 200

    @api.route("/prescriptions", methods=["GET"])
    def get_all_prescriptions():
        prescriptions = Prescription.query.all()
        return jsonify(prescriptions_schema.dump(prescriptions)), 200
