"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.seed_data import create_default_roles
from flask_jwt_extended import JWTManager
from flask import Blueprint
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from api.models import Post
from flask import send_from_directory

# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(
    os.path.dirname(os.path.realpath(__file__)), "../public/"
)
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
jwt = JWTManager(app)

app.config["JWT_SECRET_KEY"] = "secret-key85"
app.url_map.strict_slashes = False
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

app.config.from_object(Config)
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# Seed roles
with app.app_context():
    create_default_roles()

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix="/api")


# Ruta para servir las imágenes desde /uploads/<nombre_archivo>
@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(os.path.join(os.getcwd(), "uploads"), filename)


# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code


# generate sitemap with all your endpoints


@app.route("/")
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, "index.html")


# any other endpoint will try to serve it like a static file
@app.route("/<path:path>", methods=["GET"])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = "index.html"
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


# this only runs if `$ python src/main.py` is executed
if __name__ == "__main__":
    PORT = int(os.environ.get("PORT", 3001))
    app.run(host="0.0.0.0", port=PORT, debug=True)
