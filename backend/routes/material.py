from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
from datetime import datetime

from models.material import MaterialClase
from db import db

material_bp = Blueprint("material", __name__)

UPLOAD_FOLDER = "uploads/material"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@material_bp.route("/api/material", methods=["POST"])
def subir_material():
    try:
        clase_id = request.form.get("clase_id")
        fecha = request.form.get("fecha")
        archivo = request.files.get("archivo")

        if not clase_id or not fecha or not archivo:
            return jsonify({"error": "Datos incompletos"}), 400

        nombre_seguro = secure_filename(archivo.filename)
        nombre_final = f"{clase_id}_{fecha}_{nombre_seguro}"

        ruta = os.path.join(UPLOAD_FOLDER, nombre_final)
        archivo.save(ruta)

        material = MaterialClase(
            clase_id=int(clase_id),
            fecha=datetime.strptime(fecha, "%Y-%m-%d").date(),
            nombre_archivo=archivo.filename,
            ruta_archivo=ruta
        )

        db.session.add(material)
        db.session.commit()

        return jsonify({"mensaje": "Material guardado"}), 201

    except Exception as e:
        print(e)
        return jsonify({"error": "Error interno"}), 500
