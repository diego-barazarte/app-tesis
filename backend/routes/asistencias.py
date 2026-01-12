from flask import Blueprint, request, jsonify
from db import db
from datetime import datetime
from models.asistencia import Asistencia
from routes.ninos import Nino

from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from flask import send_file
import io

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

@asistencias_bp.route("/reporte/pdf", methods=["GET"])
def reporte_asistencia_pdf():
    clase_id = request.args.get("clase_id")

    if not clase_id:
        return {"error": "clase_id requerido"}, 400

    from models.sesion_clase import SesionClase

    total_sesiones = SesionClase.query.filter_by(
        clase_id=clase_id
    ).count()

    ninos = Nino.query.filter_by(clase_id=clase_id).all()

    buffer = io.BytesIO()
    pdf = canvas.Canvas(buffer, pagesize=letter)
    width, height = letter

    y = height - 40

    pdf.setFont("Helvetica-Bold", 14)
    pdf.drawString(40, y, "Reporte de Asistencia")
    y -= 30

    pdf.setFont("Helvetica", 10)

    for n in ninos:
        asistencias = Asistencia.query.filter_by(
            clase_id=clase_id,
            nino_id=n.id,
            presente=True
        ).count()

        porcentaje = (
            round((asistencias / total_sesiones) * 100, 2)
            if total_sesiones > 0 else 0
        )

        linea = f"{n.nombres} {n.apellidos} - {asistencias}/{total_sesiones} ({porcentaje}%)"
        pdf.drawString(40, y, linea)
        y -= 18

        if y < 50:
            pdf.showPage()
            y = height - 40
            pdf.setFont("Helvetica", 10)

    pdf.save()
    buffer.seek(0)

    return send_file(
        buffer,
        as_attachment=True,
        download_name="reporte_asistencia.pdf",
        mimetype="application/pdf"
    )
