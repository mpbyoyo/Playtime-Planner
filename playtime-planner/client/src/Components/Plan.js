import React, { useRef } from "react";

const Plan = ({ plan }) => {
  const { width, height, left, top } = plan;
  const planRef = useRef();

  React.useEffect(() => {
    planRef.current.style.width = `${width}px`;
    planRef.current.style.height = `${height}px`;
    planRef.current.style.left = `${left}%`;
    planRef.current.style.top = `${top}%`;
  }, []);

  const handleEdit = () => {};

  return (
    <div
      className="Plan absolute bg-red-200 z-50 hover:scale-105 transition-all"
      ref={planRef}
      onClick={handleEdit}
    >
      <div></div>
    </div>
  );
};

export default Plan;
