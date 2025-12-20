from db import db
from datetime import date

class MaterialClase(db.Model):
    __tablename__ = "material_clase"

    id = db.Column(db.Integer, primary_key=True)
    clase_id = db.Column(db.Integer, nullable=False)
    fecha = db.Column(db.Date, nullable=False)

    nombre_archivo = db.Column(db.String(255), nullable=False)
    ruta_archivo = db.Column(db.String(255), nullable=False)

    fecha_subida = db.Column(db.Date, default=date.today)
