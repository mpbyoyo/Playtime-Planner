import React, { useContext, useState, useEffect } from "react";
import { stateContext } from "./App";
import Friend from "./Friend";
import PendingFriend from "./PendingFriend";

const Friends = () => {
  const { user, setUser } = useContext(stateContext);
  const { friend_list, pending_list } = user;
  const [search, setSearch] = useState("");
  const [updater, setUpdater] = useState(false);
  const [errors, setErrors] = useState({
    self: false,
    areFreinds: false,
    unreal: false,
  });

  useEffect(() => {
    setTimeout(() => {
      setErrors({
        self: false,
        areFreinds: false,
        unreal: false,
      });
    }, 3250);
  }, [updater]);

  const handleChange = (e) => {
    setSearch(e.target.value.replace(/\s/g, ""));
  };

  const handleAdd = () => {
    if (search !== user.username) {
      fetch("/friends", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          friend_username: search,
        }),
      }).then((r) => {
        if (r.ok) {
          r.json()
            .then((d) => setUser(d))
            .then(setSearch(""));
        } else if (r.status === 404) {
          setErrors((v) => ({
            ...v,
            unreal: true,
          }));
          setUpdater((v) => !v);
        } else if (r.status === 500) {
          setErrors((v) => ({
            ...v,
            areFreinds: true,
          }));
          setUpdater((v) => !v);
        }
      });
    } else {
      setErrors((v) => ({
        ...v,
        self: true,
      }));
      setUpdater((v) => !v);
    }
  };

  const renderedFriends = friend_list
    .filter((e) => e.username.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.username.localeCompare(b.username));

  const renderedPending = pending_list.slice(0, 4);

  // const moreFriends = [
  //   ...renderedFriends,
  //   ...renderedFriends,
  //   ...renderedFriends,
  //   ...renderedFriends,
  // ];

  const errMessage = () => {
    if (errors.self) {
      return "You can't friend yourself... That's too sad...";
    } else if (errors.areFreinds) {
      return "This user is already your friend!";
    } else if (errors.unreal) {
      return "Sorry, we can't find this user.";
    }
  };

  return (
    <div className="Friends">
      <div className="friends-card card bg-base-300">
        <div className="card-body mx-10 friends-header absolute w-11/12">
          <div className="card-actions justify-end h-0 overflow-visible z-50">
            <button className="btn btn-success" onClick={handleAdd}>
              Add Friend
            </button>
          </div>
          <h2 className="card-title text-5xl ">Friends</h2>
          <input
            type="text"
            className="input w-full max-w-xs mt-2"
            placeholder="Search your friends or add a new one!"
            onChange={handleChange}
            value={search}
          />
        </div>
        {pending_list[0] && (
          <>
            <div className="divider mx-10 mt-48 mb-32"></div>
            <div className="pending-body absolute top-48 card-body grid grid-cols-4 grid-rows-none w-full">
              {renderedPending.map((e, i) => (
                <PendingFriend key={i} pending={e} />
              ))}
            </div>
          </>
        )}
        <div
          className={`divider mx-10 ${renderedPending[0] ? "mt-0" : "mt-48"}`}
        ></div>
        <div className="friends-body card-body grid grid-cols-5 grid-rows-none">
          {renderedFriends[0] &&
            renderedFriends.map((e, i) => (
              <Friend key={i} friend={e} setUser={setUser} />
            ))}
          {!renderedFriends[0] && (
            <div className="no-friends">
              <p>No friends to be found! :(</p>
              <p>Press Add Friend to add some!</p>
            </div>
          )}
        </div>
      </div>
      <div
        className={`alert alert-error shadow-lg absolute ${
          Object.values(errors).includes(true) ? "bottom-5" : "-bottom-14"
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
          <span>{errMessage()}</span>
        </div>
      </div>
    </div>
  );
};

export default Friends;
