from db import db
from datetime import datetime

class SesionClase(db.Model):
    __tablename__ = "sesiones_clase"

    id = db.Column(db.Integer, primary_key=True)
    clase_id = db.Column(db.Integer, nullable=False)
    fecha = db.Column(db.Date, nullable=False)
    tema = db.Column(db.String(255), nullable=False)
    comentarios = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
