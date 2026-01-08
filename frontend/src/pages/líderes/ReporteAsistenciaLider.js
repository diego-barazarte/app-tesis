import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ReporteAsistenciaLider() {
  const navigate = useNavigate();

  const [clases, setClases] = useState([]);
  const [claseId, setClaseId] = useState("");
  const [sesiones, setSesiones] = useState([]);

  // 🔹 Cargar clases
  useEffect(() => {
    fetch("http://localhost:5000/api/clases")
      .then(res => res.json())
      .then(setClases);
  }, []);

  // 🔹 Cargar sesiones de la clase
  useEffect(() => {
    if (!claseId) return;

    fetch(`http://localhost:5000/api/sesiones/clase/${claseId}`)
      .then(res => res.json())
      .then(setSesiones);
  }, [claseId]);

  return (
    <div>
      <h2>Reportes de asistencia</h2>

      <label><strong>Clase</strong></label><br />
      <select value={claseId} onChange={e => setClaseId(e.target.value)}>
        <option value="">Seleccione</option>
        {clases.map(c => (
          <option key={c.id} value={c.id}>{c.nombre}</option>
        ))}
      </select>

      <br /><br />

      {sesiones.length > 0 && (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Tema</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {sesiones.map(s => (
              <tr key={s.id}>
                <td>{s.fecha}</td>
                <td>{s.tema}</td>
                <td>
                  <button
                    onClick={() =>
                      navigate(`/lideres/reportes/asistencia/${claseId}/${s.fecha}`)
                    }
                  >
                    Ver asistencia
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ReporteAsistenciaLider;
