import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";
import { PaystackButton } from "react-paystack";
import OrderSummary from "../components/OrderSummary";

const CheckoutPage = () => {
  const {
    state: { user },
  } = useContext(UserContext);
  const {
    cartState: { subTotal },
  } = useContext(CartContext);

  const publicKey = import.meta.env.VITE_PAYSTACK_KEY;

  const [email, setEmail] = useState(user.email);

  const [name, setName] = useState(user.fullname);

  const [phone, setPhone] = useState("");

  const componentProps = {
    email,
    amount: subTotal * 100,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Pay Now",

    onSuccess: () =>
      toast.success("Thanks for doing business with us! Come back soon!!"),

    onClose: () => toast.warn("Wait! Don't leave :("),
  };

  return (
    <div className="grid grid-cols-[3fr_2fr] gap-10">
      <div className="">
        <form className="space-y-6">
          <div>
            <label>Nam</label>
            <input
              className="p-3 rounded-md border w-full h-[50px]"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              className="p-3 rounded-md border w-full h-[50px]"
              type="text"
              value={email}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Phone</label>

            <input
              className="p-3 rounded-md border w-full h-[50px]"
              type="text"
              value={phone}
              id="phone"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </form>
        <PaystackButton
          {...componentProps}
          className="h-[50px] mt-8 w-full bg-green-500 flex justify-center items-center gap-2 disabled:bg-green-200 text-white rounded-md  "
        />
      </div>
      <OrderSummary hideCheckoutButton />
    </div>
  );
};

export default CheckoutPage;
