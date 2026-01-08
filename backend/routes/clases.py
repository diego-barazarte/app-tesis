from flask import Blueprint, jsonify
from db import db

clases_bp = Blueprint("clases", __name__)

class Clase(db.Model):
    __tablename__ = "clases"

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)

@clases_bp.route("", methods=["GET"])
def listar_clases():
    clases = Clase.query.all()

    return jsonify([
        {
            "id": c.id,
            "nombre": c.nombre
        }
        for c in clases
    ])
