from api.models import db, Role


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
