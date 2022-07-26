import React, { useState, useRef } from "react";
import Plan from "./Plan";

const Planner = () => {
  const [mousePos, setMousePos] = useState([0, 0]);
  const [topLeft, setTopLeft] = useState([0, 0]);
  const [bottomRight, setBottomRight] = useState([0, 0]);
  const [plans, setPlans] = useState([]);
  const plannerRef = useRef();

  const handleMouseMove = (e) => {
    const bounds = e.target.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    const w = plannerRef.current.clientWidth;
    const h = plannerRef.current.clientHeight;
    const relX = (x / w) * 100;
    const relY = (y / h) * 100;
    setMousePos([relX, relY]);
  };

  const handleMouseDown = () => {
    const pos = mousePos;
    setTopLeft(pos);
  };

  const handleMouseUp = () => {
    const pos = mousePos;
    setBottomRight(pos);

    const coords = convertToCoords(pos);
    const tl = topLeft;
    const br = pos;
    const tlCoords = convertToCoords(tl);
    const brCoords = convertToCoords(br);
    // console.log(tlCoords, brCoords);

    const smallerX = tlCoords[0] < brCoords[0] ? tlCoords[0] : brCoords[0];
    const smallerY = tlCoords[1] < brCoords[1] ? tlCoords[1] : brCoords[1];
    // console.log([smallerX, smallerY]);

    const plannerWidth = plannerRef.current.clientWidth;
    const plannerHeight = plannerRef.current.clientHeight;
    // console.log([plannerWidth, plannerHeight]);

    const newPlan = {
      width: Math.abs(tlCoords[0] - brCoords[0]),
      height: Math.abs(tlCoords[1] - brCoords[1]),
      left: (smallerX / plannerWidth) * 100,
      top: (smallerY / plannerHeight) * 100,
    };

    setPlans((v) => [...v, newPlan]);
  };

  const convertToCoords = (pos) => {
    const x = pos[0];
    const y = pos[1];
    const w = plannerRef.current.clientWidth;
    const h = plannerRef.current.clientHeight;
    const trueX = (x / 100) * w;
    const trueY = (y / 100) * h;
    const trueCoords = [trueX, trueY];
    return trueCoords;
  };

  return (
    <div className="Planner absolute h-screen w-screen">
      <div
        className="planner-card card bg-base-300 h-5/6 w-10/12 absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        ref={plannerRef}
      >
        <div className="card-body">
          {plans.map((plan, i) => (
            <Plan key={i} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Planner;
