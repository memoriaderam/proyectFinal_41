from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

#//////////////////// tabla de usuario

class User(db.Model):
   
    identity_number = db.Column(db.Integer, unique=True, nullable=False,primary_key=True)
    full_name = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    gender = db.Column(db.String(80), unique=False, nullable=False)
    age = db.Column(db.Integer, unique=False, nullable=False)
    address = db.Column(db.String(200), unique=False, nullable=False)
    phone = db.Column(db.Integer, unique=False, nullable=False)
    speciality = db.Column(db.String(100), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    role_id = db.Column(db.Integer, unique=True, nullable=False)
    create_at = db.Column(db.String(10), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.identity_number,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
#//////////////////// tabla de Appointment
    
    class Appointment(db.Model):
   
     id_app = db.Column(db.Integer, unique=True, nullable=False, primary_key=True)
     identity_number = db.Column(db.Integer, unique=True, nullable=False,primary_key=True)
     doctor_id = db.Column(db.Integer, unique=True, nullable=False)
     dated_at = db.Column(db.String(100), unique=False, nullable=False)

    def __repr__(self):
        return f'<Appointment {self.id_app}>'

    def serialize_app(self):
        return {
            "id_app": self.id_app,    
            # do not serialize the password, its a security breach
        }
    
#//////////////////// tabla de Role

    class Role(db.Model):

     role_id = db.Column(db.Integer, unique=True, nullable=False, primary_key=True)
     name = db.Column(db.String(120), unique=False, nullable=False)
     is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<Role {self.id_app}>'

    def serialize_app(self):
        return {
            "role_id": self.id_id,    
            # do not serialize the password, its a security breach
        }
    


#//////////////////// tabla de Post

    class Post(db.Model):

     post_id = db.Column(db.Integer, unique=True, nullable=False, primary_key=True)
     offers = db.Column(db.String(120), unique=False, nullable=False)
     article = db.Column(db.String(120), unique=False, nullable=False)
     doctor_id =  db.Column(db.Integer, unique=True, nullable=False)


    def __repr__(self):
        return f'<Role {self.post_id}>'

    def serialize_app(self):
        return {
            "role_id": self.post_id,    
            # do not serialize the password, its a security breach
        }
    
#//////////////////// tabla de Prescription 

    class Prescription (db.Model):

     prescrip_id = db.Column(db.Integer, unique=True, nullable=False, primary_key=True)
     identity_number = db.Column(db.Integer, unique=True, nullable=False)
     left_eye_sph = db.Column(db.Integer, unique=True, nullable=False)
     right_eye_sph = db.Column(db.Integer, unique=True, nullable=False)
     left_eye_cyl = db.Column(db.Integer, unique=True, nullable=False)
     right_eye_cyl = db.Column(db.Integer, unique=True, nullable=False)
     left_eye_axis = db.Column(db.Integer, unique=True, nullable=False)
     right_eye_axis = db.Column(db.Integer, unique=True, nullable=False)
     notes = db.Column(db.String(120), unique=False, nullable=False)
     dated_at = db.Column(db.String(100), unique=False, nullable=False)


    def __repr__(self):
        return f'<Role {self.prescrip_id}>'

    def serialize_app(self):
        return {
            "role_id": self.prescrip_id,    
            # do not serialize the password, its a security breach
        }
    

#//////////////////// tabla de Order

    class Order (db.Model):

     order_id = db.Column(db.Integer, unique=True, nullable=False, primary_key=True)
     identity_number = db.Column(db.Integer, unique=True, nullable=False)
     prescrip_id = db.Column(db.Integer, unique=True, nullable=False)
     status = db.Column(db.String(10), unique=False, nullable=False)
     lens_type = db.Column(db.String(10), unique=False, nullable=False)
     frame_type = db.Column(db.String(10), unique=False, nullable=False)
     price = db.Column(db.Integer, unique=True, nullable=False)
     dated_at = db.Column(db.String(100), unique=False, nullable=False)


    def __repr__(self):
        return f'<Role {self.porder_id}>'

    def serialize_app(self):
        return {
            "role_id": self.order_id,    
            # do not serialize the password, its a security breach
        }
