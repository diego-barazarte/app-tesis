import { useState } from "react";

function RegistroHijo() {
  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    fecha_nacimiento: "",
    genero: "",
    nombre_representante: "",
    telefono: "",
    email: "",
    observaciones: "",
    clase_id: 1
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/ninos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (res.ok) setEnviado(true);
  };

  if (enviado) {
    return (
      <div>
        <h2>Registro exitoso 🙌</h2>
        <p>Tu hijo ha sido registrado correctamente en la clase dominical.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "600px" }}>
      <h2>Registro de Niño – Clases Dominicales</h2>

      <form onSubmit={handleSubmit}>

        <h3>📘 Datos del niño</h3>

        <label>Nombres</label><br />
        <input
          name="nombres"
          placeholder="Ej: Juan Pablo"
          maxLength={100}
          required
          onChange={handleChange}
        /><br /><br />

        <label>Apellidos</label><br />
        <input
          name="apellidos"
          placeholder="Ej: Pérez Gómez"
          maxLength={100}
          required
          onChange={handleChange}
        /><br /><br />

        <label>Fecha de nacimiento</label><br />
        <input
          type="date"
          name="fecha_nacimiento"
          required
          onChange={handleChange}
        /><br /><br />

        <label>Género</label><br />
        <select
          name="genero"
          required
          onChange={handleChange}
        >
          <option value="">Seleccione una opción</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
        </select>

        <br /><br />

        <h3>👨‍👩‍👦 Datos del representante</h3>

        <label>Nombre completo</label><br />
        <input
          name="nombre_representante"
          placeholder="Nombre del padre, madre o tutor"
          maxLength={150}
          required
          onChange={handleChange}
        /><br /><br />

        <label>Teléfono de contacto</label><br />
        <input
          name="telefono"
          placeholder="Ej: 0991234567"
          maxLength={20}
          required
          onChange={handleChange}
        /><br /><br />

        <label>Correo electrónico (opcional)</label><br />
        <input
          type="email"
          name="email"
          placeholder="correo@ejemplo.com"
          maxLength={150}
          onChange={handleChange}
        />

        <br /><br />

        <h3>📝 Información adicional</h3>

        <label>Alergias, condiciones médicas u observaciones</label><br />
        <textarea
          name="observaciones"
          placeholder="Ej: alérgico a la maní, asma, etc."
          rows="4"
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">Registrar niño</button>
      </form>
    </div>
  );
}

export default RegistroHijo;
