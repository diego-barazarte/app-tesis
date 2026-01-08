import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const FECHA_INICIO = "2025-01-05";

function calcularFecha(semana) {
  const base = new Date(FECHA_INICIO);
  base.setDate(base.getDate() + (semana - 1) * 7);
  return base.toISOString().split("T")[0];
}

function ReporteAsistenciaSemana() {
  const { id, semana } = useParams();

  const [ninos, setNinos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const fecha = calcularFecha(Number(semana));

  useEffect(() => {
    fetch(`http://localhost:5000/api/ninos?clase_id=${id}`)
      .then(res => res.json())
      .then(data => {
        setNinos(data);
        setCargando(false);
      })
      .catch(() => setCargando(false));
  }, [id]);

  if (cargando) return <p>Cargando reporte...</p>;

  return (
    <div>
      <h2>Reporte de asistencia</h2>
      <p><strong>Semana:</strong> {semana}</p>
      <p><strong>Fecha:</strong> {fecha}</p>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Estudiante</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {ninos.map((n) => (
            <tr key={n.id}>
              <td>{n.nombres} {n.apellidos}</td>
              <td>
                <span style={{ color: "gray" }}>
                  No registrado
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {ninos.length === 0 && (
        <p>No hay estudiantes registrados en esta clase.</p>
      )}
    </div>
  );
}

export default ReporteAsistenciaSemana;
