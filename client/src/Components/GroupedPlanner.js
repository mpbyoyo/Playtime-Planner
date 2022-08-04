import React, { useState } from "react";
import PlannerComponent from "./PlannerComponent";
import GroupContextMenu from "./GroupContextMenu";
import undraw_empty_re_opql from "../icons/undraw_empty_re_opql.svg";
import pinIcon from "../icons/pin-icon.svg";
import { stateContext } from "./App";

const GroupedPlanner = () => {
  const [groups, setGroups] = useState(null);
  const [group, setGroup] = useState(null);
  const [drawer, setDrawer] = useState(true);
  const [pinDrawer, setPinDrawer] = useState(false);
  const [focusedUserIndex, setFocusedUserIndex] = useState(null);
  const [focusedUser, setFocusedUser] = useState(null);
  const [contextMenu, setContextMenu] = useState(false);
  const [contextGroup, setContextGroup] = useState(false);
  const [contextUser, setContextUser] = useState(false);
  const [newName, setNewName] = useState(false);
  const { user } = React.useContext(stateContext);
  const [formData, setFormData] = useState({
    name: "",
    users: [
      { error: false, text: `${user.username}` },
      { error: false, text: "" },
    ],
  });
  const [noNameError, setNoNameError] = useState(false);
  const [noFriendError, setNoFriendError] = useState(false);
  const closeModalRef = React.useRef();
  const contextMenuRef = React.useRef();

  React.useEffect(() => {
    fetch("/groups")
      .then((r) => r.json())
      .then((d) => setGroups(d));
  }, []);

  React.useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);
    if (group && focusedUserIndex !== null)
      setFocusedUser(group.users[focusedUserIndex].id);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [focusedUserIndex, group, newName]);

  React.useEffect(() => {
    if (contextMenu) {
      contextMenuRef.current.style.top = `${contextMenu[1]}px`;
      contextMenuRef.current.style.left = `${contextMenu[0]}px`;
    }
  }, [contextMenu]);

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
        } else {
          setNoNameError(true);
        }
      });
    } else {
      setNoFriendError(true);
    }
  };

  const handleAddUserToGroup = () => {
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
    console.log(e.key);
    if (e.key === "Backspace" && formData.users.length > 2) {
      const users = [...formData.users];
      users.splice(i, 1);
      setFormData((v) => ({
        ...v,
        users,
      }));
    } else if (e.key === "Tab" && i === formData.users.length - 1) {
      e.preventDefault();
      handleAddUserToGroup();
    }
  };

  const handleMouseMove = (e) => {
    if (group && e.clientX < window.innerWidth * 0.14) {
      setDrawer(true);
    }
  };

  const keyDownHandler = (event) => {
    if (group) {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setFocusedUserIndex((v) => (v + 1) % group.users.length);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        setFocusedUserIndex((v) => {
          if (v - 1 < 0) {
            return group.users.length - 1;
          } else {
            return (v - 1) % group.users.length;
          }
        });
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setFocusedUser(null);
      } else if (newName && event.key === "Enter") {
        fetch(`/groups/${group.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newName,
          }),
        }).then((r) => {
          if (r.ok) {
            r.json().then((d) => {
              setGroups((v) =>
                v.map((g) => {
                  if (g.id === group.id) {
                    g.name = newName;
                  }
                  return g;
                })
              );
              setNewName(null);
            });
          } else {
            alert("Unknown Error");
          }
        });
      }
    }
  };

  const closeDrawer = () => {
    if (!pinDrawer) {
      setDrawer(false);
    }
  };

  const errorTest = () => {
    if (noNameError) {
      return "Please enter a group name!";
    } else if (noFriendError) {
      return "We can't find that user in your friends list!";
    }
  };

  return (
    <div className="GroupedPlanner" onMouseMove={handleMouseMove}>
      {contextMenu && (
        <GroupContextMenu
          value={{
            drawer,
            setDrawer,
            contextMenuRef,
            setContextMenu,
            setGroups,
            contextGroup,
            setContextGroup,
            contextUser,
            setContextUser,
            group,
            setGroup,
            setNewName,
          }}
        />
      )}
      <div
        className="drawer"
        onClick={() => {
          setContextMenu(false);
          setContextGroup(false);
          setContextUser(false);
        }}
      >
        <div
          className="drawer-content bg-base-100 h-full w-full"
          onClick={() => {
            if (drawer && group) {
              closeDrawer();
              contextMenu && setContextMenu(false);
              newName !== null && setNewName(null);
            }
            setFocusedUser(null);
          }}
        >
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
          {group && (
            <PlannerComponent
              group={group}
              friend={false}
              focusedUser={focusedUser}
            />
          )}
        </div>

        <div
          className={`drawer-side absolute transition-all duration-700 h-full z-20 ${
            !drawer ? "-left-[20%] opacity-0" : "left-0 opacity-100"
          }`}
          onMouseLeave={() => {
            group && closeDrawer();
            newName !== null && setNewName(null);
          }}
        >
          <img
            src={pinIcon}
            alt=""
            className={`absolute right-[3%] top-[1%] w-[10%] select-none cursor-pointer transition-all ${
              pinDrawer ? "rotate-[-45deg] opacity-60" : "rotate-0 opacity-30"
            }`}
            onClick={() => setPinDrawer((v) => !v)}
          />
          <ul className="menu p-4 overflow-y-auto w-80 bg-base-300 text-base-content h-full border-t-2 border-t-accent">
            <label
              htmlFor="my-drawer"
              className="drawer-overlay pointer-events-none select-none"
            >
              Your Groups
            </label>
            <div className="divider pointer-events-none select-none" />
            {groups && groups[0] ? (
              groups.map((g, i) => (
                <div key={i} className="select-none">
                  <li
                    className={`border-x-2 important:rounded-none select-none ${
                      group && group.name === g.name && "bg-accent-focus"
                    }`}
                  >
                    <div
                      className="important:rounded-none select-none"
                      onClick={() => {
                        if (group == g) {
                          setGroup(false);
                        } else {
                          setGroup(g);
                        }
                        setFocusedUser(null);
                        setFocusedUserIndex(null);
                        setContextMenu(false);
                        setContextGroup(false);
                        setContextUser(false);
                      }}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        setContextMenu([e.clientX, e.clientY]);
                        setNewName(null);
                        setContextUser(false);
                        setContextGroup(g);
                      }}
                    >
                      <div>
                        {contextGroup.id === g.id && newName !== null ? (
                          <input
                            type="text"
                            className="input"
                            autoFocus={true}
                            value={newName}
                            onClick={(e) => null}
                            onChange={(e) => setNewName(e.target.value)}
                          />
                        ) : (
                          g.name
                        )}
                      </div>
                    </div>
                  </li>
                  <div
                    className={`relative left-[10%] bg-neutral-focus w-[90%] rounded-b-md pl-[3%] py-[1%] transition- ${
                      group && group.id === g.id
                        ? "bottom-0 opacity-100"
                        : "-bottom-full hidden opacity-0"
                    } `}
                  >
                    <ul>
                      {g.users.map((u, i) => (
                        <li
                          key={i}
                          className={`my-2 w-fit px-2 py-0.5 rounded-md cursor-pointer ${
                            focusedUser === u.id ? "bg-primary" : "bg-none"
                          }`}
                          onClick={() => {
                            if (focusedUser === u.id) {
                              setFocusedUser(null);
                            } else {
                              setFocusedUser(u.id);
                            }
                          }}
                          onContextMenu={(e) => {
                            e.preventDefault();
                            setContextMenu([e.clientX, e.clientY]);
                            setContextGroup(false);
                            setContextUser(u);
                          }}
                        >
                          <p
                            className={`p-0 w-fit pointer-events-none transition-none ${
                              focusedUser === u.id
                                ? "text-primary-content"
                                : "text-base-content"
                            }`}
                          >
                            {u.username === user.username
                              ? user.username + " (you)"
                              : u.username}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
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
                onClick={() => {
                  setFormData({
                    name: "",
                    users: [
                      { error: false, text: `${user.username}` },
                      { error: false, text: "" },
                    ],
                  });
                  setNoFriendError(false);
                  setNoNameError(false);
                }}
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
                  setNoNameError(false);
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
                    onChange={(ev) => {
                      setNoFriendError(false);
                      if (i > 0) {
                        handleChangeUsersArray(i, ev.target.value);
                      }
                    }}
                    onKeyDown={
                      !formData.users[i]
                        ? (ev) => handleKeyDown(ev, i)
                        : () => {}
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
                onClick={() => {
                  setNoNameError(false);
                  setNoFriendError(false);
                }}
              >
                cancel
              </label>
            </div>
          </form>
        </div>
      </div>

      <div
        className={`alert alert-error shadow-lg absolute ${
          noNameError || noFriendError ? "bottom-5" : "-bottom-14"
        }  transition-all w-1/2 left-1/2 -translate-x-1/2`}
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{errorTest()}</span>
        </div>
      </div>
    </div>
  );
};

export default GroupedPlanner;
