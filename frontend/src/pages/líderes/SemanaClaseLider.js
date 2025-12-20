import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function SemanaClaseLider() {
  const { id, semana } = useParams();

  const claseId = Number(id);

  // Fecha simulada por semana (puedes mejorar luego)
  const fecha = `2025-12-${String(semana).padStart(2, "0")}`;

  const [tema, setTema] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [cargando, setCargando] = useState(true);

  // =================== CARGAR SESIÓN ===================
  useEffect(() => {
    fetch(
      `http://localhost:5000/api/sesiones/${claseId}?fecha=${fecha}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.tema) {
          setTema(data.tema);
          setComentarios(data.comentarios || "");
        }
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error cargando sesión", err);
        setCargando(false);
      });
  }, [claseId, fecha]);

  // =================== GUARDAR ===================
  const guardar = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/sesiones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clase_id: claseId,
          fecha: fecha,
          tema: tema,
          comentarios: comentarios,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al guardar");
      }

      alert("Sesión guardada correctamente ✅");
    } catch (error) {
      console.error("ERROR:", error);
      alert("No se pudo guardar la sesión ❌");
    }
  };

  if (cargando) return <p>Cargando sesión...</p>;

  return (
    <div>
      <h2>Semana {semana}</h2>

      <div>
        <label>Tema de la clase</label>
        <br />
        <input
          value={tema}
          onChange={(e) => setTema(e.target.value)}
          placeholder="Tema de la clase"
          style={{ width: "100%" }}
        />
      </div>

      <br />

      <div>
        <label>Comentarios adicionales</label>
        <br />
        <textarea
          value={comentarios}
          onChange={(e) => setComentarios(e.target.value)}
          rows="4"
          style={{ width: "100%" }}
        />
      </div>

      <br />

      <button onClick={guardar}>Guardar</button>
    </div>
  );
}

export default SemanaClaseLider;
