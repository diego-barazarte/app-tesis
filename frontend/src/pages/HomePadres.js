import { useNavigate, useParams } from "react-router-dom";

function HomePadres() {
  const navigate = useNavigate();
  const { rol } = useParams();

  if (rol !== "padres") return null;

  return (
    <div>
      <h2>Bienvenido, Padre de Familia</h2>

      <p>
        Desde aquí puedes registrar a tu hijo para participar en las
        clases dominicales organizadas por los líderes.
      </p>

      <br />

      <button onClick={() => navigate(`/${rol}/registro-hijo`)}>
        Registrar hijo
      </button>
    </div>
  );
}

export default HomePadres;
