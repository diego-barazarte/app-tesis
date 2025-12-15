import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const SIDEBAR_WIDTH = 260;

function Layout() {
  return (
    <>
      <Sidebar />

      <div style={styles.content}>
        <Outlet />
      </div>
    </>
  );
}

const styles = {
  content: {
    marginLeft: SIDEBAR_WIDTH,
    padding: "20px",
    minHeight: "100vh",
    boxSizing: "border-box",
  },
};

export default Layout;
