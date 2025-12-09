import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <ul style={styles.list}>
        <li style={styles.listItem}>
          <Link to="/" style={styles.link}>Inicio</Link>
        </li>
        <li style={styles.listItem}>
          <Link to="/profile" style={styles.link}>Perfil</Link>
        </li>
      </ul>
    </div>
  );
}

const styles = {
  sidebar: {
    width: '15%',
    backgroundColor: '#333',
    color: 'white',
    paddingTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    position: 'fixed',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    margin: '20px 0',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
    padding: '10px 20px',
    display: 'block',
    textAlign: 'center',
    width: '100%',
    borderRadius: '4px',
    transition: 'background 0.3s',
  },
};

export default Sidebar;
