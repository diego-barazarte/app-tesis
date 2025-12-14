import { Link, useParams } from "react-router-dom";

function Sidebar() {
  const { rol } = useParams();

  if (!rol) return null;

  const inicioPath =
    rol === "padres" ? `/${rol}/home-padres` : `/${rol}/home`;

  return (
    <div style={styles.sidebar}>
      <h3>{rol === "lideres" ? "Líder" : "Padre"}</h3>

      <Link to={inicioPath} style={styles.link}>
        Inicio
      </Link>

      {rol === "lideres" && (
        <Link to={`/${rol}/asistencia`} style={styles.link}>
          Tomar asistencia
        </Link>
      )}

      {rol === "padres" && (
        <Link to={`/${rol}/registro-hijo`} style={styles.link}>
          Registrar hijo
        </Link>
      )}

      <Link to={`/${rol}/profile`} style={styles.link}>
        Perfil
      </Link>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "15%",
    backgroundColor: "#222",
    color: "white",
    padding: "20px",
    height: "100vh",
  },
  link: {
    display: "block",
    color: "white",
    textDecoration: "none",
    margin: "10px 0",
  },
};

export default Sidebar;
