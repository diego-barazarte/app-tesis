from flask import Blueprint, request, jsonify
from models.sesion_clase import SesionClase
from db import db
from datetime import datetime

sesiones_bp = Blueprint("sesiones", __name__)

@sesiones_bp.route("/<int:clase_id>", methods=["GET"])
def obtener_sesion(clase_id):
    fecha = request.args.get("fecha")

    if not fecha:
        return {"error": "Fecha requerida"}, 400

    sesion = SesionClase.query.filter_by(
        clase_id=clase_id,
        fecha=fecha
    ).first()

    if not sesion:
        return {}, 200

    return jsonify({
        "id": sesion.id,
        "tema": sesion.tema,
        "comentarios": sesion.comentarios
    })

@sesiones_bp.route("", methods=["POST"])
def guardar_sesion():
    data = request.json

    try:
        fecha = datetime.strptime(data["fecha"], "%Y-%m-%d").date()

        sesion = SesionClase.query.filter_by(
            clase_id=data["clase_id"],
            fecha=fecha
        ).first()

        if sesion:
            sesion.tema = data["tema"]
            sesion.comentarios = data.get("comentarios", "")
        else:
            sesion = SesionClase(
                clase_id=data["clase_id"],
                fecha=fecha,
                tema=data["tema"],
                comentarios=data.get("comentarios", "")
            )
            db.session.add(sesion)

        db.session.commit()

        return {"message": "Sesión guardada"}, 201

    except Exception as e:
        print("ERROR GUARDANDO SESIÓN:", e)
        return {"error": "Error interno"}, 500
    
@sesiones_bp.route("/clase/<int:clase_id>", methods=["GET"])
def listar_sesiones(clase_id):
    sesiones = SesionClase.query.filter_by(
        clase_id=clase_id
    ).order_by(SesionClase.fecha).all()

    return jsonify([
        {
            "id": s.id,
            "fecha": s.fecha.isoformat(),
            "tema": s.tema
        }
        for s in sesiones
    ])

