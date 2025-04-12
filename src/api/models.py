from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timezone

db = SQLAlchemy()


# Tabla de roles de usuario
class Role(db.Model):
    __tablename__ = "role"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    is_active = db.Column(db.Boolean, nullable=False, default=True)
    users = db.relationship("User", backref="role", lazy=True)


# Tabla de usuarios
class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    dni = db.Column(db.Integer, unique=True, nullable=False)
    full_name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    gender = db.Column(db.String(80), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    address = db.Column(db.String(200), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    speciality = db.Column(db.String(100), nullable=True)
    is_active = db.Column(db.Boolean, nullable=False, default=True)
    role_id = db.Column(
        db.Integer, db.ForeignKey("role.id", name="fk_user_role"), nullable=False
    )
    create_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    appointments = db.relationship(
        "Appointment",
        backref="patient",
        foreign_keys="Appointment.identity_number",
        lazy=True,
    )
    prescriptions = db.relationship("Prescription", backref="patient", lazy=True)
    orders = db.relationship("Order", backref="patient", lazy=True)
    posts = db.relationship(
        "Post", backref="doctor", foreign_keys="Post.doctor_id", lazy=True
    )

    def __repr__(self):
        return f"<User {self.dni}>"

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


# Tabla de citas médicas
class Appointment(db.Model):
    __tablename__ = "appointment"
    id = db.Column(db.Integer, primary_key=True)
    identity_number = db.Column(
        db.Integer,
        db.ForeignKey("user.dni", name="fk_appointment_patient"),
        nullable=False,
    )
    doctor_id = db.Column(
        db.Integer,
        db.ForeignKey("user.dni", name="fk_appointment_doctor"),
        nullable=False,
    )
    create_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    update_at = db.Column(
        db.DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    def __repr__(self):
        return f"<Appointment {self.id_app}>"


# Publicaciones u ofertas hechas por doctores
class Post(db.Model):
    __tablename__ = "post"
    id = db.Column(db.Integer, primary_key=True)
    offers = db.Column(db.String(120), nullable=False)
    article = db.Column(db.String(120), nullable=False)
    doctor_id = db.Column(
        db.Integer, db.ForeignKey("user.id", name="fk_post_doctor"), nullable=False
    )

    def __repr__(self):
        return f"<Post {self.post_id}>"

    def serialize(self):
        return {
            "id": self.id,
            "offers": self.offers,
            "article": self.article,
            "doctor_id": self.doctor_id,
        }


# Recetas ópticas emitidas a pacientes
class Prescription(db.Model):
    __tablename__ = "prescription"
    id = db.Column(db.Integer, primary_key=True)
    dni = db.Column(
        db.Integer,
        db.ForeignKey("user.dni", name="fk_prescription_patient"),
        nullable=False,
    )
    left_eye_sph = db.Column(db.Float, nullable=False)
    right_eye_sph = db.Column(db.Float, nullable=False)
    left_eye_cyl = db.Column(db.Float, nullable=False)
    right_eye_cyl = db.Column(db.Float, nullable=False)
    left_eye_axis = db.Column(db.Integer, nullable=False)
    right_eye_axis = db.Column(db.Integer, nullable=False)
    notes = db.Column(db.String(255), nullable=True)
    dated_at = db.Column(db.DateTime, nullable=False)
    orders = db.relationship("Order", backref="prescription", lazy=True)

    def __repr__(self):
        return f"<Prescription {self.prescrip_id}>"


# Pedidos de lentes ópticos
class Order(db.Model):
    __tablename__ = "order"
    order_id = db.Column(db.Integer, primary_key=True)
    identity_number = db.Column(
        db.Integer, db.ForeignKey("user.dni", name="fk_order_patient"), nullable=False
    )
    prescription_id = db.Column(
        db.Integer,
        db.ForeignKey("prescription.id", name="fk_order_prescription"),
        nullable=False,
    )
    status = db.Column(db.String(20), nullable=False)
    lens_type = db.Column(db.String(50), nullable=False)
    frame_type = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Float, nullable=False)
    dated_at = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return f"<Order {self.order_id}>"


################# modelos extras ######################
class Notification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(255), nullable=False)
    is_read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def __repr__(self):
        return f"<Notification {self.id}: {'leída' if self.is_read else 'nueva'}>"


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey("user.dni", name="fk_comment_user"), nullable=False
    )
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def __repr__(self):
        return f"<Comment {self.id} by User {self.user_id}>"


class FileAttachment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(255), nullable=False)
    url = db.Column(db.String(500), nullable=False)
    uploaded_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    user_id = db.Column(
        db.Integer, db.ForeignKey("user.dni", name="fk_file_user"), nullable=False
    )

    def __repr__(self):
        return f"<File {self.filename} for User {self.user_id}>"
