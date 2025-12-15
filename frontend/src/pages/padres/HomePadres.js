import { useNavigate } from "react-router-dom";

function HomePadres() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Bienvenido</h2>

      <p>Aquí puedes ver el progreso de tu hijo en las clases dominicales.</p>

      <button onClick={() => navigate("/padres/clases")}>
        Ver clases
      </button>
    </div>
  );
}

export default HomePadres;
