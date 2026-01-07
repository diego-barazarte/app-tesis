import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const FECHA_INICIO = "2025-01-05";

function calcularFecha(semana) {
  const base = new Date(FECHA_INICIO);
  base.setDate(base.getDate() + (Number(semana) - 1) * 7);
  return base.toISOString().split("T")[0];
}

function Asistencia() {
  const { id, semana } = useParams();
  const navigate = useNavigate();

  const fecha = calcularFecha(semana);

  const [asistencia, setAsistencia] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState("");

  // 🔹 Cargar niños de la clase
  useEffect(() => {
    fetch(`http://localhost:5000/api/ninos?clase_id=${id}`)
      .then(res => res.json())
      .then(data => {
        setAsistencia(
          data.map(n => ({
            nino_id: n.id,
            nombre: `${n.nombres} ${n.apellidos}`,
            presente: false,
          }))
        );
        setCargando(false);
      })
      .catch(() => setCargando(false));
  }, [id]);

  const toggleAsistencia = (index) => {
    const copia = [...asistencia];
    copia[index].presente = !copia[index].presente;
    setAsistencia(copia);
  };

  const guardarAsistencia = async () => {
    setMensaje("");

    try {
      const res = await fetch("http://localhost:5000/api/asistencias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clase_id: Number(id),
          fecha,
          asistencias: asistencia.map(a => ({
            nino_id: a.nino_id,
            presente: a.presente,
          })),
        }),
      });

      if (!res.ok) throw new Error();

      setMensaje("Asistencia guardada correctamente ✔");
    } catch {
      setMensaje("Error al guardar asistencia ❌");
    }
  };

  if (cargando) return <p>Cargando asistencia...</p>;

  return (
    <div>
      <h2>Asistencia - Semana {semana}</h2>
      <p><strong>Fecha:</strong> {fecha}</p>

      <table border="1" cellPadding="8" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Presente</th>
          </tr>
        </thead>
        <tbody>
          {asistencia.map((nino, index) => (
            <tr key={nino.nino_id}>
              <td>{nino.nombre}</td>
              <td style={{ textAlign: "center" }}>
                <input
                  type="checkbox"
                  checked={nino.presente}
                  onChange={() => toggleAsistencia(index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <button onClick={guardarAsistencia}>
        Guardar asistencia
      </button>

      <button
        style={{ marginLeft: "10px" }}
        onClick={() => navigate(-1)}
      >
        Volver
      </button>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default Asistencia;
