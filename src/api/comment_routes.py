from flask import request, jsonify
from api.models import db, Comment
from api.schemas import CommentSchema
from api.utils import APIException

comment_schema = CommentSchema()
comments_schema = CommentSchema(many=True)

def register_comment_routes(api):

    @api.route('/comments', methods=['POST'])
    def create_comment():
        try:
            data = request.json
            comment = comment_schema.load(data, session=db.session)
            db.session.add(comment)
            db.session.commit()
            return jsonify(comment_schema.dump(comment)), 201
        except Exception as e:
            raise APIException(f"Error al crear comentario: {str(e)}", 500)

    @api.route('/comments', methods=['GET'])
    def get_all_comments():
        comments = Comment.query.all()
        return jsonify(comments_schema.dump(comments)), 200
