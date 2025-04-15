from flask import request, jsonify
from api.models import User, db
from api.routes import api_v1  # IMPORT CORRECTO

@api_v1.route('/add/user', methods=['POST'])
def create_user():
    try:
        if not request.is_json:
            return jsonify({"error": "El contenido debe ser application/json"}), 400
        data = request.get_json()

        user = User(
            dni=data.get('dni'),
            full_name=data.get('full_name'),
            email=data.get('email'),
            gender=data.get('gender'),
            age=data.get('age'),
            address=data.get('address'),
            phone=data.get('phone'),
            speciality=data.get('speciality'),
            role_id=data.get('role_id')
        )

        user.set_password(data.get('password'))

        db.session.add(user)
        db.session.commit()

        return jsonify({'message': 'User creado correctamente'}), 201

    except Exception as e:
        return jsonify({'error': 'Error server', 'details': str(e)}), 500




# Probar usuarios
# {
#   "dni": 1105234567,
#   "full_name": "Dra. Sofía Pérez",
#   "email": "sofia@example.com",
#   "password": "123456",
#   "gender": "female",
#   "age": 32,
#   "address": "Av. Quito 123",
#   "phone": "0999999999",
#   "speciality": "Optometría",
#   "role_id": 1
# }















