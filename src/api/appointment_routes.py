from flask import request, jsonify
from api.models import db, Appointment
from api.schemas import AppointmentSchema
from api.utils import APIException
from datetime import datetime

appointment_schema = AppointmentSchema()
appointments_schema = AppointmentSchema(many=True)

def register_appointment_routes(api):

    @api.route('/appointments', methods=['POST'])
    def create_appointment():
        try:
            data = request.json
            appointment = appointment_schema.load(data, session=db.session)
            db.session.add(appointment)
            db.session.commit()
            return jsonify(appointment_schema.dump(appointment)), 201
        except Exception as e:
            raise APIException(f"Error al crear cita: {str(e)}", 500)

    @api.route('/appointments/<int:id_app>', methods=['PUT'])
    def update_appointment(id_app):
        try:
            appointment = Appointment.query.get(id_app)
            if not appointment:
                raise APIException("Cita no encontrada", 404)

            data = request.get_json()
            if not data:
                raise APIException("No se recibieron datos JSON válidos", 400)

            campos_permitidos = ['identity_number', 'doctor_id', 'dated_at']
            actualizados = []

            for key in campos_permitidos:
                if key in data:
                    value = data[key]

                    # Convertir string a datetime si es dated_at
                    if key == 'dated_at':
                        try:
                            value = datetime.fromisoformat(value)
                        except ValueError:
                            raise APIException("Formato de fecha inválido. Usa ISO 8601: YYYY-MM-DDTHH:MM:SS", 400)

                    setattr(appointment, key, value)
                    actualizados.append(key)

            if not actualizados:
                raise APIException("No se proporcionaron campos válidos para actualizar", 400)

            db.session.commit()
            return jsonify({
                "mensaje": "Cita actualizada correctamente",
                "campos_actualizados": actualizados,
                "appointment": appointment_schema.dump(appointment)
            }), 200

        except APIException as e:
            db.session.rollback()
            raise e
        except Exception as e:
            db.session.rollback()
            raise APIException(f"Error al actualizar cita: {str(e)}", 500)


    @api.route('/appointments', methods=['GET'])
    def get_appointments():
        try:
            appointments = Appointment.query.all()
            return jsonify(appointments_schema.dump(appointments)), 200
        except Exception as e:
            raise APIException(f"Error al obtener citas: {str(e)}", 500)

    @api.route('/appointments/<int:id_app>', methods=['DELETE'])
    def delete_appointment(id_app):
        try:
            appointment = Appointment.query.get(id_app)
            if not appointment:
                raise APIException("Cita no encontrada", 404)
            db.session.delete(appointment)
            db.session.commit()
            return jsonify({"message": "Cita eliminada correctamente"}), 200
        except Exception as e:
            raise APIException(f"Error al eliminar cita: {str(e)}", 500)
