import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DetalleNino() {
  const { id } = useParams();
  const [nino, setNino] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/ninos/${id}`)
      .then(res => res.json())
      .then(data => setNino(data));
  }, [id]);

  if (!nino) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Detalle del niño</h2>

      <p><strong>Nombres:</strong> {nino.nombres}</p>
      <p><strong>Apellidos:</strong> {nino.apellidos}</p>
      <p><strong>Fecha de nacimiento:</strong> {nino.fecha_nacimiento}</p>
      <p><strong>Género:</strong> {nino.genero}</p>

      <hr />

      <p><strong>Representante:</strong> {nino.nombre_representante}</p>
      <p><strong>Teléfono:</strong> {nino.telefono}</p>
      <p><strong>Email:</strong> {nino.email || "No registrado"}</p>

      <hr />

      <p><strong>Observaciones médicas:</strong></p>
      <p>{nino.observaciones || "Ninguna"}</p>
    </div>
  );
}

export default DetalleNino;
