from datetime import datetime
from werkzeug.security import generate_password_hash
from api.models import db, Role, User, Prescription, Order
import random


def clear_existing_data():
    print("🧹 Limpiando datos existentes...")
    Order.query.delete()
    Prescription.query.delete()
    User.query.filter(User.role_id == 3).delete()  # Eliminar pacientes
    db.session.commit()
    print("✅ Datos eliminados.")


def create_default_roles():
    print("⚙️  Creando roles por defecto...")
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
    print("✅ Roles creados o ya existentes.")


def create_default_user():
    print("👤 Verificando usuario admin...")
    admin_email = "ivanroman1498@gmail.com"
    user = User.query.filter_by(email=admin_email).first()
    if not user:
        print("🔧 Creando usuario admin por defecto...")
        default_user = User(
            dni=1155669988,
            full_name="Admin User",
            email=admin_email,
            password_hash=generate_password_hash("admin123"),
            gender="Otro",
            age=30,
            address="Calle Falsa 123",
            phone="123456789",
            speciality="Oftalmología",
            role_id=1
        )
        db.session.add(default_user)
        db.session.commit()
        print("✅ Usuario admin creado.")
    else:
        print("ℹ️ Usuario admin ya existe.")


def create_sample_patients():
    print("👥 Creando pacientes de ejemplo...")
    pacientes = [
        {
            "dni": 2233445566,
            "full_name": "Paciente Uno",
            "email": "paciente1@example.com",
            "gender": "Femenino",
            "age": 28,
            "address": "Calle 111",
            "phone": "111111111",
        },
        {
            "dni": 3344556677,
            "full_name": "Paciente Dos",
            "email": "paciente2@example.com",
            "gender": "Masculino",
            "age": 35,
            "address": "Calle 222",
            "phone": "222222222",
        },
    ]

    for p in pacientes:
        if User.query.filter_by(dni=p["dni"]).first() is None:
            patient = User(
                dni=p["dni"],
                full_name=p["full_name"],
                email=p["email"],
                password_hash=generate_password_hash("test123"),
                gender=p["gender"],
                age=p["age"],
                address=p["address"],
                phone=p["phone"],
                role_id=3
            )
            db.session.add(patient)

    db.session.commit()
    print("✅ Pacientes creados.")
    create_sample_prescriptions_and_orders()


def create_sample_prescriptions_and_orders():
    print("📝 Creando prescripciones y órdenes...")

    patients = User.query.filter_by(role_id=3).all()
    if not patients:
        print("⚠️ No hay pacientes para asociar prescripciones.")
        return

    if Prescription.query.first() or Order.query.first():
        print("ℹ️ Prescripciones u órdenes ya existen. Se omite creación.")
        return

    statuses = ["pedido", "en proceso", "listo para retirar", "entregado"]
    lenses = ["Monofocal", "Bifocal", "Progresiva"]
    frames = ["Metálica", "Plástica", "Al aire"]

    for patient in patients:
        prescription = Prescription(
            dni=patient.dni,
            left_eye_sph=round(random.uniform(-2.0, -0.5), 2),
            right_eye_sph=round(random.uniform(-2.0, -0.5), 2),
            left_eye_cyl=round(random.uniform(-1.0, 0), 2),
            right_eye_cyl=round(random.uniform(-1.0, 0), 2),
            left_eye_axis=random.randint(0, 180),
            right_eye_axis=random.randint(0, 180),
            notes="Generada automáticamente para pruebas",
            dated_at=datetime.utcnow()
        )
        db.session.add(prescription)
        db.session.flush()  # Para obtener prescription.id antes de commit

        order = Order(
            dni=patient.dni,
            prescription_id=prescription.id,
            lens_type=random.choice(lenses),
            frame_type=random.choice(frames),
            price=round(random.uniform(100, 300), 2),
            status=random.choice(statuses),
            dated_at=datetime.utcnow()
        )
        db.session.add(order)

    db.session.commit()
    print("✅ Prescripciones y órdenes creadas.")


def seed_database():
    print("🌱 Iniciando proceso de siembra de base de datos...")
    clear_existing_data()
    create_default_roles()
    create_default_user()
    create_sample_patients()
    print("🎉 Base de datos sembrada exitosamente.")