import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const seleccionarRol = (rol) => {
    if (rol === "padres") {
      navigate("/padres/home-padres");
    } else {
      navigate("/lideres/home");
    }
  };
  

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Tierra Prometida</h1>

      <button onClick={() => seleccionarRol("padres")}>
        Padres
      </button>

      <br /><br />

      <button onClick={() => seleccionarRol("lideres")}>
        Líderes
      </button>
    </div>
  );
}

export default Login;
