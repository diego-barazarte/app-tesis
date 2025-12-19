import { useParams } from "react-router-dom";
import { quizzes } from "../../data/quizzesMock";
import { useState } from "react";

function QuizJugador() {
  const { quizId } = useParams();
  const quiz = quizzes.find((q) => q.id === Number(quizId));

  const [actual, setActual] = useState(0);
  const [puntaje, setPuntaje] = useState(0);

  const responder = (i) => {
    if (i === quiz.preguntas[actual].correcta) {
      setPuntaje(puntaje + 1);
    }
    setActual(actual + 1);
  };

  if (actual >= quiz.preguntas.length) {
    return (
      <div>
        <h2>¡Fin del Quiz! 🎉</h2>
        <p>Puntaje: {puntaje} / {quiz.preguntas.length}</p>
      </div>
    );
  }

  const pregunta = quiz.preguntas[actual];

  return (
    <div>
      <h3>{pregunta.texto}</h3>

      {pregunta.opciones.map((op, i) => (
        <button key={i} onClick={() => responder(i)}>
          {op}
        </button>
      ))}
    </div>
  );
}

export default QuizJugador;
