import React, { useState, useRef } from "react";
import Plan from "./Plan";
import { stateContext } from "./App";

const PlannerComponent = () => {
  const [mousePos, setMousePos] = useState([0, 0]);
  const [topLeft, setTopLeft] = useState([0, 0]);
  const [plans, setPlans] = useState([]);
  const [mouseDown, setMouseDown] = useState(false);
  const [planHover, setPlanHover] = useState(false);
  const { user } = React.useContext(stateContext);
  const plannerRef = useRef();
  const previewRef = useRef();

  React.useEffect(() => {
    if (!mouseDown) {
      previewRef.current.style.width = "0%";
      previewRef.current.style.height = "0%";
      previewRef.current.style.left = "0%";
      previewRef.current.style.top = "0%";
    }
  }, [mouseDown]);

  React.useEffect(() => {
    setPlans([...plans, user.plans]);
  }, []);

  const roundToNearest14 = (num) => {
    return Math.round(num / 14.2857142857) * 14.2857142857;
  };

  const handleMouseMove = (e) => {
    const bounds = e.target.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    const w = plannerRef.current.clientWidth;
    const h = plannerRef.current.clientHeight;
    const relX = (x / w) * 100;
    const relY = (y / h) * 100;
    setMousePos([relX, relY]);

    if (mouseDown) {
      const previewWidth = Math.abs(relX - topLeft[0]);
      const previewHeight = Math.abs(relY - topLeft[1]);
      const previewX = relX < topLeft[0] ? relX : topLeft[0];
      const previewY = relY < topLeft[1] ? relY : topLeft[1];
      previewRef.current.style.width = `${roundToNearest14(previewWidth)}%`;
      previewRef.current.style.height = `${previewHeight}%`;
      previewRef.current.style.left = `${roundToNearest14(previewX)}%`;
      previewRef.current.style.top = `${previewY}%`;
    }
  };

  const handleMouseDown = () => {
    if (!planHover) {
      const pos = mousePos;
      setTopLeft(pos);
      setMouseDown(true);
      previewRef.current.style.top = `${pos[1]}%`;
      previewRef.current.style.left = `${pos[0]}%`;
      previewRef.current.style.width = `${roundToNearest14(pos[0])}%`;
      console.log(pos);
    }
  };

  const handleMouseUp = () => {
    if (mouseDown) {
      const pos = mousePos;
      const tl = topLeft;
      const br = pos;

      const smallerX = tl[0] < br[0] ? tl[0] : br[0];
      const smallerY = tl[1] < br[1] ? tl[1] : br[1];

      const newPlan = {
        width: roundToNearest14(Math.abs(tl[0] - br[0])) - 1,
        height: Math.abs(tl[1] - br[1]),
        left: roundToNearest14(smallerX) + 0.5,
        top: smallerY,
      };

      setPlans((v) => [...v, newPlan]);
      setMouseDown(false);
    }
  };

  const handleMouseLeave = () => {
    if (mouseDown) {
      setMouseDown(false);
    }
  };

  return (
    <div className="PlannerComponent absolute h-screen w-screen rounded-sm noselect">
      <div
        className={`planner-card day-labels card h-5/6 w-8/12 absolute left-1/2 -translate-x-1/2 -translate-y-1/2 grid grid-flow-row pointer-events-none`}
      >
        {<DaysOfWeek />}
      </div>
      <div className="time-planner-container overflow-y-scroll overflow-x-hidden h-4/6 w-9/12 absolute top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className={`hour-labels card bg-neutral h-screen absolute top-0 grid grid-flow-col rounded-none`}
        >
          {<HourDivs />}
        </div>
        <div
          className={`plans card bg-base-300 h-screen w-11/12 absolute right-0 grid`}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          ref={plannerRef}
        >
          <div
            className={`preview-plan absolute opacity-40 bg-red-50`}
            ref={previewRef}
          />
          <HundredDivs />
          <div className="card-body absolute w-full h-full">
            {plans.map((plan, i) => (
              <Plan
                key={i}
                mouseDown={mouseDown}
                setPlanHover={setPlanHover}
                mousePos={mousePos}
                style={{
                  width: `${plan.width}%`,
                  height: `${plan.height}%`,
                  left: `${plan.left}%`,
                  top: `${plan.top}%`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlannerComponent;

const HourDivs = () => {
  const startHour = 1;
  const endHour = startHour + 24;
  const divs = [];
  for (let i = startHour; i < endHour; i++) {
    const hour = i % 12 === 0 ? 12 : i % 12;
    const amPm = Math.floor(i / 12) % 2 !== 0 ? "pm" : "am";
    divs.push(
      <div key={i} className="hour-div">
        {hour}:00 {amPm}
      </div>
    );
  }
  return divs;
};

const DaysOfWeek = () => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date().getDay();
  const daysOfWeek = [];
  for (let i = today; i < days.length; i++) {
    daysOfWeek.push(
      <div key={i} className="text-center days">
        {days[i]}
      </div>
    );
  }
  for (let i = 0; i < today; i++) {
    daysOfWeek.push(
      <div key={i} className="text-center days">
        {days[i]}
      </div>
    );
  }
  return daysOfWeek;
};

const HundredDivs = () => {
  const divs = [];
  for (let i = 0; i < 168; i++) {
    divs.push(<div key={i} className="dividers opacity-5" />);
  }
  return divs;
};
