import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

function SemanaClaseLider() {
  const { semana } = useParams();
  const navigate = useNavigate();
  const [tema, setTema] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [guardado, setGuardado] = useState(false);

  const guardar = () => {
    setGuardado(true);
  };

  return (
    <div>
      <h2>Semana {semana}</h2>

      <input
        placeholder="Tema de la clase"
        value={tema}
        onChange={(e) => setTema(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Observaciones del líder"
        rows="4"
        value={observaciones}
        onChange={(e) => setObservaciones(e.target.value)}
      />

      <br /><br />

      <button onClick={guardar}>Guardar</button>
      <button onClick={() => navigate("quiz/crear")}>
      Crear Quiz de la semana
      </button>


      {guardado && <p>Información guardada ✔</p>}
    </div>
  );
}

export default SemanaClaseLider;
