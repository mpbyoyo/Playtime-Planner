import React, { useState } from "react";
import PlannerComponent from "./PlannerComponent";
import undraw_empty_re_opql from "../icons/undraw_empty_re_opql.svg";
import { stateContext } from "./App";

const GroupedPlanner = () => {
  const [groups, setGroups] = useState(null);
  const [group, setGroup] = useState(null);
  const [drawer, setDrawer] = useState(true);
  const { user } = React.useContext(stateContext);
  const [formData, setFormData] = useState({
    name: "",
    users: [
      { error: false, text: `${user.username}` },
      { error: false, text: "" },
    ],
  });
  const closeModalRef = React.useRef();
  const closeDrawerRef = React.useRef();

  React.useEffect(() => {
    fetch("/groups")
      .then((r) => r.json())
      .then((d) => setGroups(d));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = formData.users.filter((e) => !e.text);
    const errors = formData.users.filter((e) => e.error);
    if (!users[0] && !errors[0]) {
      fetch("/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          users: [...formData.users.map((e) => e.text)],
        }),
      }).then((r) => {
        if (r.ok) {
          r.json().then((d) => {
            setGroups((v) => [...v, d]);
            setFormData({
              name: "",
              users: [
                { error: false, text: `${user.username}` },
                { error: false, text: "" },
              ],
            });
            closeModalRef.current.click();
          });
        }
      });
    }
  };

  const handleAddUserToGroup = (e) => {
    setFormData((v) => ({
      ...v,
      users: [...v.users, ""],
    }));
  };

  const handleChangeUsersArray = (i, v) => {
    const users = [...formData.users];
    users[i] = { error: users[i].error, text: v };
    const friends = user.friend_list.map((e) => e.username);
    if (!friends.includes(v) && users[i].text) {
      users[i].error = true;
    } else {
      users[i].error = false;
    }

    setFormData((v) => ({
      ...v,
      users,
    }));
  };

  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace" && formData.users.length > 2) {
      const users = [...formData.users];
      users.splice(i, 1);
      setFormData((v) => ({
        ...v,
        users,
      }));
    }
  };

  const handleMouseMove = (e) => {
    if (group && e.clientX < window.innerWidth * 0.05) {
      setDrawer(true);
    }
  };

  return (
    <div className="GroupedPlanner" onMouseMove={handleMouseMove}>
      <div className="drawer">
        <div className="drawer-content bg-base-100 h-full w-full">
          {!groups && (
            <div className="text-center">
              <div className="text-xl absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2">
                Loading...
              </div>
            </div>
          )}
          {groups && !groups[0] && (
            <div>
              <img
                src={undraw_empty_re_opql}
                alt=""
                className="absolute no-groups-img top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
              <div className="absolute no-groups-text left-1/2 bottom-[25%] -translate-x-1/2 -translate-y-1/2">
                Couldn't find any groups :(
              </div>
            </div>
          )}
          {!group && groups && groups[0] && (
            <div>
              <img
                src={undraw_empty_re_opql}
                alt=""
                className="absolute no-groups-img top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
              <div className="absolute no-groups-text left-1/2 bottom-[25%] -translate-x-1/2 -translate-y-1/2">
                Select a group to view its planner!
              </div>
            </div>
          )}
          {group && <PlannerComponent group={group} friend={false} />}
        </div>
        <div
          className={`drawer-side absolute transition-all duration-700 h-full z-20 ${
            !drawer ? "-left-[20%] opacity-0" : "left-0 opacity-100"
          }`}
          onMouseLeave={() => group && setDrawer(false)}
        >
          <ul className="menu p-4 overflow-y-auto w-80 bg-base-300 text-base-content h-full border-t-2 border-t-accent">
            <label htmlFor="my-drawer" className="drawer-overlay">
              Your Groups
            </label>
            <div className="divider" />
            {groups && groups[0] ? (
              groups.map((g, i) => (
                <li
                  key={i}
                  className={`border-x-2 transition-all ${
                    group && group.name === g.name && "bg-accent-focus"
                  }`}
                >
                  <div
                    className="important:rounded-none"
                    onClick={() => {
                      setGroup(g);
                      setDrawer(false);
                    }}
                  >
                    {g.name}
                  </div>
                </li>
              ))
            ) : (
              <div className="opacity-60">
                You don't have any grouped planners! Why not make one?
              </div>
            )}
            <li>
              <label
                htmlFor="group-creation-modal"
                className="btn btn-success text-success-content new-group w-2/3 self-center modal-button"
              >
                Create Grouped Planner
              </label>
            </li>
          </ul>
        </div>
      </div>

      {/* JSX for group creation modal */}
      <input
        type="checkbox"
        id="group-creation-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit} className="">
            <div
              className={`${!formData.name && "tooltip tooltip-right"} `}
              data-tip="Enter a group name!"
            >
              <input
                className="font-bold text-lg input"
                placeholder="My New Grouped Planner"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                }}
              />
            </div>
            <div className="py-4">
              {formData.users.map((e, i) => (
                <div className="flex" key={i}>
                  <div className="h-full py-[0.678rem]">
                    {`Friend ${i + 1}`}:
                  </div>
                  <input
                    className={`input mb-[1.5vh] w-[70%] ml-[1vw] input-bordered ${
                      formData.users[i].error && "input-error"
                    } ${
                      !formData.users[i].error &&
                      formData.users[i].text &&
                      "input-success"
                    }`}
                    placeholder="Enter a friend's username"
                    value={formData.users[i].text}
                    onChange={
                      i > 0
                        ? (ev) => {
                            handleChangeUsersArray(i, ev.target.value);
                          }
                        : () => {}
                    }
                    onKeyDown={
                      !formData.users[i] ? (e) => handleKeyDown(e, i) : () => {}
                    }
                  />
                </div>
              ))}
              <div className="relative left-1/2 -translate-x-1/2 w-fit mt-[2vh] select-none">
                <div
                  className="btn btn-primary btn-circle text-4xl text-primary-content"
                  onClick={handleAddUserToGroup}
                >
                  <p className="relative bottom-[8%] ">+</p>
                </div>
              </div>
            </div>
            <div className="modal-action">
              <button className="btn btn-success text-success-content">
                Create
              </button>
              <label
                htmlFor="group-creation-modal"
                className="btn"
                ref={closeModalRef}
              >
                cancel
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GroupedPlanner;
