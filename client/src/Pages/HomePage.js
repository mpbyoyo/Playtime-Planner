import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Home from "../Components/Home";
import { stateContext } from "../Components/App";

const HomePage = () => {
  const { user } = React.useContext(stateContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) navigate("/");
  }, []);

  return (
    <div className="home-page">
      <NavBar />
      <Home />
    </div>
  );
};

export default HomePage;
