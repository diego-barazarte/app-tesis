import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Router>
      <div style={styles.container}>
        <Sidebar />
        <div style={styles.content}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: '20px',
    marginLeft: '15%',
    overflowY: 'auto',
  }
};

export default App;
