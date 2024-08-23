import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { userActionType, UserContext } from "../context/UserContext";
import { TbLogout } from "react-icons/tb";
import { FiShoppingCart } from "react-icons/fi";
import { CartContext } from "../context/CartContext";
import Fuse from "fuse.js";
import { actionType, ProductContext } from "../context/ProductContext";

const Navbar = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(UserContext);
  const { cartState } = useContext(CartContext);
  const [search, setSearch] = useState("");
  const {
    state: { products },
    dispatch: dispatchProduct,
  } = useContext(ProductContext);

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

  useEffect(() => {
    if (search.length === 0) {
      dispatchProduct({
        type: actionType.SEARCH_PRODUCTS,
        payload: null,
      });
    }
  }, [search]);

  const options = {
    includeScore: true,
    includeMatches: true,
    threshold: 0.2,
    keys: ["name"],
  };

  const handleSearch = () => {
    if (search.length <= 2) return;

    const fuse = new Fuse(products, options);

    const results = fuse.search(search);

    const searchResult = results.map((result) => result.item);

    dispatchProduct({
      type: actionType.SEARCH_PRODUCTS,
      payload: searchResult,
    });
  };

  return (
    <div className="flex p-8 bg-slate-200 justify-between items-center">
      <Link to="/" className="font-bold text-3xl">
        Logo
      </Link>

      <div className="flex gap-2 items-center">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Products Here"
          className="p-3 rounded-md border min-w-[300px] h-[50px]"
        />
        <button
          onClick={handleSearch}
          className="h-[50px] w-[100px] bg-green-500 flex justify-center items-center gap-2 disabled:bg-green-200 text-white rounded-md  "
        >
          Search
        </button>
      </div>

      {user ? (
        <div className="flex gap-4 items-center">
          <NavLink to={"/cart"}>
            <div className="relative">
              <span className="absolute -top-3 -right-3 w-6 h-6 grid place-content-center bg-green-500 text-white rounded-full">
                {cartState.numOfCart}
              </span>
              <FiShoppingCart size={23} />
            </div>
          </NavLink>
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
