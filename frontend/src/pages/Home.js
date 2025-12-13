import { useParams } from "react-router-dom";

function Home() {
  const { rol } = useParams();

  return (
    <div style={styles.pageContent}>
      <h1 style={styles.title}>Versículo del Día</h1>

      <div style={styles.verseContainer}>
        <p style={styles.verseText}>
          "Porque de tal manera amó Dios al mundo..."
          <br />- Juan 3:16
        </p>
      </div>

      {rol === "lideres" && (
        <p>📋 Aquí podrás registrar asistencia y gestionar clases.</p>
      )}

      {rol === "padres" && (
        <p>👨‍👩‍👧 Aquí podrás ver la asistencia de tus hijos.</p>
      )}
    </div>
  );
}

const styles = {
  pageContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  verseContainer: {
    backgroundColor: "#333",
    color: "white",
    borderRadius: "12px",
    padding: "10px 20px",
    width: "70%",
    marginTop: "10px",
  },
  verseText: {
    fontFamily: "Georgia, serif",
    lineHeight: "1.5",
  },
};

export default Home;
