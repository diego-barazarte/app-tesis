import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ListaNinos() {
  const [ninos, setNinos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/ninos?clase_id=1")
      .then(res => res.json())
      .then(data => setNinos(data));
  }, []);

  return (
    <div>
      <h2>Niños registrados en la clase</h2>

      {ninos.length === 0 && <p>No hay niños registrados.</p>}

      {ninos.map(n => (
        <div
          key={n.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px"
          }}
        >
          <strong>{n.nombres} {n.apellidos}</strong><br />
          Género: {n.genero}<br />
          Representante: {n.nombre_representante}<br />

          <button
            onClick={() => navigate(`/lideres/ninos/${n.id}`)}
          >
            Ver detalles
          </button>
        </div>
      ))}
    </div>
  );
}

export default ListaNinos;
