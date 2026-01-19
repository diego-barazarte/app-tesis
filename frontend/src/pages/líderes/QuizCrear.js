import { useState } from "react";
import { useParams } from "react-router-dom";

const FECHA_INICIO = "2025-01-05";

function calcularFecha(semana) {
  const base = new Date(FECHA_INICIO);
  base.setDate(base.getDate() + (semana - 1) * 7);
  return base.toISOString().split("T")[0];
}


function QuizCrear() {
  const { id, semana} = useParams();
  const fecha = calcularFecha(Number(semana));
  const [titulo, setTitulo] = useState("");
  const [preguntas, setPreguntas] = useState([]);

  const agregarPregunta = () => {
    setPreguntas([
      ...preguntas,
      {
        texto: "",
        opciones: ["", "", "", ""],
        correcta: 0,
      },
    ]);
  };

  const guardarQuiz = async () => {
    await fetch("http://localhost:5000/api/quizzes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clase_id: Number(id),
        titulo,
        fecha,
        preguntas,
      }),
    });

    alert("Quiz guardado correctamente");
  };

  return (
    <div style={{ maxWidth: "700px" }}>
      <h2>Crear Quiz</h2>
  
      {/* 🔹 Título */}
      <div style={{ marginBottom: "20px" }}>
        <input
          style={{ width: "100%", padding: "8px" }}
          placeholder="Título del quiz"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </div>
  
      {preguntas.map((p, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "20px",
          }}
        >
          <input
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
            }}
            placeholder={`Pregunta ${i + 1}`}
            onChange={(e) => {
              const copia = [...preguntas];
              copia[i].texto = e.target.value;
              setPreguntas(copia);
            }}
          />
          {p.opciones.map((_, j) => (
            <div key={j} style={{ marginBottom: "6px" }}>
              <input
                style={{ width: "100%", padding: "6px" }}
                placeholder={`Opción ${j + 1}`}
                onChange={(e) => {
                  const copia = [...preguntas];
                  copia[i].opciones[j] = e.target.value;
                  setPreguntas(copia);
                }}
              />
            </div>
          ))}
  
          <select
            style={{ marginTop: "8px" }}
            onChange={(e) => {
              const copia = [...preguntas];
              copia[i].correcta = Number(e.target.value);
              setPreguntas(copia);
            }}
          >
            {[0, 1, 2, 3].map(n => (
              <option key={n} value={n}>
                Correcta: Opción {n + 1}
              </option>
            ))}
          </select>
        </div>
      ))}
  
      <button onClick={agregarPregunta}>Agregar pregunta</button>
      <br /><br />
      <button onClick={guardarQuiz}>Guardar Quiz</button>
    </div>
  );
  
}

export default QuizCrear;
