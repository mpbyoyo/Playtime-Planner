import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import undraw_video_game_night_8h8m from "../icons/undraw_video_game_night_8h8m.svg";
import undraw_my_password_re_ydq7 from "../icons/undraw_my_password_re_ydq7.svg";
import logo from "../attachments/path31005.png";
import { stateContext } from "./App";

const LoginForm = () => {
  const navigate = useNavigate();
  const [invalidLoginData, setInvalidLoginData] = useState(false);
  const { setUser } = useContext(stateContext);
  const [loginData, setloginData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((d) => {
          if (d.errors && d.errors[0] === "Invalid username or password") {
            setInvalidLoginData(true);
          } else if (d.errors) {
            alert("Unknown error");
          } else {
            navigate("/home");
            setUser(d);
            setloginData({
              username: "",
              password: "",
            });
          }
        });
      }
    });
  };

  const handleChange = (e) => {
    setInvalidLoginData(false);
    setloginData({
      ...loginData,
      [e.target.name]: e.target.value.replace(/\s/g, ""),
    });
  };

  return (
    <div className="login-form w-screen h-screen">
      <img
        src={undraw_video_game_night_8h8m}
        alt="gamers"
        className="game-night absolute left-0 bottom-0.5 pointer-events-none"
      />
      <img
        src={undraw_my_password_re_ydq7}
        alt=""
        className="secure-svg absolute select-none pointer-events-none -translate-x-24 -translate-y-56"
      />
      <Link to="/">
        <img
          src={logo}
          alt=""
          className="w-40 absolute top-12 left-24 hover:scale-105 transition-all cursor-pointer"
        />
      </Link>

      <form
        onSubmit={handleLogin}
        className="overflow-visible form-control absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 card bg-base-300 p-5 login-form-form"
      >
        <h2 className="text-secondary text-2xl mb-3">Login</h2>
        <input
          type="text"
          name="username"
          className={`input input-bordered ${
            invalidLoginData ? "input-error" : "input-secondary"
          } w-80 mb-5`}
          placeholder="Username"
          value={loginData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          className={`input input-bordered ${
            invalidLoginData ? "input-error" : "input-secondary"
          } w-80 mb-5`}
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange}
        />
        <button className="btn absolute bottom-4 w-2/4 btn-primary self-center">
          Login
        </button>
        <h3>
          Not signed up with us yet?{" "}
          <Link to="/signup">
            <p className="link link-secondary inline-block">Signup!</p>
          </Link>
        </h3>
      </form>
      <div
        className={`alert alert-error shadow-lg absolute ${
          invalidLoginData ? "bottom-5" : "-bottom-14"
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
          <span>Error! Incorrect username or password.</span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
