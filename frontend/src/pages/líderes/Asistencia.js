import { useState } from "react";
import { useNavigate } from "react-router-dom";

const niñosMock = [
  "Mateo Rodríguez",
  "Sofía Paredes",
  "Juan Pablo Vera",
  "Emily Zambrano",
  "Daniel Torres",
  "Valentina Cedeño",
  "Sebastián López",
  "Isabella Guerrero",
  "Nicolás Andrade",
  "Camila Ríos",
  "Samuel Ayala",
  "Martina Bravo",
];

function Asistencia() {
  const navigate = useNavigate();


  const [asistencia, setAsistencia] = useState(
    niñosMock.map((nombre) => ({
      nombre,
      presente: false,
    }))
  );

 
  const toggleAsistencia = (index) => {
    const copia = [...asistencia];
    copia[index].presente = !copia[index].presente;
    setAsistencia(copia);
  };


  const guardarAsistencia = () => {
    console.log("Asistencia guardada:", asistencia);
    navigate(-1);
  };

  return (
    <div>
      <h2>Tomar asistencia</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Presente</th>
          </tr>
        </thead>
        <tbody>
          {asistencia.map((niño, index) => (
            <tr key={index}>
              <td>{niño.nombre}</td>
              <td style={{ textAlign: "center" }}>
                <input
                  type="checkbox"
                  checked={niño.presente} 
                  onChange={() => toggleAsistencia(index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <button onClick={guardarAsistencia}>Guardar asistencia</button>
      <button onClick={() => navigate(-1)} style={{ marginLeft: "10px" }}>
        Volver
      </button>
    </div>
  );
}

export default Asistencia;
