import axios from "axios";

export const fetchAllCategories = async () => {
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/categories`);
  return response.data;
};

