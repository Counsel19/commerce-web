import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import ProductContextProvider from "./context/ProductContext";
import UserContextProvider from "./context/UserContext";
import ProtectedRoutes from "./components/ProtectedRoutes";
import UnprotectedRoutes from "./components/UnprotectedRoutes";
import AddProduct from "./pages/AddProduct";

function App() {
  return (
    <ProductContextProvider>
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route element={<ProtectedRoutes />}>
                <Route index element={<Home />} />
                <Route path="add-products" element={<AddProduct />} />
              </Route>
              <Route element={<UnprotectedRoutes />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </UserContextProvider>
    </ProductContextProvider>
  );
}

export default App;
