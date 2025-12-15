import { useNavigate } from "react-router-dom";
import { clases } from "../../data/clasesMock";

function ClasesLider() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Mis Clases</h2>

      {clases.map((clase) => (
        <div key={clase.id} style={{ marginBottom: "15px" }}>
          <h4>{clase.nombre}</h4>

          <button
            onClick={() => navigate(`/lideres/clases/${clase.id}`)}
          >
            Ver clase
          </button>
        </div>
      ))}
    </div>
  );
}

export default ClasesLider;
