import React from "react";
import NavBar from "../Components/NavBar";
import FriendPlanner from "../Components/FriendPlanner";
import { useNavigate } from "react-router-dom";
import { stateContext } from "../Components/App";

const FriendPlannerPage = () => {
  const { user } = React.useContext(stateContext);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!user) navigate("/");
  }, []);

  return (
    <div className="FriendPlannerPage">
      <NavBar />
      <FriendPlanner />
    </div>
  );
};

export default FriendPlannerPage;
