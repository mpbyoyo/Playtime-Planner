import React from "react";
import NavBar from "../Components/NavBar";
import Planner from "../Components/Planner";
import { useNavigate } from "react-router-dom";
import { stateContext } from "../Components/App";

const PlannerPage = () => {
  const { user } = React.useContext(stateContext);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!user) navigate("/");
  }, []);
  return (
    <div className="PlannerPage">
      <NavBar />
      <Planner />
    </div>
  );
};

export default PlannerPage;
