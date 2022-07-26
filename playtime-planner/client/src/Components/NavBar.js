import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { stateContext } from "./App";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useContext(stateContext);

  const handleLogout = () => {
    fetch(`/logout`, {
      method: "DELETE",
    })
      .then(setUser(null))
      .then(navigate("/"));
  };

  return (
    <div className="navbar bg-base-300">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex="0" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex="0"
            className="menu dropdown-content mt-3 p-2 shadow bg-base-300 rounded-box w-52"
          >
            <Link to="/">
              <li>
                <div>Home</div>
              </li>
            </Link>
            <Link to="/friends">
              <li>
                <div>Friends</div>
              </li>
            </Link>
            <Link to="/planner">
              <li>
                <div>Planner</div>
              </li>
            </Link>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link to="/home">
          <div className="btn btn-ghost normal-case text-xl">
            Playtime Planner
          </div>
        </Link>
      </div>
      <div className="navbar-end space-be">
        <p className="mx-6">Welcome, {user.username}.</p>
        <button className="btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavBar;
