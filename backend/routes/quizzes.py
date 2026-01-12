from flask import Blueprint, request, jsonify
from db import db
from models.quiz import Quiz
from models.pregunta import Pregunta
from models.opcion import Opcion

quizzes_bp = Blueprint("quizzes", __name__)

@quizzes_bp.route("", methods=["POST"])
def crear_quiz():
    data = request.json

    quiz = Quiz(
        clase_id=data["clase_id"],
        titulo=data["titulo"]
    )
    db.session.add(quiz)
    db.session.commit()

    for p in data["preguntas"]:
        pregunta = Pregunta(
            quiz_id=quiz.id,
            texto=p["texto"]
        )
        db.session.add(pregunta)
        db.session.commit()

        for i, op in enumerate(p["opciones"]):
            opcion = Opcion(
                pregunta_id=pregunta.id,
                texto=op,
                es_correcta=(i == p["correcta"])
            )
            db.session.add(opcion)

    db.session.commit()

    return {"message": "Quiz creado correctamente"}, 201

@quizzes_bp.route("", methods=["GET"])
def obtener_quizzes():
    clase_id = request.args.get("clase_id")

    quizzes = Quiz.query.filter_by(clase_id=clase_id).all()

    return jsonify([
        {"id": q.id, "titulo": q.titulo}
        for q in quizzes
    ])

@quizzes_bp.route("/<int:quiz_id>", methods=["GET"])
def obtener_quiz(quiz_id):
    preguntas = Pregunta.query.filter_by(quiz_id=quiz_id).all()

    resultado = []

    for p in preguntas:
        opciones = Opcion.query.filter_by(pregunta_id=p.id).all()

        resultado.append({
            "id": p.id,
            "texto": p.texto,
            "opciones": [
                {"id": o.id, "texto": o.texto}
                for o in opciones
            ]
        })

    return jsonify(resultado)
