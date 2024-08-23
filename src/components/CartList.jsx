import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { TailSpin } from "react-loader-spinner";
import CartItem from "./CartItem";

const CartList = () => {
  // Get all the items from the reducer state
  // check if tre  cartState is null => loading spinner
  // if is an empty array =>no Items in cart
  // map through them
  // display each on a CartItem Component
  const { cartState: { cart } } = useContext(CartContext);
  return (
    <div>
      {!cart ? (
        <div>
          <TailSpin />
        </div>
      ) : cart && cart.length === 0 ? (
        <div>No Items In Cart</div>
      ) : cart && cart.length > 0 ? (
        <div className="space-y-8">
          {cart.map((items) => (
            <CartItem key={items._id} {...items} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default CartList;
