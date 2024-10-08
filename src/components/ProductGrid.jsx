import { useContext, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";
import { actionType, ProductContext } from "../context/ProductContext";
import { fetchAllProducts } from "../services/productService";

const ProductGrid = () => {
  const [allProducts, setAllProducts] = useState(null);
  const {
    state: { products, searchResult },
    dispatch,
  } = useContext(ProductContext);

  useEffect(() => {
    const getData = async () => {
      try {
        // const response = await fetch("http://localhost:5000/api/products", {
        //   method: "GET",
        // });
        // if (response.ok) {
        //   const data = await response.json();
        //   setAllProducts(data);
        // } else {
        //   throw new Error(response.statusText);
        // }
        const response = await fetchAllProducts();
        dispatch({ type: actionType.SAVE_PRODUCTS, payload: response });
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (!searchResult) {
      setAllProducts(products);
    } else {
      setAllProducts(searchResult);
    }
  }, [products, searchResult]);

  return (
    <div className="grid grid-cols-4 gap-12">
      {allProducts ? (
        allProducts.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))
      ) : (
        <TailSpin />
      )}
    </div>
  );
};

export default ProductGrid;
