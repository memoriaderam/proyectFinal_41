from flask import jsonify, url_for

class APIException(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv

def has_no_empty_params(rule):
    defaults = rule.defaults if rule.defaults is not None else ()
    arguments = rule.arguments if rule.arguments is not None else ()
    return len(defaults) >= len(arguments)

def generate_sitemap(app):
    links = ['/admin/']
    for rule in app.url_map.iter_rules():
        # Filter out rules we can't navigate to in a browser
        # and rules that require parameters
        if "GET" in rule.methods and has_no_empty_params(rule):
            url = url_for(rule.endpoint, **(rule.defaults or {}))
            if "/admin/" not in url:
                links.append(url)

    links_html = "".join(["<li><a href='" + y + "'>" + y + "</a></li>" for y in links])
    return """
        <div style="text-align: center;">
        <img style="max-height: 80px" src='https://storage.googleapis.com/breathecode/boilerplates/rigo-baby.jpeg' />
        <h1>Rigo welcomes you to your API!!</h1>
        <p>API HOST: <script>document.write('<input style="padding: 5px; width: 300px" type="text" value="'+window.location.href+'" />');</script></p>
        <p>Start working on your project by following the <a href="https://start.4geeksacademy.com/starters/full-stack" target="_blank">Quick Start</a></p>
        <p>Remember to specify a real endpoint path like: </p>
        <ul style="text-align: left;">"""+links_html+"</ul></div>"

import os
import requests

def send_reset_email(to_email, token):
    """Send the password reset email via Mailgun."""
    api_key = os.getenv('MAILGUN_API_KEY')
    domain = os.getenv('MAILGUN_DOMAIN')

    reset_url = "http://localhost:3000/new_password"  # solo la URL de la vista

    response = requests.post(
        f"https://api.mailgun.net/v3/{domain}/messages",
        auth=("api", api_key),
        data={
            "from": f"YourApp <postmaster@{domain}>",
            "to": to_email,
            "subject": "Password Reset Request",
            "text": f"Click the following link to reset your password: {reset_url}. Your token is: {token}"
        }
    )

    if response.status_code != 200:
        raise Exception(f"Error sending email: {response.text}")

    
def send_password_changed_email(to_email):
    """Send an email to notify the user that their password was changed."""
    api_key = os.getenv('MAILGUN_API_KEY')
    domain = os.getenv('MAILGUN_DOMAIN')

    print("🔍 Enviando correo de confirmación...")
    print("✅ API KEY:", "Sí" if api_key else "Falta")
    print("✅ DOMAIN:", domain)
    print("📤 Para:", to_email)

    if not api_key or not domain:
        print("❌ Faltan variables de entorno de Mailgun")
        return

    try:
        response = requests.post(
            f"https://api.mailgun.net/v3/{domain}/messages",
            auth=("api", api_key),
            data={
                "from": f"YourApp <postmaster@{domain}>",
                "to": to_email,
                "subject": str("Contraseña actualizada"),
                "text": "Tu contraseña ha sido cambiada exitosamente. Si no realizaste este cambio, por favor contáctanos de inmediato."
            }
        )

        print("📬 Respuesta Mailgun:", response.status_code)
        print("📝 Texto:", response.text)

        # Mostrar error explícito si falla
        if response.status_code != 200:
            print("❌ Error al enviar el correo:", response.text)

    except Exception as e:
        print("🔥 Excepción al enviar email:", e)