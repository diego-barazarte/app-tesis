function Home() {
    return (
      <div style={styles.pageContent}>
        <h1 style={styles.title}>Versículo del Día</h1>
        <div style={styles.verseContainer}>
          <p style={styles.verseText}>
            "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito,
            para que todo aquel que en él cree, no se pierda, mas tenga vida eterna."
            <br />
            - Juan 3:16
          </p>
        </div>
      </div>
    );
  }
  
  const styles = {
    pageContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      height: '100%',
      marginLeft: '2%', // Acercamos más a la izquierda
    },
    title: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    verseContainer: {
      backgroundColor: '#333',
      color: 'white',
      borderRadius: '12px',
      padding: '10px 20px',
      width: '70%',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
      textAlign: 'left',
      fontSize: '16px',
      marginTop: '10px',
    },
    verseText: {
      fontFamily: "'Georgia', serif",
      fontSize: '16px',
      lineHeight: '1.5',
    }
  };
  
  export default Home;
  