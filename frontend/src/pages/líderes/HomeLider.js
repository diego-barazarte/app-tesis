import { useNavigate } from "react-router-dom";

function HomeLider() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Bienvenido, Líder</h2>

      <p>Desde aquí puedes gestionar tus clases dominicales.</p>

      <button onClick={() => navigate("/lideres/clases")}>
        Ver mis clases
      </button>
    </div>
  );
}

export default HomeLider;
