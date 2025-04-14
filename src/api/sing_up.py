
from flask import request,jsonify
from api.models import User,db
from api.routes import api  # este es tu Blueprint


@api.route('/add/user',methods=['POST'])
def create_user():
    try:
        if not request.is_json:
            return jsonify({"error": "El contenido debe ser application/json"}), 400
        print(">>> Llegó al endpoint /add/post")
        data = request.get_json()
        user = User()
        
        user.dni = request.json.get('dni')
        user.full_name = request.json.get('full_name')
        user.email = request.json.get('email')
        user.gender = request.json.get('gender')
        user.age = request.json.get('age')
        user.address = request.json.get('address')
        user.phone = request.json.get('phone')
        user.speciality = request.json.get('speciality')
        user.role_id = request.json.get('role_id')

        password = data.get('password')

        user.set_password(password)
        
        db.session.add(user)
        db.session.commit()
        return jsonify({'message':'User creado correctamente'})
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















