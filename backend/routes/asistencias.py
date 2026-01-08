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
        Nino.id.label("nino_id"),
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
            "nino_id": r.nino_id,
            "nombre": f"{r.nombres} {r.apellidos}",
            "registrado": r.presente is not None,
            "presente": r.presente
        }
        for r in registros
    ])

@asistencias_bp.route("", methods=["POST"])
def guardar_asistencia():
    try:
        data = request.json

        clase_id = data["clase_id"]
        fecha = datetime.strptime(data["fecha"], "%Y-%m-%d").date()
        asistencias = data["asistencias"]

        for item in asistencias:
            registro = Asistencia.query.filter_by(
                clase_id=clase_id,
                nino_id=item["nino_id"],
                fecha=fecha
            ).first()

            if registro:
                registro.presente = item["presente"]
            else:
                nuevo = Asistencia(
                    clase_id=clase_id,
                    nino_id=item["nino_id"],
                    fecha=fecha,
                    presente=item["presente"]
                )
                db.session.add(nuevo)

        db.session.commit()
        return {"message": "Asistencia guardada correctamente"}, 201

    except Exception as e:
        print("ERROR GUARDANDO ASISTENCIA:", e)
        db.session.rollback()
        return {"error": "Error interno"}, 500
