from flask import request, jsonify
from api.models import Role, db, User
from api.schemas import UserSchema, UserCreateSchema
from api.utils import APIException

user_schema = UserSchema()
users_schema = UserSchema(many=True)
user_create_schema = UserCreateSchema()


def register_patient_routes(api):

    @api.route("/patients", methods=["POST"])
    def create_patient():
        try:
            data = request.get_json()

            # Validación de role
            expected_role_id = 3  # paciente
            if data.get("role_id") != expected_role_id:
                raise APIException("El role_id debe ser 3 para pacientes", 400)

            # Verifica que exista el rol
            role = Role.query.get(data["role_id"])
            if not role:
                raise APIException("El rol especificado no existe", 400)

            user_data = user_create_schema.load(data, session=db.session)

            if (
                User.query.get(user_data.identity_number)
                or User.query.filter_by(email=user_data.email).first()
            ):
                raise APIException("El paciente ya existe", 409)

            new_user = user_data
            new_user.set_password(data["password"])

            db.session.add(new_user)
            db.session.commit()
            return jsonify(user_schema.dump(new_user)), 201
        except APIException as e:
            raise e
        except Exception as e:
            raise APIException(f"Error al crear paciente: {str(e)}", 500)

    @api.route("/patients/<int:identity_number>", methods=["PUT"])
    def update_patient(identity_number):
        try:
            patient = User.query.get(identity_number)
            if not patient:
                raise APIException("Paciente no encontrado", status_code=404)

            updates = request.get_json()

            # Campos válidos del modelo que puedes actualizar
            allowed_fields = [
                "full_name",
                "email",
                "gender",
                "age",
                "address",
                "phone",
                "speciality",
                "is_active",
                "role_id",
            ]

            for field, value in updates.items():
                if field in allowed_fields:
                    setattr(patient, field, value)
                elif field == "password":
                    patient.set_password(value)  # si se desea actualizar la contraseña

            db.session.commit()
            return jsonify({"message": "Paciente actualizado correctamente"}), 200
        except Exception as e:
            raise APIException(f"Error al actualizar paciente: {str(e)}", 500)

    @api.route("/patients/<int:identity_number>", methods=["DELETE"])
    def delete_patient(identity_number):
        patient = User.query.get(identity_number)
        if not patient:
            raise APIException("Paciente no encontrado", status_code=404)
        db.session.delete(patient)
        db.session.commit()
        return jsonify({"message": "Paciente eliminado correctamente"}), 200

    @api.route("/patients", methods=["GET"])
    def get_all_patients():
        patients = User.query.filter_by(role_id=3).all()
        return jsonify(users_schema.dump(patients)), 200

    @api.route("/patients/<int:identity_number>", methods=["GET"])
    def get_single_patient(identity_number):
        patient = User.query.get(identity_number)
        if not patient:
            raise APIException("Paciente no encontrado", status_code=404)
        return jsonify(user_schema.dump(patient)), 200
