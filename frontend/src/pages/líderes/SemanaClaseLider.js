import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Primer domingo de la clase
const FECHA_INICIO = "2025-01-05";

function calcularFecha(semana) {
  const base = new Date(FECHA_INICIO);
  base.setDate(base.getDate() + (semana - 1) * 7);
  return base.toISOString().split("T")[0];
}

function SemanaClaseLider() {
  const { id, semana } = useParams();
  const navigate = useNavigate();

  const [tema, setTema] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState("");

  const fecha = calcularFecha(Number(semana));

  // 🔹 Cargar sesión existente
  useEffect(() => {
    fetch(`http://localhost:5000/api/sesiones/${id}?fecha=${fecha}`)
      .then(res => res.json())
      .then(data => {
        if (data.tema) {
          setTema(data.tema);
          setComentarios(data.comentarios || "");
        }
        setCargando(false);
      })
      .catch(() => setCargando(false));
  }, [id, fecha]);

  // 🔹 Guardar o actualizar
  const guardar = async () => {
    setMensaje("");

    try {
      const res = await fetch("http://localhost:5000/api/sesiones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clase_id: Number(id),
          fecha,
          tema,
          comentarios,
        }),
      });

      if (!res.ok) throw new Error();

      setMensaje("Sesión guardada correctamente ✔");
    } catch {
      setMensaje("No se pudo guardar la sesión ❌");
    }
  };

  if (cargando) return <p>Cargando sesión...</p>;

  return (
    <div>
      <h2>Semana {semana}</h2>

      <label><strong>Tema de la clase</strong></label>
      <br />
      <input
        value={tema}
        onChange={(e) => setTema(e.target.value)}
        placeholder="Ej: El amor al prójimo"
        style={{ width: "100%" }}
      />

      <br /><br />

      <label><strong>Comentarios del líder</strong></label>
      <br />
      <textarea
        rows="4"
        value={comentarios}
        onChange={(e) => setComentarios(e.target.value)}
        placeholder="Observaciones, comportamiento, notas importantes..."
        style={{ width: "100%" }}
      />

      <br /><br />

      <button onClick={guardar}>
        {tema ? "Actualizar sesión" : "Guardar sesión"}
      </button>

      <button
        style={{ marginLeft: "10px" }}
        onClick={() => navigate("quiz/crear")}
      >
        Crear Quiz de la semana
      </button>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default SemanaClaseLider;
