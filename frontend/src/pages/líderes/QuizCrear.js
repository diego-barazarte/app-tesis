import { useState } from "react";

function QuizCrear() {
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

  return (
    <div>
      <h2>Crear Quiz</h2>

      <input
        placeholder="Título del quiz"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />

      <br /><br />

      {preguntas.map((p, i) => (
        <div key={i} style={{ marginBottom: "20px" }}>
          <input
            placeholder={`Pregunta ${i + 1}`}
            onChange={(e) => (p.texto = e.target.value)}
          />

          {p.opciones.map((_, j) => (
            <div key={j}>
              <input
                placeholder={`Opción ${j + 1}`}
                onChange={(e) => (p.opciones[j] = e.target.value)}
              />
            </div>
          ))}

          <select onChange={(e) => (p.correcta = Number(e.target.value))}>
            <option value={0}>Correcta: Opción 1</option>
            <option value={1}>Correcta: Opción 2</option>
            <option value={2}>Correcta: Opción 3</option>
            <option value={3}>Correcta: Opción 4</option>
          </select>
        </div>
      ))}

      <button onClick={agregarPregunta}>Agregar pregunta</button>
      <br /><br />
      <button>Guardar Quiz</button>
    </div>
  );
}

export default QuizCrear;
