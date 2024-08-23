/* eslint-disable react/prop-types */
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { TailSpin } from "react-loader-spinner";
import { formatToNaira } from "../utils/formatToNiara";
import { Link } from "react-router-dom";

const OrderSummary = ({ hideCheckoutButton }) => {
  const {
    cartState: { cart, subTotal },
  } = useContext(CartContext);
  return (
    <div className="p-6 border rounded-lg shadow-md">
      <h2 className="mb-12 font-bold text-lg">Order Summary</h2>
      <div className="space-y-8">
        {cart && cart.length > 0 ? (
          cart.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-[2fr_1fr] items-center"
            >
              <div className="text-slate-600">{item.productInfo.name}</div>
              <div className="font-semibold">
                {formatToNaira.format(
                  item.quantity * item.productInfo.sellingPrice
                )}
              </div>
            </div>
          ))
        ) : cart && cart.length === 0 ? (
          <div>No Items </div>
        ) : (
          <div>
            <TailSpin />
          </div>
        )}
        <hr />

        <div className="grid grid-cols-[2fr_1fr] items-center">
          <div className="text-slate-600 font-bold">SubTotal</div>
          <div className="font-semibold">{formatToNaira.format(subTotal)}</div>
        </div>
        {!hideCheckoutButton && (
          <Link
            to={"/checkout"}
            className="h-[50px] w-full bg-green-500 flex justify-center items-center gap-2 disabled:bg-green-200 text-white rounded-md  "
          >
            Checkout
          </Link>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
