import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { formatToNaira } from "../utils/formatToNiara";
import { cartActionType, CartContext } from "../context/CartContext";
import { addToCart } from "../services/cartService";

const ProductDetails = () => {
  const [singleProduct, setSingleProduct] = useState(null);
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/products/${productId}`
        );
        console.log(response.data);
        setSingleProduct(response.data);
      } catch (error) {
        toast.error(error.response?.data?.msg || error.message);
      }
    };

    getData();
  }, []);

  const { dispatchCartState } = useContext(CartContext);
  const handleAddToCart = async () => {
    try {
      setIsLoading(true);
      const cartItems = await addToCart(productId);
      dispatchCartState({ type: cartActionType.SAVE_CART, payload: cartItems });
      toast.success("Item Added to Cart");
    } catch (error) {
      toast.error(error.response?.data?.msg || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {singleProduct ? (
        <div className="grid grid-cols-2 gap-10">
          <div className="w-full h-[400px] border rounded-lg overflow-hidden">
            <img
              className="w-full h-full object-contain "
              src={singleProduct.images[0]}
              alt={singleProduct.name}
            />
          </div>
          <div className="space-y-8">
            <h3 className="text-[2rem] font-semibold ">{singleProduct.name}</h3>

            <div className="space-x-4 font-semibold">
              <span className="line-through">
                {formatToNaira.format(singleProduct.actualPrice)}
              </span>
              <span>{formatToNaira.format(singleProduct.sellingPrice)}</span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={isLoading}
                className="h-[50px] w-full bg-green-500 flex justify-center items-center gap-2 disabled:bg-green-200 text-white rounded-md  "
              >
                Add to Cart {isLoading && <TailSpin width={20} />}
              </button>
              <button className="h-[50px] w-full border border-green-500 flex justify-center items-center gap-2 text-green-500 rounded-md  ">
                Buy Now
              </button>
            </div>

            <p>{singleProduct.desc}</p>
          </div>
        </div>
      ) : (
        <div>
          <TailSpin />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
