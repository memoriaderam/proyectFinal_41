# 🧿 Sistema de Gestión Oftalmológica

Este proyecto es una API REST desarrollada con **Flask**, **SQLAlchemy** y **Marshmallow**, diseñada para facilitar la gestión integral de pacientes, recetas ópticas, pedidos y citas en una clínica oftalmológica. Forma parte de un sistema mayor que puede incluir funcionalidades tanto para administración como para usuarios médicos y pacientes.

---

## 🛠️ Tecnologías Utilizadas

- **Python 3.10**
- **Flask**
- **Flask-SQLAlchemy**
- **Flask-Migrate**
- **Flask-JWT-Extended**
- **Marshmallow + Marshmallow-SQLAlchemy**
- **SQLite (modo desarrollo) / PostgreSQL (producción opcional)**
- **Flask-CORS**
- **Flask-Admin**
- **Cloudinary (para subida de archivos)**
- **Postman (para pruebas de endpoints)**

---

## 📁 Estructura del Proyecto

```
proyectFinal_41/
│
├── src/
│   ├── api/
│   │   ├── routes.py
│   │   ├── patient_routes.py
│   │   ├── prescription_routes.py
│   │   ├── order_routes.py
│   │   ├── utils.py
│   │   ├── schemas.py
│   └── app.py
│
├── migrations/
├── instance/
│   └── app.db
├── Pipfile
├── .env
└── README.md
```

---

## ✅ Funcionalidades Implementadas

### 👩‍⚕️ Gestión de Pacientes

- Crear pacientes (`POST /api/patients`)
- Editar pacientes (`PUT /api/patients/<id>`)
- Validación de identidad/email únicos
- Hash de contraseñas con seguridad
- Soporte para asignar roles

### 📅 Citas Médicas

- Modelo `Appointment` creado y funcional para asignar citas entre pacientes y doctores.

### 🧾 Recetas

- Registrar recetas ópticas (`POST /api/prescriptions`)
- Relación directa con pacientes

### 👓 Pedidos

- Crear pedidos basados en recetas (`POST /api/orders`)
- Asociar cada pedido a receta y paciente
- Estado del pedido (en espera, listo, entregado, etc.)

### 🔔 Extras ya modelados

- Notificaciones
- Comentarios
- Archivos adjuntos

---

## 🧪 Pruebas

Se creó una colección de **Postman** que permite probar todos los endpoints implementados, con variables de entorno definidas (`{{base_url}}`) y ejemplos completos para cada método con `body`.

---

## 🪛 Instalación y Ejecución Local

1. Clona el repositorio:

```bash
git clone https://github.com/memoriaderam/proyectFinal_41
cd proyectFinal_41
```

2. Crea el entorno e instala dependencias:

```bash
pipenv install
```

3. Inicia la base de datos:

```bash
pipenv run init
pipenv run migrate
pipenv run upgrade
```

4. Levanta el servidor:

```bash
pipenv run start
```

La API estará disponible en: `http://localhost:3001`

---

## 📌 Variables de Entorno

Configura el archivo `.env`:

```env
FLASK_APP=src/app.py
FLASK_DEBUG=1
DATABASE_URL=sqlite:///instance/app.db
```

---

## 🧩 Avances hasta ahora

✅ Modelos creados y normalizados  
✅ Endpoints de registro y edición de pacientes  
✅ Flujo completo de recetas y pedidos  
✅ Esquemas con validación automática usando Marshmallow  
✅ Testing exitoso en Postman  
✅ Migraciones gestionadas con Alembic

---

## ⏭️ Próximos Pasos

- 📊 Implementar endpoints de estadísticas:
  - Cantidad de citas por profesional
  - Pedidos por estado
  - Pacientes registrados por fecha

- 🔒 Añadir sistema de autenticación JWT (en progreso)
- 🗃️ Subida de archivos médicos a Cloudinary
- 📥 Notificaciones de eventos (nueva receta, pedido listo)
- 📃 Documentación Swagger con ejemplos

---

## 📚 Licencia

MIT © 2025 - Desarrollado por Julio