from db import db

class Opcion(db.Model):
    __tablename__ = "opciones"

    id = db.Column(db.Integer, primary_key=True)
    pregunta_id = db.Column(db.Integer, nullable=False)
    texto = db.Column(db.String(300), nullable=False)
    es_correcta = db.Column(db.Boolean, default=False)
