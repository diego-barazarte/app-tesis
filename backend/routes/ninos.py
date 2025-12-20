from flask import Blueprint, request, jsonify
from db import db

ninos_bp = Blueprint("ninos", __name__)

class Nino(db.Model):
    __tablename__ = "niños"

    id = db.Column(db.Integer, primary_key=True)
    nombres = db.Column(db.String(100), nullable=False)
    apellidos = db.Column(db.String(100), nullable=False)
    fecha_nacimiento = db.Column(db.Date, nullable=False)
    genero = db.Column(db.Enum("Masculino", "Femenino"), nullable=False)

    nombre_representante = db.Column(db.String(150), nullable=False)
    telefono = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(150))
    observaciones = db.Column(db.Text)

    clase_id = db.Column(db.Integer, nullable=False)

@ninos_bp.route("", methods=["POST"])
def registrar_nino():
    data = request.json

    nuevo = Nino(
        nombres=data["nombres"],
        apellidos=data["apellidos"],
        fecha_nacimiento=data["fecha_nacimiento"],
        genero=data["genero"],
        nombre_representante=data["nombre_representante"],
        telefono=data["telefono"],
        email=data.get("email"),
        observaciones=data.get("observaciones"),
        clase_id=data["clase_id"]
    )

    db.session.add(nuevo)
    db.session.commit()

    return jsonify({
        "message": "Niño registrado correctamente",
        "id": nuevo.id
    }), 201
