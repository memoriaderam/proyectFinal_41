import os
import secrets
from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash
from api.utils import send_reset_email, send_password_changed_email
from api.models import db, User


def register_reset_routes(api):

    @api.route('/reset', methods=['POST'])
    def reset_password():
        email = request.json.get('email', None)
        if not email:
            return jsonify({"msg": "Email is required"}), 400

        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({"msg": "User with this email does not exist."}), 404

        reset_token = secrets.token_urlsafe(32)
        user.reset_token = reset_token
        db.session.commit()

        reset_url = f"{os.getenv('FRONTEND_URL')}/new_password?token={reset_token}"
        try:
            send_reset_email(user.email, reset_url)
        except Exception as e:
            print(e)
            return jsonify({"msg": f"Error sending reset email: {str(e)}"}), 500

        return jsonify({"msg": "Password reset email sent."}), 200

    @api.route('/new_password', methods=['PUT'])
    def set_new_password():
        token = request.json.get("token")
        new_password = request.json.get("password")

        if not token or not new_password:
            return jsonify({"msg": "Token y nueva contraseña son requeridos"}), 400

        user = User.query.filter_by(reset_token=token).first()
        if not user:
            return jsonify({"msg": "Token inválido o expirado"}), 422

        user.password_hash = generate_password_hash(new_password)
        user.reset_token = None
        db.session.commit()

        try:
            send_password_changed_email(user.email)
        except Exception as e:
            print("Error al enviar email de confirmación:", e)

        return jsonify({"msg": "Contraseña actualizada correctamente"}), 200