import { useNavigate, useParams } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const { rol } = useParams();

  if (rol !== "lideres") return null;

  const liderMock = {
    nombre: "Carlos Andrés Mena",
  };

  return (
    <div>
      <h2>Bienvenido, {liderMock.nombre}</h2>

      <h3>Versículo del Día</h3>
      <p>
        "Porque de tal manera amó Dios al mundo..."
        <br />- Juan 3:16
      </p>

      <br />

      <button onClick={() => navigate(`/${rol}/asistencia`)}>
        Tomar asistencia
      </button>
    </div>
  );
}

export default Home;
