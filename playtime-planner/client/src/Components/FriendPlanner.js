import React from "react";
import PlannerComponent from "./PlannerComponent";

const FriendPlanner = () => {
  return (
    <div className="FriendPlanner">
      <PlannerComponent group={false} friend={true} />
    </div>
  );
};

export default FriendPlanner;
