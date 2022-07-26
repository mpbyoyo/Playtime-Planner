import React from "react";
import undraw_male_avatar_323b from "../icons/undraw_male_avatar_323b.svg";

const Friend = ({ friend, setUser }) => {
  const { id, username, pfp } = friend;

  const handleDelete = () => {
    fetch(`/friends/${id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        r.json().then((d) => setUser(d));
      }
    });
  };

  return (
    <div className="Friend card bg-base-100 hover:scale-105 transition-all hover:shadow-lg mx-2 h-80">
      <figure className="px-10 pt-10">
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
            <img
              src={pfp || undraw_male_avatar_323b}
              alt="pfp"
              className="w-full pointer-events-none"
            />
          </div>
        </div>
      </figure>
      <div className="card-body">
        <h2 className="card-title self-center">{username}</h2>
        <div className="card-actions self-center">
          <button
            className="btn btn-error w-20 h-10 mt-10"
            onClick={handleDelete}
          >
            Remove Friend
          </button>
        </div>
      </div>
    </div>
  );
};

export default Friend;
