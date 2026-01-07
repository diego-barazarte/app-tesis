from flask import Blueprint, request, jsonify
from datetime import datetime
from db import db
from models.asistencia import Asistencia

asistencias_bp = Blueprint("asistencias", __name__)

@asistencias_bp.route("/<int:clase_id>", methods=["GET"])
def obtener_asistencia(clase_id):
    fecha = request.args.get("fecha")
    if not fecha:
        return jsonify({"error": "fecha requerida"}), 400

    fecha = datetime.strptime(fecha, "%Y-%m-%d").date()

    registros = Asistencia.query.filter_by(
        clase_id=clase_id,
        fecha=fecha
    ).all()

    return jsonify([
        {
            "nino_id": r.nino_id,
            "presente": r.presente
        }
        for r in registros
    ])


@asistencias_bp.route("", methods=["POST"])
def guardar_asistencia():
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

    return jsonify({"message": "Asistencia guardada correctamente"}), 200
