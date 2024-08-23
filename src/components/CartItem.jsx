/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { formatToNaira } from "../utils/formatToNiara";
import { toast } from "react-toastify";
import axios from "axios";
import { fetchAllCartItems } from "../services/cartService";
import { cartActionType, CartContext } from "../context/CartContext";
import { TailSpin } from "react-loader-spinner";
import { UserContext } from "../context/UserContext";
import { FiTrash } from "react-icons/fi";
import { motion } from "framer-motion";

// have a state to manahe the qunatuty on the UI
// Increase: increase the state on the UI, vthen Increase from the db

const CartItem = ({ _id, productInfo, quantity }) => {
  const { image, name, sellingPrice, actualPrice } = productInfo;
  const [qunty, setQunty] = useState(quantity);
  const { dispatchCartState } = useContext(CartContext);
  const {
    state: { token },
  } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const updateCartQuantity = async () => {
      try {
        setIsLoading(true);
        await axios.patch(
          `${import.meta.env.VITE_BASE_URL}/carts/${_id}`,
          {
            quantity: qunty,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const cartItems = await fetchAllCartItems();

        dispatchCartState({
          type: cartActionType.SAVE_CART,
          payload: cartItems,
        });
      } catch (error) {
        toast.error(error.reponse?.data?.msg || error.message);
      } finally {
        setIsLoading(false);
      }
    };

    updateCartQuantity();
  }, [qunty]);

  const handleDelateCartItem = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/carts/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const cartItems = await fetchAllCartItems();

      dispatchCartState({
        type: cartActionType.SAVE_CART,
        payload: cartItems,
      });

      toast.success("Cart Items Deleted");
    } catch (error) {
      toast.error(error.reponse?.data?.msg || error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x:  0 }}
      transition={{ duration: 2.5 }}
      className="grid grid-cols-[1fr_3fr_0.5fr] border rounded-md p-2"
    >
      <div>
        <img
          className="w-[100px] h-[100px] object-cover"
          src={image}
          alt={name}
        />
      </div>

      <div className="space-y-3">
        <h4 className="font-bold">{name}</h4>
        <div className="space-x-4">
          <span className="line-through">
            {formatToNaira.format(actualPrice)}
          </span>
          <span>{formatToNaira.format(sellingPrice)}</span>
        </div>
        {isLoading ? (
          <div>
            <TailSpin height={20} width={20} />
          </div>
        ) : (
          <div className="flex">
            <button
              onClick={() => qunty > 1 && setQunty(qunty - 1)}
              className="border w-[30px] h-[30px] p-1 rounded-md"
            >
              -
            </button>
            <span className="bg-gray-200 flex w-[30px] h-[30px] p-1 rounded-md">
              {qunty}
            </span>
            <button
              onClick={() => setQunty(qunty + 1)}
              className="border p-1 w-[30px] h-[30px] rounded-md"
            >
              +
            </button>
          </div>
        )}
      </div>
      <div className="flex items-center">
        <button
          onClick={handleDelateCartItem}
          className="grid place-content-center p-2 w-fit h-fit rounded-md border border-rose-500"
        >
          <FiTrash className="text-rose-500" />
        </button>
      </div>
    </motion.div>
  );
};

export default CartItem;
