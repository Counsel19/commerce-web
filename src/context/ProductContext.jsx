/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";

export const ProductContext = createContext();

const initialState = {
  products: null,
  numOfProducts: 0,
};

export const actionType = {
  SAVE_PRODUCTS: "SAVE_PRODUCTS",
};

const reducer = (state, action) => {
  if (action?.type === actionType.SAVE_PRODUCTS) {
    return { ...state, ...action.payload };
  } else {
    return state;
  }
};

const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
