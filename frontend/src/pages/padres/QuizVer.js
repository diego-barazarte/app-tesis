import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FECHA_INICIO = "2025-01-05";

function calcularFecha(semana) {
  const base = new Date(FECHA_INICIO);
  base.setDate(base.getDate() + (semana - 1) * 7);
  return base.toISOString().split("T")[0];
}

function QuizVer() {
  const [quiz, setQuiz] = useState(null);
  const [cargando, setCargando] = useState(true);
  const { id, semana } = useParams();
  const fecha = calcularFecha(Number(semana));

  useEffect(() => {
    fetch(`http://localhost:5000/api/quizzes/por-clase/${id}?fecha=${fecha}`)
      .then(res => res.json())
      .then(data => {
        setQuiz(data && data.titulo ? data : null);
        setCargando(false);
      })
      .catch(() => setCargando(false));
  }, [id]);

  if (cargando) return <p>Cargando quiz...</p>;

  if (!quiz) {
    return <p>No hay quiz disponible para esta clase.</p>;
  }

  return (
    <div style={{ maxWidth: "700px" }}>
      <h2>{quiz.titulo}</h2>

      {quiz.preguntas.map((p, i) => (
        <div
          key={p.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "20px",
          }}
        >
          <strong>
            {i + 1}. {p.texto}
          </strong>

          <ul style={{ marginTop: "10px" }}>
            {p.opciones.map((op) => (
              <li key={op.id}>{op.texto}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default QuizVer;
