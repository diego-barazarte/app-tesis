import { Link, useParams } from "react-router-dom";

function Sidebar() {
  const { rol } = useParams();

  if (rol !== "lideres") return null;

  return (
    <div style={styles.sidebar}>
      <h3>Líder</h3>

      <Link to={`/${rol}/home`} style={styles.link}>
        Inicio
      </Link>

      <Link to={`/${rol}/asistencia`} style={styles.link}>
        Tomar asistencia
      </Link>

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
    height: "100vh",   // ocupa toda la altura
  },
  link: {
    display: "block",
    color: "white",
    textDecoration: "none",
    margin: "10px 0",
  },
};

export default Sidebar;
