/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";

export const CartContext = createContext();

const initialState = {
  cart: null,
  numOfCart: 0,
  subTotal: 0,
};

export const cartActionType = {
  SAVE_CART: "SAVE_CART",
};

const reducer = (state, action) => {
  if (action?.type === cartActionType.SAVE_CART) {
    return { ...state, ...action.payload };
  } else {
    return state;
  }
};

const CartContextProvider = ({ children }) => {
  const [cartState, dispatchCartState] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={{ cartState, dispatchCartState }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
