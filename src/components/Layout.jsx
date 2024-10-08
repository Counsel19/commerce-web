import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useContext, useEffect } from "react";
import { cartActionType, CartContext } from "../context/CartContext";
import { fetchAllCartItems  } from "../services/cartService"
import { toast } from "react-toastify";

const Layout = () => {
  const { dispatchCartState } = useContext(CartContext);

  useEffect(() => {
    const getData = async () => {
      try {
        const cartItems = await fetchAllCartItems();
        dispatchCartState({
          type: cartActionType.SAVE_CART,
          payload: cartItems,
        });
      } catch (error) {
        toast.error(error.response?.data?.msg || error.message);
      }
    };

    getData();
  }, []);
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
