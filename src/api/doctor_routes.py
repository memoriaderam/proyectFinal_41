from flask import request, jsonify
from api.models import db, User
from api.schemas import UserSchema, UserCreateSchema
from api.utils import APIException

user_schema = UserSchema()
user_create_schema = UserCreateSchema()

def register_doctor_routes(api):
    # Crear un nuevo doctor
    @api.route('/doctors', methods=['POST'])
    def create_doctor():
        try:
            data = request.json
            doctor_data = user_create_schema.load(data, session=db.session)  # doctor_data es un objeto User

            # Verifica duplicidad con notación de atributos
            if User.query.get(doctor_data.identity_number):
                raise APIException("El doctor ya existe", status_code=409)

            new_doctor = doctor_data
            new_doctor.set_password(data["password"])  # usa el password original del payload

            db.session.add(new_doctor)
            db.session.commit()
            return jsonify(user_schema.dump(new_doctor)), 201
        except APIException as e:
            raise e
        except Exception as e:
            raise APIException(f"Error al registrar doctor: {str(e)}", status_code=500)

    # Obtener lista de doctores
    @api.route('/doctors', methods=['GET'])
    def get_doctors():
        try:
            doctors = User.query.filter_by(speciality="doctor").all()
            return jsonify(user_schema.dump(doctors, many=True)), 200
        except Exception as e:
            raise APIException(f"Error al obtener doctores: {str(e)}", status_code=500)

    # Editar información de un doctor
    @api.route('/doctors/<int:identity_number>', methods=['PUT'])
    def update_doctor(identity_number):
        try:
            doctor = User.query.get(identity_number)
            if not doctor:
                raise APIException("Doctor no encontrado", status_code=404)
    
            data = request.get_json()
    
            # Campos válidos que puedes actualizar
            allowed_fields = [
                "full_name", "email", "gender", "age",
                "address", "phone", "speciality", "is_active", "role_id"
            ]
    
            for field, value in data.items():
                if field in allowed_fields:
                    setattr(doctor, field, value)
                elif field == "password":
                    doctor.set_password(value)  # si viene campo 'password'
    
            db.session.commit()
            return jsonify({"message": "Doctor actualizado correctamente"}), 200
        except APIException as e:
            raise e
        except Exception as e:
            raise APIException(f"Error al actualizar doctor: {str(e)}", status_code=500)

    # Eliminar un doctor
    @api.route('/doctors/<int:identity_number>', methods=['DELETE'])
    def delete_doctor(identity_number):
        try:
            doctor = User.query.get(identity_number)
            if not doctor:
                raise APIException("Doctor no encontrado", status_code=404)

            db.session.delete(doctor)
            db.session.commit()
            return jsonify({"message": "Doctor eliminado correctamente"}), 200
        except APIException as e:
            raise e
        except Exception as e:
            raise APIException(f"Error al eliminar doctor: {str(e)}", status_code=500)
