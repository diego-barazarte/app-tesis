from flask import Flask
from flask_cors import CORS
from db import db

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = (
    "mysql+mysqlconnector://root:password@localhost/app_clases_dominicales"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

from routes.ninos import ninos_bp
from routes.sesiones import sesiones_bp

app.register_blueprint(ninos_bp, url_prefix="/api/ninos")
app.register_blueprint(sesiones_bp, url_prefix="/api/sesiones")

@app.route("/")
def home():
    return {"message": "Servidor Flask funcionando"}

if __name__ == "__main__":
    app.run(debug=True)
