import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Sidebar from "./components/Sidebar";
import Asistencia from "./pages/Asistencia";
import HomePadres from "./pages/HomePadres";
import RegistroHijo from "./pages/RegistroHijo";


function Layout() {
  return (
    <div style={styles.container}>
      <Sidebar />

      <div style={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/:rol" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="home-padres" element={<HomePadres />} />
          <Route path="registro-hijo" element={<RegistroHijo />} />
          <Route path="asistencia" element={<Asistencia />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        
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
    flex: 1,
    padding: "20px",
    overflowY: "auto",
  },
};

export default App;
