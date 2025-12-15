import { useParams, useNavigate } from "react-router-dom";
import { clases } from "../../data/clasesMock";

function ClaseDetallePadres() {
  const { id } = useParams();
  const navigate = useNavigate();
  const clase = clases.find(c => c.id === Number(id));

  return (
    <div>
      <h2>{clase.nombre}</h2>

      <h3>Semanas</h3>

      {clase.semanas.map((semana) => (
        <div key={semana.numero} style={{ marginBottom: "10px" }}>
          <button
            onClick={() =>
              navigate(`/padres/clases/${id}/semana/${semana.numero}`)
            }
          >
            Semana {semana.numero}
          </button>
        </div>
      ))}
    </div>
  );
}

export default ClaseDetallePadres;
