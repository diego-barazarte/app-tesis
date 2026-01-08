from flask import Flask
from flask_cors import CORS
from db import db
from flask import send_from_directory
import os


app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = (
    "mysql+mysqlconnector://root:password@localhost/app_clases_dominicales"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

from routes.ninos import ninos_bp
from routes.sesiones import sesiones_bp
from routes.material import material_bp
from routes.asistencias import asistencias_bp
from routes.clases import clases_bp


app.register_blueprint(clases_bp, url_prefix="/api/clases")
app.register_blueprint(asistencias_bp, url_prefix="/api/asistencias")
app.register_blueprint(ninos_bp, url_prefix="/api/ninos")
app.register_blueprint(sesiones_bp, url_prefix="/api/sesiones")
app.register_blueprint(material_bp)

@app.route("/uploads/<path:filename>")
def descargar_archivo(filename):
    return send_from_directory(
        os.path.join(app.root_path, "uploads"),
        filename,
        as_attachment=False
    )

@app.route("/")
def home():
    return {"message": "Servidor Flask funcionando"}

if __name__ == "__main__":
    app.run(debug=True)
