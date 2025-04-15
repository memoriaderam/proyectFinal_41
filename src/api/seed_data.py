from api.models import db, Role, User
from werkzeug.security import generate_password_hash
def create_default_roles():
    roles = [
        {"id": 1, "name": "admin"},
        {"id": 2, "name": "doctor"},
        {"id": 3, "name": "patient"},
    ]
    for role in roles:
        exists = Role.query.get(role["id"])
        if not exists:
            new_role = Role(id=role["id"], name=role["name"], is_active=True)
            db.session.add(new_role)
    db.session.commit()
def create_default_user():
    admin_email = "ivanroman1498@gmail.com"
    user = User.query.filter_by(email=admin_email).first()
    if not user:
        print(":wrench: Creando usuario admin por defecto...")
        default_user = User(
            dni=1155669988,
            full_name="Admin User",
            email=admin_email,
            password_hash=generate_password_hash("admin123"),
            gender="Otro",
            age=30,
            address="Calle Falsa 123",
            phone="123456789",  # :white_check_mark: campo requerido
            speciality="Oftalmología",  # puedes dejarlo como string vacío si es nullable
            role_id=1  # Rol admin
        )
        db.session.add(default_user)
        db.session.commit()
        print(":white_check_mark: Usuario admin creado.")
    else:
        print(":information_source: Usuario admin ya existe.")