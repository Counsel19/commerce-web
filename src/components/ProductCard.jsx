import { FiShoppingCart } from "react-icons/fi";
import { formatToNaira } from "../utils/formatToNiara";
import { toast } from "react-toastify";
import { addToCart } from "../services/cartService";
import { useContext, useState } from "react";
import { cartActionType, CartContext } from "../context/CartContext";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const ProductCard = ({ _id, name, sellingPrice, actualPrice, image }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { dispatchCartState } = useContext(CartContext);
  const handleAddToCart = async () => {
    try {
      setIsLoading(true);
      const cartItems = await addToCart(_id);
      dispatchCartState({ type: cartActionType.SAVE_CART, payload: cartItems });
      toast.success("Item Added to Cart");
    } catch (error) {
      toast.error(error.response?.data?.msg || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Link
      to={`/${_id}`}
      className="h-[20rem]  text-ellipsis p-4 flex  flex-col space-y-6 border rounded-xl hover:shadow-md"
    >
      <img src={image} alt={name} className="object-contain h-[12rem] " />

      <div className="space-y-1 ">
        <h5 className="font-bold  truncate w-[100%]">{name}</h5>

        <div className="flex justify-between items-center">
          <span className="flex">{formatToNaira.format(sellingPrice)}</span>
          <button
            disabled={isLoading}
            onClick={handleAddToCart}
            className="border rounded-lg h-[27px] w-[27px] p-1 grid place-content-center"
          >
            {isLoading ? <TailSpin width={18} /> : <FiShoppingCart size={18} />}
          </button>
        </div>
        <span className="line-through flex">
          {formatToNaira.format(actualPrice)}
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
