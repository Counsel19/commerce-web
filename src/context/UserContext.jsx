/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";

export const UserContext = createContext();

const initialState = JSON.parse(sessionStorage.getItem("userDetails")) || {
  user: null,
  token: null,
};

export const userActionType = {
  SAVE_USER: "SAVE_USER",
};

const reducer = (state, action) => {
  if (action?.type === userActionType.SAVE_USER) {
    return { ...state, ...action.payload };
  } else {
    return state;
  }
};

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
