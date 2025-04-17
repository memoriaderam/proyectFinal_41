import os
import secrets
import requests
from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash
from api.models import db, User, Order
from sqlalchemy.orm import joinedload

def register_dashboard_funtions(api):

    @api.route('/reset', methods=['POST'])
    def reset_password():
        email = request.json.get('email', None)
        if not email:
            return jsonify({"msg": "El correo es requerido para verificar al usuario."}), 400
        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({"msg": "No existe un usuario con el correo proporcionado."}), 404
        reset_token = secrets.token_urlsafe(32)
        user.reset_token = reset_token
        db.session.commit()
        try:
            reset_email(user.email, user.reset_token)
        except Exception as e:
            print(e)
            return jsonify({"msg": f"Error al enviar el correo de cambio de contraseña: {str(e)}"}), 500
        return jsonify({"msg": "El correo de cambio de contraseña ha sido enviado exitosamente."}), 200

    @api.route('/new_password', methods=['PUT'])
    def new_password():
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
            changed_password(user.email)
        except Exception as e:
            print("Error al enviar email de confirmación:", e)
        return jsonify({"msg": "Contraseña actualizada correctamente"}), 200
    
    @api.route("/profile", methods=["GET"])
    def get_profile():
        try:
            user = User.query.first()
            if user:
                return jsonify({
                    "full_name": user.full_name,
                    "email": user.email,
                    "gender": user.gender,
                    "age": user.age,
                    "address": user.address,
                    "phone": user.phone,
                    "speciality": user.speciality,
                    "is_active": user.is_active,
                    "create_at": user.create_at
                }), 200
            else:
                return jsonify({"msg": "Usuario no encontrado"}), 404
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({"msg": "Error interno del servidor"}), 500

    @api.route('/get_orders', methods=['GET'])
    def get_orders():
        dni = request.args.get('dni')
        if not dni:
            return jsonify({"msg": "Se requiere un DNI."}), 400
        try:
            dni = int(dni)
        except ValueError:
            return jsonify({"msg": "DNI inválido."}), 400
        orders = Order.query.filter_by(dni=dni).all()
        print(f"Pedidos encontrados: {len(orders)}")
        orders_data = []
        for order in orders:
            orders_data.append({
                "status": order.status,
                "lens_type": order.lens_type,
                "frame_type": order.frame_type,
                "price": order.price,
                "dated_at": order.dated_at.isoformat()
            })
        return jsonify({"orders": orders_data}), 200
    
def reset_email(email, token):
    api_key = os.getenv('MAILGUN_API_KEY')
    domain = os.getenv('MAILGUN_DOMAIN')
    reset_url = "http://localhost:3000/new_password" 
    subject = "Solicitud de cambio de contraseña"
    html_body = f"""\
    <html>
        <body>
            <p>Hola,</p>
            <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta.</p>
            <p>Si fuiste tú quien la solicitó, hacé clic en el siguiente enlace para crear una nueva contraseña:</p>
            <p><a href="{reset_url}">Restablecer contraseña</a></p>
            <p>y usá el siguiente token: <strong>{token}</strong></p>
            <p>Si no reconocés esta acción, simplemente ignorá este mensaje.</p>
        </body>
    </html>
    """
    response = requests.post(
        f"https://api.mailgun.net/v3/{domain}/messages",
        auth=("api", api_key),
        data={
            "from": f"Solicitud de cambio de contraseña a Mundo Óptico 20/20: <postmaster@{domain}>",
            "to": email,
            "subject": subject,
            "html": html_body
        }
    )
    if response.status_code != 200:
        raise Exception(f"Error al enviar el correo: {response.text}")

def changed_password(email):
    api_key = os.getenv('MAILGUN_API_KEY')
    domain = os.getenv('MAILGUN_DOMAIN')
    try:
        response = requests.post(
            f"https://api.mailgun.net/v3/{domain}/messages",
            auth=("api", api_key),
            data={
                "from": f"Confirmación de cambio de contraseña por Mundo Óptico 20/20: <postmaster@{domain}>",
                "to": email,
                "subject": str("Contraseña actualizada"),
                "text": "Tu contraseña ha sido cambiada exitosamente. Si no realizaste este cambio, por favor contáctanos de inmediato."
            }
        )
        if response.status_code != 200:
            print("Error al enviar el correo:")
    except Exception as e:
        print("Excepción al enviar el correo:", e)