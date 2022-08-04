import React from "react";
import PlannerComponent from "../Components/PlannerComponent";

const Planner = () => {
  return (
    <div className="Planner w-screen h-screen">
      <PlannerComponent group={false} friend={false} />
    </div>
  );
};

export default Planner;
