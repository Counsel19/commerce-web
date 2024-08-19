import axios from "axios";

export const fetchAllProducts = async () => {
  const response = await axios.get("https://shopit-segr.onrender.com/api/products");
  return response.data;
};

