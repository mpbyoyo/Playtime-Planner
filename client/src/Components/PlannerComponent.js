import React, { useState, useRef, createContext } from "react";
import Plan from "./Plan";
import { stateContext } from "./App";
import { useParams } from "react-router-dom";

export const timeContext = createContext();

const PlannerComponent = ({ group, friend, focusedUser }) => {
  const [mousePos, setMousePos] = useState([0, 0]);
  const [topLeft, setTopLeft] = useState([0, 0]);
  const [plans, setPlans] = useState([]);
  const [mouseDown, setMouseDown] = useState(false);
  const [planHover, setPlanHover] = useState(false);
  const { user, setUser } = React.useContext(stateContext);
  const { username } = useParams();
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
    if (!group && !friend) {
      fetch("/me")
        .then((r) => r.json())
        .then(setUser);
      if (user.plans[0] && !group) {
        setPlans([
          ...user.plans.map((e) => ({
            ...e,
            top: parseInt(e.top) - getTimeZoneTopPercentOffset(),
          })),
        ]);
      }
    } else if (friend) {
      fetch(`/user/${username}/plans`)
        .then((r) => r.json())
        .then((d) => {
          setPlans([
            ...d.map((e) => ({
              ...e,
              top: parseInt(e.top) - getTimeZoneTopPercentOffset(),
            })),
          ]);
        });
    } else if (group) {
      setPlans(
        group.plans.map((e) => ({
          ...e,
          top: parseInt(e.top) - getTimeZoneTopPercentOffset(),
        }))
      );
    }
  }, [group]);

  const getTimezoneOffset = () => {
    const timezone = new Date().getTimezoneOffset() / 60;
    return timezone;
  };

  const getTimeZoneTopPercentOffset = () => {
    const timezone = getTimezoneOffset();
    const percentOffset = timezone * 4.16666666667;
    const modPercentOffset = percentOffset % 100;
    return modPercentOffset;
  };

  const roundToNearest14 = (num) => {
    return Math.round(num / 14.2857142857) * 14.2857142857;
  };

  const roundDownToNearest14 = (num) => {
    return Math.floor(num / 14.2857142857) * 14.2857142857;
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
      previewRef.current.style.width = `${
        roundToNearest14(previewWidth) + 14.2857142857
      }%`;
      previewRef.current.style.height = `${previewHeight}%`;
      previewRef.current.style.left = `${roundDownToNearest14(previewX)}%`;
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
        width: roundToNearest14(Math.abs(tl[0] - br[0])) + 13.2857142857,
        height: Math.abs(tl[1] - br[1]),
        left: roundDownToNearest14(smallerX) + 0.5,
        top: smallerY,
      };

      if (Math.abs(tl[1] - pos[1]) >= 3.5) {
        setPlans((v) => [...v, newPlan]);
      }
      setMouseDown(false);
    }
  };

  const handleMouseLeave = () => {
    if (mouseDown) {
      setMouseDown(false);
    }
  };

  const roundToNearest15Min = (num) => {
    return Math.round(num / 1.04166666667);
  };

  const getStartTime = (obj) => {
    const startTime = roundToNearest15Min(obj.top);
    return startTime;
  };

  const getEndTime = (obj) => {
    const endTime = roundToNearest15Min(
      parseInt(obj.top) + parseInt(obj.height) + 1
    );
    return endTime;
  };

  const timeRange = (obj) => {
    const startTime = (getStartTime(obj) + 4) / 4;
    const startHour = startTime % 12 === 0 ? 12 : startTime % 12;
    const startAmPm = Math.floor(startTime / 12) % 2 !== 0 ? "pm" : "am";
    const startMins =
      startTime % 1 === 0
        ? "00"
        : startTime % 0.5 === 0
        ? "30"
        : Math.round(startTime) > Math.floor(startTime)
        ? "45"
        : "15";
    const start = `${Math.floor(startHour) || 12}:${startMins}${startAmPm}`;

    const endTime = (getEndTime(obj) + 4) / 4;
    const endHour = endTime % 12 === 0 ? 12 : endTime % 12;
    const endAmPm = Math.floor(endTime / 12) % 2 !== 0 ? "pm" : "am";
    const endMins =
      endTime % 1 === 0
        ? "00"
        : endTime % 0.5 === 0
        ? "30"
        : Math.round(endTime) > Math.floor(endTime)
        ? "45"
        : "15";
    const end = `${Math.floor(endHour) || 12}:${endMins}${endAmPm}`;

    return `${start} - ${end}`;
  };

  const handleKeyDown = (e) => {};

  return (
    <div className="PlannerComponent absolute h-screen w-screen rounded-sm noselect">
      <div
        className={`planner-card planner-background card h-5/6 w-10/12 absolute left-1/2 -translate-x-1/2 -translate-y-1/2 grid grid-flow-row pointer-events-none bg-base-300`}
      />
      <div
        className={`planner-card day-labels card h-5/6 w-8/12 absolute left-1/2 -translate-x-1/2 -translate-y-1/2 grid grid-flow-row pointer-events-none`}
      >
        {<DaysOfWeek />}
      </div>
      <div className="time-planner-container rounded-md overflow-y-scroll overflow-x-hidden h-4/6 w-9/12 absolute top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className={`hour-labels card bg-neutral h-screen absolute top-0 grid grid-flow-col rounded-none overflow-visible`}
        >
          {<HourDivs />}
        </div>
        <div
          className={`plans card bg-base-300 h-screen w-11/12 absolute right-0 grid overflow-visible z-20 top-[2.1%]`}
          onMouseMove={!group && !friend ? handleMouseMove : () => {}}
          onMouseDown={!group && !friend ? handleMouseDown : () => {}}
          onMouseUp={!group && !friend ? handleMouseUp : () => {}}
          onMouseLeave={!group && !friend ? handleMouseLeave : () => {}}
          onKeyDown={group && !friend ? handleKeyDown : () => {}}
          ref={plannerRef}
        >
          <div
            className={`preview-plan absolute opacity-40 bg-red-50 text-primary-content`}
            ref={previewRef}
          >
            {mouseDown && (
              <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {timeRange({
                  top: topLeft[1] < mousePos[1] ? topLeft[1] : mousePos[1],
                  height: Math.abs(topLeft[1] - mousePos[1]),
                })}
              </p>
            )}
          </div>
          <GridDivs />
          <timeContext.Provider
            value={{
              timeRange,
              getTimeZoneTopPercentOffset,
              getTimezoneOffset,
              roundToNearest14,
            }}
          >
            <div className="card-body absolute w-full h-full">
              {plans[0] &&
                plans.map((plan, i) => (
                  <Plan
                    key={i}
                    e={plan}
                    mouseDown={mouseDown}
                    setPlanHover={setPlanHover}
                    mousePos={mousePos}
                    group={group}
                    friend={friend}
                    setPlans={setPlans}
                    focusedUser={focusedUser}
                    getTimezoneOffset={getTimezoneOffset}
                  />
                ))}
            </div>
          </timeContext.Provider>
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

const GridDivs = () => {
  const divs = [];
  for (let i = 0; i < 168; i++) {
    divs.push(<div key={i} className="dividers opacity-5" />);
  }
  return divs;
};
