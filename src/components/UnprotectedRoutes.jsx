import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const UnprotectedRoutes = () => {
  const {
    state: { user },
  } = useContext(UserContext);
  return !user ? <Outlet /> : <Navigate to={"/"} />;
};

export default UnprotectedRoutes;
