import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FECHA_INICIO = "2025-01-05";

function calcularFecha(semana) {
  const base = new Date(FECHA_INICIO);
  base.setDate(base.getDate() + (semana - 1) * 7);
  return base.toISOString().split("T")[0];
}

function ReporteAsistenciaLider() {
  const navigate = useNavigate();

  const [clases, setClases] = useState([]);
  const [claseSeleccionada, setClaseSeleccionada] = useState("");

  const semanas = Array.from({ length: 12 }, (_, i) => i + 1);

  // 🔹 Cargar clases
  useEffect(() => {
    fetch("http://localhost:5000/api/clases")
      .then(res => res.json())
      .then(data => setClases(data))
      .catch(() => setClases([]));
  }, []);

  return (
    <div>
      <h2>Reportes de asistencia</h2>

      <label><strong>Seleccione una clase</strong></label>
      <br />

      <select
        value={claseSeleccionada}
        onChange={(e) => setClaseSeleccionada(e.target.value)}
      >
        <option value="">-- Seleccione --</option>
        {clases.map((c) => (
          <option key={c.id} value={c.id}>
            {c.nombre}
          </option>
        ))}
      </select>

      <br /><br />

      {claseSeleccionada && (
        <>
          <h3>Sesiones registradas</h3>

          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>Semana</th>
                <th>Fecha</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {semanas.map((semana) => (
                <tr key={semana}>
                  <td>Semana {semana}</td>
                  <td>{calcularFecha(semana)}</td>
                  <td>
                    <button
                      onClick={() =>
                        navigate(
                          `/lideres/reportes/asistencia/clase/${claseSeleccionada}/semana/${semana}`
                        )
                      }
                    >
                      Ver asistencia
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default ReporteAsistenciaLider;
