from flask import request,jsonify
from api.models import Post,db
from api.routes import api  # este es tu Blueprint

# ////Como administrador, quiero agregar nuevos productos al catálogo para mantener la oferta actualizada


@api.route('/add/post',methods=['POST'])
def productos_catalogos():
    if not request.is_json:
        return jsonify({"error": "El contenido debe ser application/json"}), 400
    print(">>> Llegó al endpoint /add/post")
    post = Post()
    
    post.offers = request.json.get('offers')
    post.article = request.json.get('article')
    post.doctor_id = request.json.get('doctor_id')
    db.session.add(post)
    db.session.commit()
    return jsonify({'message':'Post creado correctamente'})


#////Como administrador, quiero poder editar los productos existentes en el catálogo para actualizar su información
@api.route('/edit/post/<int:post_id>', methods=['PUT'])
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
            "post_id": post.id,
            "offers": post.offers,
            "article": post.article,
            "doctor_id": post.doctor_id
        }
    }), 200


#////Como administrador, quiero eliminar productos del catálogo para remover los que ya no estén disponibles
@api.route('/delete/post/<int:evo_id>', methods=[ "DELETE"])
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








