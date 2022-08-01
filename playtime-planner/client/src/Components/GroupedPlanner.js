import React from "react";
import PlannerComponent from "./PlannerComponent";

const GroupedPlanner = () => {
  return (
    <div className="GroupedPlanner">
      <PlannerComponent group={true} friend={false} />
    </div>
  );
};

export default GroupedPlanner;
