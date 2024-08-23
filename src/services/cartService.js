import axios from "axios";

export const fetchAllCartItems = async () => {
  const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userDetails.token}`,
  };

  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/carts`,

    {
      headers,
    }
  );

  return response.data;
};

export const addToCart = async (productId) => {
  const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userDetails.token}`,
  };

  await axios.post(
    `${import.meta.env.VITE_BASE_URL}/carts`,
    {
      productId,
    },
    {
      headers,
    }
  );
  const response = await fetchAllCartItems();

  return response;
};
