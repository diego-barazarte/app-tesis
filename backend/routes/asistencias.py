from flask import Blueprint, request, jsonify
from db import db
from datetime import datetime
from models.asistencia import Asistencia
from routes.ninos import Nino  

asistencias_bp = Blueprint("asistencias", __name__)

@asistencias_bp.route("", methods=["GET"])
def obtener_asistencia():
    clase_id = request.args.get("clase_id")
    fecha = request.args.get("fecha")

    if not clase_id or not fecha:
        return {"error": "clase_id y fecha requeridos"}, 400

    fecha = datetime.strptime(fecha, "%Y-%m-%d").date()

    registros = db.session.query(
        Nino.id,
        Nino.nombres,
        Nino.apellidos,
        Asistencia.presente
    ).outerjoin(
        Asistencia,
        (Asistencia.nino_id == Nino.id) &
        (Asistencia.clase_id == int(clase_id)) &
        (Asistencia.fecha == fecha)
    ).filter(
        Nino.clase_id == int(clase_id)
    ).all()

    return jsonify([
        {
            "nino_id": r.id,
            "nombre": f"{r.nombres} {r.apellidos}",
            "presente": bool(r.presente) if r.presente is not None else False
        }
        for r in registros
    ])
