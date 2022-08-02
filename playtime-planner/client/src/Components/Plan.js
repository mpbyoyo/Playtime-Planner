import React, { useRef, useState } from "react";
import { timeContext } from "./PlannerComponent";
import { stateContext } from "./App";

const Plan = ({ mouseDown, setPlanHover, group, friend, e, setPlans }) => {
  const [plan, setPlan] = useState({
    ...e,
    name: e.name || "",
    description: "",
  });
  const [details, setDetails] = useState(false);
  const { timeRange, getTimeZoneTopPercentOffset } =
    React.useContext(timeContext);
  const { user } = React.useContext(stateContext);
  const planRef = useRef();
  const cardRef = useRef();
  const editable = !group && !friend;

  React.useEffect(() => {
    if (mouseDown && !plan.id) {
      setPlans((v) =>
        v.filter((p) => {
          return (
            "" + p.width + p.left + p.height + p.top !==
            "" + plan.width + plan.left + plan.height + plan.top
          );
        })
      );
    }
  }, [mouseDown]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (e.id && plan.description && editable) {
      fetch(`/plans/${e.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(plan),
      }).then((r) => {
        if (r.ok) {
          r.json().then((d) => {
            setPlans((v) => v.filter((p) => p.id !== e.id));
            setPlans((v) => [...v, d]);
          });
        }
      });
    } else if (!plan.id && editable) {
      fetch("/plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...plan,
          top: plan.top + getTimeZoneTopPercentOffset(),
        }),
      }).then((r) => {
        if (r.ok) {
          r.json().then((d) => {
            setPlans((v) =>
              v.filter((p) => {
                return (
                  "" + p.width + p.left + p.height + p.top !==
                  "" + plan.width + plan.left + plan.height + plan.top
                );
              })
            );
            setPlans((v) => [
              ...v,
              { ...d, top: d.top - getTimeZoneTopPercentOffset() },
            ]);
          });
        }
      });
    }
  };

  const handleChange = (e) => {
    setPlan({
      ...plan,
      [e.target.name]: e.target.value,
    });
  };

  const checkOverflow = (ref) => {
    if (ref.current) {
      return ref.current.scrollHeight > ref.current.clientHeight;
    }
  };

  const handleClick = () => {
    if (checkOverflow(planRef) && e.id) {
      if (!details) {
        planRef.current.style.height = "fit-content";
        setDetails(true);
      }
    } else if (details) {
      planRef.current.style.height = `${plan.height}%`;
      setDetails(false);
    }
  };

  const handleDelete = () => {
    if (e.id && editable) {
      fetch(`/plans/${e.id}`, {
        method: "DELETE",
      }).then((r) => {
        if (r.ok) {
          setPlans((v) => v.filter((p) => p.id !== e.id));
        }
      });
    }
    if (setPlanHover) {
      setPlanHover(false);
    }
  };

  const groupNameLabel =
    user.friend_list.filter((friend) => friend.id === e.user_id)[0] || user;
  return (
    <div
      className={`Plan absolute bg-primary hover:scale-105 focus:scale-105 focus:z-50 hover:z-50 transition-transform rounded-md opacity-40 hover:opacity-80 focus:opacity-80 ${
        mouseDown && "pointer-events-none"
      } ${e.description || !editable ? "overflow-hidden" : "overflow-visible"}`}
      ref={planRef}
      style={{
        width: `${e.width}%`,
        height: `${e.height}%`,
        left: `${e.left}%`,
        top: `${e.top}%`,
      }}
      onClick={handleClick}
      onMouseEnter={() => setPlanHover(true)}
      onMouseLeave={() => setPlanHover(false)}
    >
      <div
        ref={cardRef}
        className={`card h-fit w-full ${
          e.description || !editable ? "overflow-hidden" : "overflow-visible"
        }`}
      >
        {group && (
          <div className="text-primary-content text-2xl font-semibold absolute top-8 right-2">
            {groupNameLabel.username}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="card-body p-1">
            <h2 className="card-title">
              {e.name ? (
                <>
                  <p className="text-primary-content event-name">{e.name}</p>
                  <p className="text-primary-content text-xs font-bold time-range text-right pr-1">
                    {timeRange(e)}
                  </p>
                </>
              ) : (
                <input
                  type="text"
                  name="name"
                  className="input input-bordered w-full p-1"
                  value={plan.name}
                  onChange={handleChange}
                  placeholder="Plan Name"
                />
              )}
            </h2>
            <div className="text-primary-content event-desc break-words w-[20vw]">
              {e.description || !editable ? (
                <p className="w-full h-full">
                  {e.description || "No description"}
                </p>
              ) : (
                <textarea
                  type="text"
                  name="description"
                  className="w-full input input-bordered p-1"
                  value={plan.description}
                  onChange={handleChange}
                  placeholder="Description"
                />
              )}
            </div>
          </div>
          {(!e.id || (plan.description && !e.description && editable)) && (
            <button className="btn btn-success absolute -top-5 -right-10 save-button">
              Save Plan!
            </button>
          )}
        </form>
      </div>
      {e.id && !checkOverflow(planRef) && editable && (
        <>
          <button
            className="btn btn-circle btn-outline btn-accent absolute bottom-2 right-2 delete-button"
            onClick={handleDelete}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );
};

export default Plan;
