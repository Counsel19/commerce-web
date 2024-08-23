import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { fetchAllCartItems } from "../services/cartService";
import CartList from "../components/CartList";
import { cartActionType, CartContext } from "../context/CartContext";
import OrderSummary from "../components/OrderSummary";

const Cart = () => {
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
        console.log(error)
        toast.error(error.response?.data?.msg || error.message);
      }
    };

    getData();
  }, []);

  return <div className="grid grid-cols-[3fr_2fr] gap-20">
    <CartList />
    <OrderSummary />
  </div>;
};

export default Cart;
