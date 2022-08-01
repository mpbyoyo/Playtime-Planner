import React from "react";
import GroupedPlanner from "../Components/GroupedPlanner";
import NavBar from "../Components/NavBar";

const GroupedPlannerPage = () => {
  return (
    <div className="GroupedPlannerPage">
      <NavBar />
      <GroupedPlanner />
    </div>
  );
};

export default GroupedPlannerPage;
