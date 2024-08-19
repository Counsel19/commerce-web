import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { userActionType, UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

const Login = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { dispatch } = useContext(UserContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserInput({ ...userInput, [name]: value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      if (!userInput.password || !userInput.email) {
        return toast.error("Please Enter All Fields");
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/login`,
        userInput
      );
      dispatch({ type: userActionType.SAVE_USER, payload: response.data });
      sessionStorage.setItem("userDetails", JSON.stringify(response.data));
      toast.success("Login  Success");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[50%] border rounded-lg shadow-md mx-auto p-8">
      <h3 className="text-2xl mb-12 ">Welcome! Kindly Login</h3>

      <form onSubmit={handleLogin} className="space-y-8">
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
          value={userInput.password}
          onChange={handleChange}
          type="password"
          className="p-3 rounded-md border w-full h-[50px]"
        />

        <button
          disabled={isLoading}
          className="h-[50px] w-full bg-green-500 flex justify-center items-center gap-2 disabled:bg-green-200 text-white rounded-md  "
        >
          Login {isLoading && <TailSpin width={20} />}
        </button>
      </form>
    </div>
  );
};

export default Login;
