import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="space-y-8">
      <Navbar />
      <div className="px-12">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
