import React, { useRef, useState } from "react";

const Plan = ({ mouseDown, setPlanHover, style }) => {
  const [styleState, setStyleState] = useState(style);
  const planRef = useRef();

  return (
    <div
      className={`Plan absolute bg-red-200 z-50 hover:scale-105 transition-all rounded-md opacity-60 ${
        mouseDown && "pointer-events-none"
      }`}
      ref={planRef}
      style={styleState}
      onMouseEnter={() => setPlanHover(true)}
      onMouseLeave={() => setPlanHover(false)}
    >
      <div></div>
    </div>
  );
};

export default Plan;
