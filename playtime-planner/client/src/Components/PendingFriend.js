import React, { useContext } from "react";
import undraw_male_avatar_323b from "../icons/undraw_male_avatar_323b.svg";
import { stateContext } from "./App";

const PendingFriend = ({ pending }) => {
  const { username, pfp } = pending;
  const { user, setUser } = useContext(stateContext);

  const handleAccept = () => {
    fetch("/pending", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pendee: username,
        "accepted?": true,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((d) => setUser(d));
      }
    });
  };

  const handleDecline = () => {
    fetch("/pending", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pendee: username,
        "accepted?": false,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((d) => setUser(d));
      }
    });
  };
  return (
    <div className="PendingFriend card bg-base-100 hover:scale-105 transition-all hover:shadow-lg mx-2 h-20">
      <figure className="absolute left-4 top-1/2 -translate-y-1/2">
        <div className="avatar">
          <div className="w-12 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
            <img
              src={pfp || undraw_male_avatar_323b}
              alt="pfp"
              className="w-full pointer-events-none"
            />
          </div>
        </div>
      </figure>
      <div className="card-body">
        <h2 className="card-title absolute left-20 top-1/2 -translate-y-1/2">
          {username}
        </h2>
        <div className="card-actions absolute right-3 top-1/2 -translate-y-1/2">
          <button
            className="btn btn-success scale-90 p-1"
            onClick={handleAccept}
          >
            Accept
          </button>
          <button
            className="btn btn-error scale-90 p-1"
            onClick={handleDecline}
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default PendingFriend;
