import os
from flask import send_from_directory

def register_serve_uploads_routes(api):
    @api.route("/uploads/<path:filename>")
    def serve_uploaded_file(filename):
        uploads_folder = os.path.join(os.getcwd(), "uploads")
        return send_from_directory(uploads_folder, filename)
