import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Fecha base: primer domingo de la clase
const FECHA_INICIO = "2025-01-05";

function calcularFecha(semana) {
  const base = new Date(FECHA_INICIO);
  base.setDate(base.getDate() + (semana - 1) * 7);
  return base.toISOString().split("T")[0];
}

function SemanaClasePadres() {
  const { id, semana } = useParams();
  const [tema, setTema] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fecha = calcularFecha(Number(semana));

    fetch(`http://localhost:5000/api/sesiones/${id}?fecha=${fecha}`)
      .then(res => res.json())
      .then(data => {
        setTema(data.tema || "No registrado");
        setComentarios(data.comentarios || "No hay comentarios");
        setCargando(false);
      })
      .catch(() => setCargando(false));
  }, [id, semana]);

  if (cargando) return <p>Cargando sesión...</p>;

  return (
    <div>
      <h2>Semana {semana}</h2>

      <p><strong>Tema:</strong> {tema}</p>
      <p><strong>Comentarios:</strong> {comentarios}</p>
    </div>
  );
}

export default SemanaClasePadres;
