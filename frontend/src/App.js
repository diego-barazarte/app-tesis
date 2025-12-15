import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";

// Login
import Login from "./pages/Login";

// Líderes
import HomeLider from "./pages/líderes/HomeLider";
import Asistencia from "./pages/líderes/Asistencia";
import ClasesLider from "./pages/líderes/ClasesLider";
import ClaseDetalleLider from "./pages/líderes/ClaseDetalleLider";
import SemanaClaseLider from "./pages/líderes/SemanaClaseLider";

// Padres
import HomePadres from "./pages/padres/HomePadres";
import ClasesPadres from "./pages/padres/ClasesPadres";
import ClaseDetallePadres from "./pages/padres/ClaseDetallePadres";
import SemanaClasePadres from "./pages/padres/SemanaClasePadres";
import RegistroHijo from "./pages/padres/RegistroHijo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login SIN sidebar */}
        <Route path="/" element={<Login />} />


        <Route path="/lideres" element={<Layout />}>
  <Route path="home" element={<HomeLider />} />
  <Route path="asistencia" element={<Asistencia />} />
  <Route path="clases" element={<ClasesLider />} />
  <Route path="clases/:id" element={<ClaseDetalleLider />} />
  <Route
    path="clases/:id/semana/:semana"
    element={<SemanaClaseLider />}
  />
</Route>

<Route path="/padres" element={<Layout />}>
  <Route path="home-padres" element={<HomePadres />} />
  <Route path="clases" element={<ClasesPadres />} />
  <Route path="clases/:id" element={<ClaseDetallePadres />} />
  <Route
    path="clases/:id/semana/:semana"
    element={<SemanaClasePadres />}
  />
  <Route path="registro-hijo" element={<RegistroHijo />} />
</Route>


     
      </Routes>
    </BrowserRouter>
  );
}

export default App;
