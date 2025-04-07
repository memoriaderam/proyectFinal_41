from api.models import db, Role


def create_default_roles():
    roles = [
        {"role_id": 1, "name": "admin"},
        {"role_id": 2, "name": "doctor"},
        {"role_id": 3, "name": "patient"},
    ]

    for role in roles:
        exists = Role.query.get(role["role_id"])
        if not exists:
            new_role = Role(role_id=role["role_id"], name=role["name"], is_active=True)
            db.session.add(new_role)
    db.session.commit()
