# api/config.py
import os

# Calcula la ruta absoluta a /instance/app.db desde cualquier ubicación
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))
INSTANCE_DIR = os.path.join(BASE_DIR, "instance")
DB_PATH = os.path.join(INSTANCE_DIR, "app.db")

# Crea la carpeta si no existe
os.makedirs(INSTANCE_DIR, exist_ok=True)

class Config:
    SQLALCHEMY_DATABASE_URI = f"sqlite:///{DB_PATH}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False