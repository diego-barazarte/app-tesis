import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Sidebar from "./components/Sidebar";

function Layout() {
  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.content}>
        <Routes>
          <Route path="home/:rol" element={<Home />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Pantalla inicial (sin sidebar) */}
        <Route path="/" element={<Login />} />

        {/* App interna (con sidebar) */}
        <Route path="/*" element={<Layout />} />
      </Routes>
    </Router>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: "20px",
    marginLeft: "15%",
    overflowY: "auto",
  },
};

export default App;
