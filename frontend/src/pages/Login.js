import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Tierra Prometida</h1>

      <button onClick={() => navigate("/padres/home-padres")}>
        Padres
      </button>

      <br /><br />

      <button onClick={() => navigate("/lideres/home")}>
        Líderes
      </button>
    </div>
  );
}

export default Login;
