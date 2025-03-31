"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from api.models import Post

# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)


# ////Como administrador, quiero agregar nuevos productos al catálogo para mantener la oferta actualizada


@app.router('/agregar/catalogos',methods=['POST'])
def productos_catalogos():
    post = Post
    post.post_id = request.json.get('post_id')
    post.offers = request.json.get('offers')
    post.article = request.json.get('article')
    post.doctor_id = request.json.get('doctor_id')



#////Como administrador, quiero poder editar los productos existentes en el catálogo para actualizar su información
@app.route('/post/<int:post_id>', methods=['PUT'])
def update_post(post_id):
    post = Post.query.get(post_id)
    
    if not post:
        return jsonify({"error": "Post no encontrado"}), 404

    data = request.get_json()

    # Actualiza solo si existe el campo
    post.offers = data.get('offers', post.offers)
    post.article = data.get('article', post.article)
    post.doctor_id = data.get('doctor_id', post.doctor_id)

    db.session.commit()

    return jsonify({
        "message": "Post actualizado",
        "post": {
            "post_id": post.post_id,
            "offers": post.offers,
            "article": post.article,
            "doctor_id": post.doctor_id
        }
    }), 200


#////Como administrador, quiero eliminar productos del catálogo para remover los que ya no estén disponibles
@app.route('/post_delete/<int:evo_id>', methods=[ "DELETE"])
def delete_post(evo_id):
    if request.method == 'DELETE':
        post = Post.query.get(evo_id)
        if post is None:
            return jsonify({
                'mensaje': 'Post no encontrado'
            }), 404
        else:
            db.session.delete(post)
            db.session.commit()

            return jsonify({
                "mensaje":"Post eliminado"
            }), 200