from io import BytesIO
from flask import request, jsonify, send_file
from api.utils import APIException
from api.models import db, Prescription, User
from api.schemas import PrescriptionSchema
from sqlalchemy.exc import SQLAlchemyError
from datetime import datetime
from reportlab.pdfgen import canvas


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

    @api.route("/prescriptions/<int:prescrip_id>/download", methods=["GET"])
    def download_prescription_pdf(prescrip_id):
        rx = Prescription.query.get(prescrip_id)
        if not rx:
            raise APIException("Receta no encontrada", 404)

        patient = User.query.filter_by(identity_number=rx.identity_number).first()
        patient_name = patient.full_name if patient else "Paciente desconocido"

        buffer = BytesIO()
        p = canvas.Canvas(buffer)
        p.setFont("Helvetica-Bold", 14)
        p.drawString(200, 800, "Receta Óptica")

        p.setFont("Helvetica", 12)
        p.drawString(100, 770, f"ID Receta: {rx.prescrip_id}")
        p.drawString(100, 750, f"Paciente: {rx.identity_number} - {patient_name}")
        p.drawString(100, 730, f"Fecha: {rx.dated_at.strftime('%Y-%m-%d')}")

        p.drawString(100, 700, f"Ojo Izquierdo:")
        p.drawString(120, 680, f"Esfera (SPH): {rx.left_eye_sph}")
        p.drawString(120, 660, f"Cilindro (CYL): {rx.left_eye_cyl}")
        p.drawString(120, 640, f"Eje (AXIS): {rx.left_eye_axis}")

        p.drawString(100, 610, f"Ojo Derecho:")
        p.drawString(120, 590, f"Esfera (SPH): {rx.right_eye_sph}")
        p.drawString(120, 570, f"Cilindro (CYL): {rx.right_eye_cyl}")
        p.drawString(120, 550, f"Eje (AXIS): {rx.right_eye_axis}")

        p.drawString(100, 520, f"Notas: {rx.notes or 'Sin notas'}")

        p.showPage()
        p.save()
        buffer.seek(0)

        return send_file(
            buffer,
            mimetype="application/pdf",
            as_attachment=True,
            download_name=f"receta_{rx.prescrip_id}.pdf",
        )
