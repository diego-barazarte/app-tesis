from db import db

class Asistencia(db.Model):
    __tablename__ = "asistencias"

    id = db.Column(db.Integer, primary_key=True)

    clase_id = db.Column(db.Integer, nullable=False)
    nino_id = db.Column(db.Integer, nullable=False)

    fecha = db.Column(db.Date, nullable=False)
    presente = db.Column(db.Boolean, nullable=False)
