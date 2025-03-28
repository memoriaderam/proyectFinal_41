
from flask import request, jsonify
from api.models import db, User
from api.schemas import UserSchema, UserCreateSchema
from api.utils import APIException

user_schema = UserSchema()
user_create_schema = UserCreateSchema()

def register_patient_routes(api):

    # Crear un nuevo paciente
    @api.route('/patients', methods=['POST'])
    def create_patient():
        try:
            # Esto ya devuelve una instancia de User porque load_instance=True
            new_user = user_create_schema.load(request.json, session=db.session)

            # Validar si ya existe el identity_number o email
            if User.query.get(new_user.identity_number) or User.query.filter_by(email=new_user.email).first():
                raise APIException("El paciente ya existe", status_code=409)

            new_user.set_password(request.json.get("password"))
            db.session.add(new_user)
            db.session.commit()
            return jsonify(user_schema.dump(new_user)), 201
        except APIException as e:
            raise e
        except Exception as e:
            raise APIException(f"Error al crear paciente: {str(e)}", status_code=500)

    # Editar un paciente
    @api.route('/patients/<int:identity_number>', methods=['PUT'])
    def update_patient(identity_number):
        try:
            patient = User.query.get(identity_number)
            if not patient:
                raise APIException("Paciente no encontrado", status_code=404)

            updates = request.json
            for field, value in updates.items():
                if hasattr(patient, field):
                    setattr(patient, field, value)

            db.session.commit()
            return jsonify({"message": "Paciente actualizado correctamente"}), 200
        except APIException as e:
            raise e
        except Exception as e:
            raise APIException(f"Error al actualizar paciente: {str(e)}", status_code=500)
