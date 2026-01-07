import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Asistencia() {
  const { id, semana } = useParams();
  const navigate = useNavigate();

  const [ninos, setNinos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/ninos/por-clase/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setNinos(data);
        setCargando(false);
      })
      .catch(() => {
        setError("No se pudo cargar la lista de niños");
        setCargando(false);
      });
  }, []);

  if (cargando) return <p>Cargando lista...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Asistencia – Semana {semana}</h2>

      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Nombre del estudiante</th>
          </tr>
        </thead>
        <tbody>
          {ninos.map((nino) => (
            <tr key={nino.id}>
              <td>{nino.nombre}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <button onClick={() => navigate(-1)}>
        Volver a la semana
      </button>
    </div>
  );
}

export default Asistencia;
