import os
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from models.material import MaterialClase
from db import db

material_bp = Blueprint("material", __name__, url_prefix="/api/material")

UPLOAD_FOLDER = "uploads/material"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ==========================
# SUBIR MATERIAL (LÍDER)
# ==========================
@material_bp.route("", methods=["POST"])
def subir_material():
    try:
        clase_id = request.form.get("clase_id")
        fecha = request.form.get("fecha")
        archivo = request.files.get("archivo")

        if not clase_id or not fecha or not archivo:
            return jsonify({"error": "Datos incompletos"}), 400

        nombre_seguro = secure_filename(archivo.filename)
        ruta = os.path.join(UPLOAD_FOLDER, nombre_seguro)
        archivo.save(ruta)

        material = MaterialClase(
            clase_id=clase_id,
            fecha=fecha,
            nombre_archivo=nombre_seguro,
            ruta_archivo=ruta,
            tipo="pdf"
        )

        db.session.add(material)
        db.session.commit()

        return jsonify({"msg": "Material subido correctamente"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ==========================
# OBTENER MATERIAL (PADRES / LÍDER)
# ==========================
@material_bp.route("", methods=["GET"])
def obtener_material():
    clase_id = request.args.get("clase_id")
    fecha = request.args.get("fecha")

    if not clase_id or not fecha:
        return jsonify([])

    materiales = MaterialClase.query.filter_by(
        clase_id=clase_id,
        fecha=fecha
    ).all()

    return jsonify([
        {
            "id": m.id,
            "nombre": m.nombre_archivo,
            "ruta": m.ruta_archivo,
            "tipo": m.tipo
        }
        for m in materiales
    ])


# ==========================
# ELIMINAR MATERIAL (LÍDER)
# ==========================
@material_bp.route("/<int:id>", methods=["DELETE"])
def eliminar_material(id):
    material = MaterialClase.query.get_or_404(id)

    if os.path.exists(material.ruta_archivo):
        os.remove(material.ruta_archivo)

    db.session.delete(material)
    db.session.commit()

    return jsonify({"msg": "Material eliminado"})
