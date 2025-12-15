import { useParams, Link } from "react-router-dom";
import { clases } from "../../data/clasesMock";

function ClaseDetalleLider() {
  const { id } = useParams();
  const clase = clases.find(c => c.id === Number(id));

  return (
    <div>
      <h2>{clase.nombre}</h2>
      <h3>Semanas</h3>

      {clase.semanas.map((semana) => (
        <div key={semana.numero}>
          <Link to={`/lideres/clases/${id}/semana/${semana.numero}`}>
            Semana {semana.numero}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ClaseDetalleLider;
