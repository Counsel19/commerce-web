import { useContext, useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { fetchAllCategories } from "../services/categoryService";
import { toast } from "react-toastify";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const AddProduct = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    desc: "",
    category: "",
    actualPrice: "",
    sellingPrice: "",
    images: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [categoryList, setCategoryList] = useState(null);
  const {
    state: { token },
  } = useContext(UserContext);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchAllCategories();
        setCategoryList(response.categories);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setProductDetails({ ...productDetails, [name]: value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      setIsLoading(true);
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/products`,
        productDetails,
        {
          headers,
        }
      );

      toast.success("Products Added Successfully");
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-[50%] border rounded-lg shadow-md mx-auto p-8">
      <h3 className="text-2xl mb-12 ">Add New Product Here!</h3>

      <form onSubmit={handleAddProduct} className="space-y-8">
        <input
          name="name"
          placeholder="Product Name"
          value={productDetails.name}
          onChange={handleChange}
          className="p-3 rounded-md border w-full h-[50px]"
        />
        <textarea
          name="desc"
          placeholder="Product Description"
          value={productDetails.desc}
          onChange={handleChange}
          type="text"
          className="p-3 rounded-md border w-full h-[200px]"
        />

        <select
          name="category"
          value={productDetails.category}
          onChange={handleChange}
          className="p-3 rounded-md border w-full h-[50px]"
        >
          {categoryList ? (
            categoryList.map((item) => (
              <option value={item._id} key={item._id}>
                {item.name}
              </option>
            ))
          ) : (
            <TailSpin width={30} />
          )}
        </select>

        <div className="grid grid-cols-2 gap-4">
          <input
            name="actualPrice"
            placeholder="Actual Price"
            value={productDetails.actualPrice}
            onChange={handleChange}
            className="p-3 rounded-md border w-full h-[50px]"
          />
          <input
            name="sellingPrice"
            placeholder="Selling Price"
            value={productDetails.sellingPrice}
            onChange={handleChange}
            className="p-3 rounded-md border w-full h-[50px]"
          />
        </div>

        <input
          name="images"
          placeholder="Image URL"
          value={productDetails.images}
          onChange={handleChange}
          className="p-3 rounded-md border w-full h-[50px]"
        />

        <button
          disabled={isLoading}
          className="h-[50px] w-full bg-green-500 flex justify-center items-center gap-2 disabled:bg-green-200 text-white rounded-md  "
        >
          Add Product {isLoading && <TailSpin width={20} />}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
