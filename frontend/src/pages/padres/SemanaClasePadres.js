import { useParams } from "react-router-dom";

function SemanaClasePadres() {
  const { semana } = useParams();

  return (
    <div>
      <h2>Semana {semana}</h2>
      <p>Contenido publicado por el líder.</p>
    </div>
  );
}

export default SemanaClasePadres;
