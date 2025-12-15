import { useState } from "react";

function RegistroHijo() {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
  };

  if (enviado) {
    return (
      <div>
        <h2>Registro exitoso 🙌</h2>
        <p>
          Tu hijo ha sido registrado correctamente en las clases dominicales.
          Un líder se pondrá en contacto contigo si es necesario.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2>Registro de Niño – Clases Dominicales</h2>

      <form onSubmit={handleSubmit}>
        <h4>Datos del niño</h4>

        <input placeholder="Nombres del niño" required />
        <br /><br />

        <input placeholder="Apellidos del niño" required />
        <br /><br />

        <input type="date" required />
        <br /><br />

        <select required>
          <option value="">Seleccione género</option>
          <option>Masculino</option>
          <option>Femenino</option>
        </select>

        <br /><br />

        <h4>Datos del padre/madre o tutor</h4>

        <input placeholder="Nombre del representante" required />
        <br /><br />

        <input placeholder="Teléfono de contacto" required />
        <br /><br />

        <input type="email" placeholder="Correo electrónico" />
        <br /><br />

        <h4>Información adicional</h4>

        <textarea
          placeholder="Alergias, condiciones médicas, observaciones"
          rows="4"
        />

        <br /><br />

        <button type="submit">Registrar niño</button>
      </form>
    </div>
  );
}

export default RegistroHijo;
