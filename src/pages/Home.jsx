import { useContext } from "react";
import ProductGrid from "../components/ProductGrid";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const { state } = useContext(UserContext);

  return (
    <div>
      <h2 className="text-[26px]"> Home</h2>
      {state.user ? (
        <h4 className="mb-12">Welcome {state.user.fullname} </h4>
      ) : (
        <h4 className="mb-12">Welcome Guest </h4>
      )}
      <ProductGrid />
    </div>
  );
};

export default Home;
