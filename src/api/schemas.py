from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from marshmallow import fields
from api.models import (
    User,
    Role,
    Appointment,
    Post,
    Prescription,
    Order,
    Notification,
    Comment,
    FileAttachment,
)


# Representa los roles del sistema (ej: admin, doctor, paciente)
class RoleSchema(SQLAlchemySchema):
    class Meta:
        model = Role
        load_instance = True

    id = auto_field()
    name = auto_field()
    is_active = auto_field()


# Representa a los usuarios del sistema (doctores, pacientes, admins)
class UserSchema(SQLAlchemySchema):
    class Meta:
        model = User
        load_instance = True

    id = auto_field()
    dni = auto_field()
    full_name = auto_field()
    email = auto_field()
    gender = auto_field()
    age = auto_field()
    address = auto_field()
    phone = auto_field()
    speciality = auto_field()
    is_active = auto_field()
    role_id = auto_field()
    create_at = auto_field()


# Para registro de usuario con password (solo carga, no se serializa)
class UserCreateSchema(UserSchema):
    password = fields.String(load_only=True, required=True)


# Representa una cita médica entre un paciente y un doctor
class AppointmentSchema(SQLAlchemySchema):
    class Meta:
        model = Appointment
        load_instance = True

    id = auto_field()
    dni = auto_field()
    doctor_id = auto_field()
    create_at = auto_field()
    update_at = auto_field()


# Publicaciones u ofertas hechas por doctores
class PostSchema(SQLAlchemySchema):
    class Meta:
        model = Post
        load_instance = True

    id = auto_field()
    offers = auto_field()
    article = auto_field()
    doctor_id = auto_field()


# Receta óptica emitida a un paciente
class PrescriptionSchema(SQLAlchemySchema):
    class Meta:
        model = Prescription
        load_instance = True

    id = auto_field()
    dni = auto_field()
    left_eye_sph = auto_field()
    right_eye_sph = auto_field()
    left_eye_cyl = auto_field()
    right_eye_cyl = auto_field()
    left_eye_axis = auto_field()
    right_eye_axis = auto_field()
    notes = auto_field()
    dated_at = auto_field()


# Pedido de lentes asociado a una receta
class OrderSchema(SQLAlchemySchema):
    class Meta:
        model = Order
        load_instance = True

    id = auto_field()
    dni = auto_field()
    prescription_id = auto_field()
    status = auto_field()
    lens_type = auto_field()
    frame_type = auto_field()
    price = auto_field()
    dated_at = auto_field()


# Notificación de eventos en la plataforma
class NotificationSchema(SQLAlchemySchema):
    class Meta:
        model = Notification
        load_instance = True

    id = auto_field()
    message = auto_field()
    is_read = auto_field()
    created_at = auto_field()


# Comentario agregado por un usuario
class CommentSchema(SQLAlchemySchema):
    class Meta:
        model = Comment
        load_instance = True

    id = auto_field()
    user_id = auto_field()
    content = auto_field()
    created_at = auto_field()


# Archivo adjunto asociado a un usuario
class FileAttachmentSchema(SQLAlchemySchema):
    class Meta:
        model = FileAttachment
        load_instance = True

    id = auto_field()
    filename = auto_field()
    url = auto_field()
    uploaded_at = auto_field()
    user_id = auto_field()
