import os
from flask import request, jsonify
from api.models import db, Post
from api.schemas import PostSchema
from sqlalchemy.exc import SQLAlchemyError
from flask import send_from_directory

post_schema = PostSchema()
post_list_schema = PostSchema(many=True)


def register_post_routes(api):

    @api.route("/posts", methods=["GET"])
    def get_posts():
        try:
            posts = Post.query.all()
            return jsonify(post_list_schema.dump(posts)), 200
        except SQLAlchemyError as e:
            return jsonify({"error": str(e)}), 500

    @api.route("/posts/<int:post_id>", methods=["GET"])
    def get_post(post_id):
        post = Post.query.get(post_id)
        if not post:
            return jsonify({"error": "Post no encontrado"}), 404
        return jsonify(post_schema.dump(post)), 200

    @api.route("/posts", methods=["POST"])
    def create_post():
        try:
            if 'image' not in request.files:
                return jsonify({"error": "No se envió imagen"}), 400

            image = request.files["image"]
            if image.filename == "":
                return jsonify({"error": "Nombre de imagen vacío"}), 400

            uploads_folder = os.path.join(os.getcwd(), 'uploads')
            os.makedirs(uploads_folder, exist_ok=True)

            image_path = os.path.join("uploads", image.filename)
            image.save(os.path.join(uploads_folder, image.filename))

            form_data = {
                "offers": request.form.get("offers"),
                "article": request.form.get("article"),
                "doctor_id": request.form.get("doctor_id"),
            }

            post = post_schema.load(form_data, session=db.session)
            post.image_url = image_path

            db.session.add(post)
            db.session.commit()

            return jsonify({
                "message": "Post creado exitosamente",
                "post": post_schema.dump(post)
            }), 201

        except SQLAlchemyError as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 500

    @api.route("/posts/<int:post_id>", methods=["PUT"])
    def update_post(post_id):
        post = Post.query.get(post_id)
        if not post:
            return jsonify({"error": "Post no encontrado"}), 404

        try:
            post.offers = request.form.get("offers", post.offers)
            post.article = request.form.get("article", post.article)
            post.doctor_id = request.form.get("doctor_id", post.doctor_id)

            if "image" in request.files:
                image = request.files["image"]
                if image.filename != "":
                    uploads_folder = os.path.join(os.getcwd(), 'uploads')
                    os.makedirs(uploads_folder, exist_ok=True)

                    image_path = os.path.join("uploads", image.filename)
                    image.save(os.path.join(uploads_folder, image.filename))
                    post.image_url = image_path

            db.session.commit()
            return jsonify({
                "message": "Post actualizado exitosamente",
                "post": post_schema.dump(post)
            }), 200

        except SQLAlchemyError as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 500

    @api.route("/posts/<int:post_id>", methods=["DELETE"])
    def delete_post(post_id):
        post = Post.query.get(post_id)
        if not post:
            return jsonify({"error": "Post no encontrado"}), 404
        try:
            db.session.delete(post)
            db.session.commit()
            return jsonify({"message": "Post eliminado"}), 200
        except SQLAlchemyError as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 500

