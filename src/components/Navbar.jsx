import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { userActionType, UserContext } from "../context/UserContext";
import { TbLogout } from "react-icons/tb";

const Navbar = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(UserContext);

  const handleLogout = () => {
    sessionStorage.removeItem("userDetails");
    dispatch({
      type: userActionType.SAVE_USER,
      payload: {
        user: null,
        token: null,
      },
    });
  };

  return (
    <div className="flex p-8 bg-slate-200 justify-between items-center">
      <Link to="/" className="font-bold text-3xl">
        Logo
      </Link>

      {user ? (
        <div className="flex gap-4 items-center">
          <NavLink to={"/add-products"}>Add Products</NavLink>
          <button onClick={handleLogout} className="flex gap-1 items-center ">
            <TbLogout size={20} color="red" /> Logout
          </button>
        </div>
      ) : (
        <ul className="flex gap-4 items-center">
          <li>
            <NavLink to={"/login"}>Login</NavLink>
          </li>
          <li>
            <NavLink to={"/register"}>Register</NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
