import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const { pathname } = useLocation();

  const esLider = pathname.startsWith("/lideres");
  const esPadre = pathname.startsWith("/padres");

  if (!esLider && !esPadre) return null;

  return (
    <div style={styles.sidebar}>
      <h3>{esLider ? "Líder" : "Padre"}</h3>

      {esLider && (
        <>
          <Link to="/lideres/home" style={styles.link}>
            Inicio
          </Link>

          <Link to="/lideres/asistencia" style={styles.link}>
            Asistencia
          </Link>

          <Link to="/lideres/clases" style={styles.link}>
            Clases
          </Link>
        </>
      )}

      {esPadre && (
        <>
          <Link to="/padres/home-padres" style={styles.link}>
            Inicio
          </Link>

          <Link to="/padres/clases" style={styles.link}>
            Clases
          </Link>

          <Link to="/padres/registro-hijo" style={styles.link}>
            Registrar hijo
          </Link>
        </>
      )}
    </div>
  );
}

const SIDEBAR_WIDTH = 260;

const styles = {
  sidebar: {
    width: SIDEBAR_WIDTH,
    backgroundColor: "#222",
    color: "white",
    padding: "20px",
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    boxSizing: "border-box",
  },
  link: {
    display: "block",
    color: "white",
    textDecoration: "none",
    margin: "10px 0",
  },
};


export default Sidebar;
