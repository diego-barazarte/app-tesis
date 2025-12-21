import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Fecha base
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
  const [materiales, setMateriales] = useState([]);
  const [cargando, setCargando] = useState(true);

  const fecha = calcularFecha(Number(semana));

  useEffect(() => {
    fetch(`http://localhost:5000/api/sesiones/${id}?fecha=${fecha}`)
      .then(res => res.json())
      .then(data => {
        setTema(data.tema || "No registrado");
        setComentarios(data.comentarios || "No hay comentarios");
      });

    fetch(`http://localhost:5000/api/material?clase_id=${id}&fecha=${fecha}`)
      .then(res => res.json())
      .then(setMateriales)
      .finally(() => setCargando(false));
  }, [id, fecha]);

  if (cargando) return <p>Cargando sesión...</p>;

  return (
    <div>
      <h2>Semana {semana}</h2>

      <p><strong>Tema:</strong> {tema}</p>
      <p><strong>Comentarios:</strong> {comentarios}</p>

      <h3>Material de la semana</h3>

      {materiales.length === 0 && <p>No hay material adicional.</p>}

      <ul>
        {materiales.map(m => (
          <li key={m.id}>
            <a
              href={`http://localhost:5000/${m.ruta}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              📄 {m.nombre}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SemanaClasePadres;
