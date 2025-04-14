from flask import request,jsonify
from api.models import User,db
from api.routes import api  # este es tu Blueprint
from flask_jwt_extended import create_access_token, jwt_required


@api.route('/login', methods=['POST'])
def login():
    try:
        email = request.json.get('email')
        user = User.query.filter_by(email = email).first()
        if user is None:
            return jsonify({
                'message':'Incorrect email or password '
            }),401
        password = request.json.get('password')
        if not user.check_password(password):
            return jsonify({
                'message':'Incorrect email or password'
            }),404
        acces_token = create_access_token(identity= email)
        return jsonify({
            'access_token': acces_token
        })
    except Exception as e:
        return jsonify({'error': 'Error server', 'details': str(e)}), 500




