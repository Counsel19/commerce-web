import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { userActionType, UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    fullname: "",
  });

  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserInput({ ...userInput, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (!userInput.fullname || !userInput.email || !userInput.password) {
        return toast.error("Please Provide all Fields");
      }

      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/register`,
        userInput
      );
      const newPayload = { token: data.token, user: data.newUser };
      dispatch({ type: userActionType.SAVE_USER, payload: newPayload });
      sessionStorage.setItem("userDetails", JSON.stringify(newPayload));
      toast.success("Registration  Success");
      navigate("/");
    } catch (error) {
      console.log(error.response.data.msg);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="w-[50%] border rounded-lg shadow-md mx-auto p-8">
      <h3 className="text-2xl mb-12 ">Welcome! Kindly Register</h3>

      <form onSubmit={handleRegister} action="" className="space-y-8">
        <input
          name="fullname"
          placeholder="Name"
          value={userInput.fullname}
          onChange={handleChange}
          className="p-3 rounded-md border w-full h-[50px]"
        />
        <input
          name="email"
          placeholder="Email"
          value={userInput.email}
          onChange={handleChange}
          className="p-3 rounded-md border w-full h-[50px]"
        />
        <input
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={userInput.password}
          type="password"
          className="p-3 rounded-md border w-full h-[50px]"
        />

        <button className="h-[50px] w-full bg-green-500 text-white rounded-md grid place-content-center">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
