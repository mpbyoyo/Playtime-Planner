import React from "react";
import GroupedPlanner from "../Components/GroupedPlanner";
import NavBar from "../Components/NavBar";
import { useNavigate } from "react-router-dom";
import { stateContext } from "../Components/App";

const GroupedPlannerPage = () => {
  const { user } = React.useContext(stateContext);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!user) navigate("/");
  }, []);
  return (
    <div className="GroupedPlannerPage">
      <NavBar />
      <GroupedPlanner />
    </div>
  );
};

export default GroupedPlannerPage;
