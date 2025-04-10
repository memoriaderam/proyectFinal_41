import os
from flask import request,jsonify
from api.models import Post,db
from api.routes import api  # este es tu Blueprint




@api.route('/post/list',methods=['GET'])
def get_post():
    try:
        posts = Post.query.all()
        posts = list(map(lambda post: post.serialize(), posts))    
        return jsonify(posts),200
    except Exception as e:
        return jsonify({'error':str(e)}),500


@api.route('/add/post',methods=['POST'])
def create_post():
    try:   
        
        if 'image' not in request.files:
            return jsonify({"error": "No se envió imagen"}), 400
        image = request.files['image']

        if image.filename == '':
            return jsonify({"error": "Nombre de imagen vacío"}), 400

        # Guardamos la imagen en una carpeta local
        uploads_folder = os.path.join(os.getcwd(), 'uploads')         # Carpeta absoluta
        os.makedirs(uploads_folder, exist_ok=True)                   # Crea la carpeta si no existe

        image_path = os.path.join('uploads', image.filename)         # Ruta relativa para guardar en la DB
        full_path = os.path.join(uploads_folder, image.filename)     # Ruta completa del archivo
        image.save(full_path)   

        post = Post()
        
        post.offers = request.form.get('offers')
        post.article = request.form.get('article')
        post.doctor_id = request.form.get('doctor_id')
        post.image_url = image_path 

        db.session.add(post)
        db.session.commit()
        return jsonify({'message':'Post successful'}),201
    except Exception as e:
        print("Error ",e)
        return jsonify({'error': 'Error interno del servidor', 'details': str(e)}), 500



@api.route('/edit/post/<int:post_id>', methods=['PUT'])
def update_post(post_id):

    try:
        post = Post.query.get(post_id)
        
        if not post:
            return jsonify({"error": "Post no foud"}), 404

        data = request.get_json()

        # Actualiza solo si existe el campo
        post.offers = data.get('offers', post.offers)
        post.article = data.get('article', post.article)
        post.doctor_id = data.get('doctor_id', post.doctor_id)

        db.session.commit()

        return jsonify({
            "message": "Post actualizado",
            "post": {
                "post_id": post.id,
                "offers": post.offers,
                "article": post.article,
                "doctor_id": post.doctor_id
            }
        }), 200
    except Exception as e:
        return({'error': 'error server', 'details':str(e)}),500



@api.route('/delete/post/<int:evo_id>', methods=[ "DELETE"])
def delete_post(evo_id):
    if request.method == 'DELETE':
        post = Post.query.get(evo_id)
        if post is None:
            return jsonify({
                'message': 'Post no found'
            }), 404
        else:
            db.session.delete(post)
            db.session.commit()

            return jsonify({
                "message":"Post deleted"
            }), 200








