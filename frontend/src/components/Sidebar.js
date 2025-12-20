import { Link, NavLink, useLocation } from "react-router-dom";

const SIDEBAR_WIDTH = 260;

function Sidebar() {
  const { pathname } = useLocation();

  const esLider = pathname.startsWith("/lideres");
  const esPadre = pathname.startsWith("/padres");

  if (!esLider && !esPadre) return null;

  return (
    <aside style={styles.sidebar}>
      <h3 style={styles.title}>{esLider ? "Líder" : "Padre"}</h3>

      {esLider && (
        <>
          <NavLink to="/lideres/home" style={styles.link}>
            Inicio
          </NavLink>

          <NavLink to="/lideres/clases" style={styles.link}>
            Clases
          </NavLink>

          {/* NUEVA OPCIÓN */}
          <NavLink to="/lideres/ninos" style={styles.link}>
            Estudiantes
          </NavLink>

          <NavLink to="/lideres/asistencia" style={styles.link}>
            Asistencia
          </NavLink>
        </>
      )}

      {esPadre && (
        <>
          <NavLink to="/padres/home-padres" style={styles.link}>
            Inicio
          </NavLink>

          <NavLink to="/padres/clases" style={styles.link}>
            Clases
          </NavLink>

          <NavLink to="/padres/registro-hijo" style={styles.link}>
            Registrar hijo
          </NavLink>
        </>
      )}
    </aside>
  );
}

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
  title: {
    marginBottom: "20px",
  },
  link: {
    display: "block",
    color: "white",
    textDecoration: "none",
    margin: "10px 0",
    padding: "8px",
    borderRadius: "4px",
  },
};

export default Sidebar;
export { SIDEBAR_WIDTH };
