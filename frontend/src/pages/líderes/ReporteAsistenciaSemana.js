import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const FECHA_INICIO = "2025-01-05";

function calcularFecha(semana) {
  const base = new Date(FECHA_INICIO);
  base.setDate(base.getDate() + (Number(semana) - 1) * 7);
  return base.toISOString().split("T")[0];
}

function ReporteAsistenciaSemana() {
  const { id, semana } = useParams();

  const [registros, setRegistros] = useState([]);
  const [cargando, setCargando] = useState(true);

  const fecha = calcularFecha(semana);

  useEffect(() => {
    fetch(
      `http://localhost:5000/api/asistencias?clase_id=${id}&fecha=${fecha}`
    )
      .then(res => res.json())
      .then(data => {
        setRegistros(data);
        setCargando(false);
      })
      .catch(() => setCargando(false));
  }, [id, fecha]);

  if (cargando) return <p>Cargando reporte...</p>;

  return (
    <div>
      <h2>Reporte de asistencia</h2>
      <p><strong>Semana:</strong> {semana}</p>
      <p><strong>Fecha:</strong> {fecha}</p>

      <table border="1" cellPadding="8" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Estudiante</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((r) => (
            <tr key={r.nino_id}>
              <td>{r.nombre}</td>
              <td style={{ textAlign: "center", fontWeight: "bold" }}>
                {!r.registrado && (
                  <span style={{ color: "gray" }}>No registrado</span>
                )}
                {r.registrado && r.presente && (
                  <span style={{ color: "green" }}>Presente</span>
                )}
                {r.registrado && !r.presente && (
                  <span style={{ color: "red" }}>Ausente</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {registros.length === 0 && (
        <p>No hay estudiantes registrados en esta clase.</p>
      )}
    </div>
  );
}

export default ReporteAsistenciaSemana;
