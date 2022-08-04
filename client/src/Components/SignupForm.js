import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../attachments/path31005.png";
import undraw_lost_online_re_upmy from "../icons/undraw_lost_online_re_upmy.svg";

const SignupForm = () => {
  const navigate = useNavigate();
  const [invalidSignupData, setInvalidSignupData] = useState({
    username: false,
    usernameTaken: false,
    password: false,
    passwordConfirmation: false,
  });

  const [signupData, setSignupData] = useState({
    username: "",
    password: "",
    password_confirmation: "",
  });

  const handleSignup = (e) => {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.errors) {
          let errors = {
            username: false,
            usernameTaken: false,
            password: false,
            passwordConfirmation: false,
          };

          if (d.errors.includes("Password can't be blank")) {
            errors = {
              ...errors,
              password: true,
            };
          }

          if (d.errors.includes("Username can't be blank")) {
            errors = {
              ...errors,
              username: true,
            };
          }

          if (d.errors.includes("Username has already been taken")) {
            errors = {
              ...errors,
              usernameTaken: true,
            };
          }

          if (
            d.errors.includes("Password confirmation doesn't match Password")
          ) {
            errors = {
              ...errors,
              passwordConfirmation: true,
            };
          }
          setInvalidSignupData(errors);
        } else {
          setSignupData({
            username: "",
            password: "",
            password_confirmation: "",
          });
          navigate("/login");
        }
      });
  };

  const handleChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value.replace(/\s/g, ""),
    });
    setInvalidSignupData({
      username: false,
      usernameTaken: false,
      password: false,
      passwordConfirmation: false,
    });
  };

  const usernameError = () => {
    if (invalidSignupData.username) return "Please enter a username!";
    else if (invalidSignupData.usernameTaken)
      return "Username taken! Try another one.";

    return false;
  };

  return (
    <div className="signup-form w-screen h-screen">
      <img
        src={undraw_lost_online_re_upmy}
        alt=""
        className="absolute lost-svg -translate-x-60 -translate-y-80 pointer-events-none"
      />
      <Link to="/">
        <img
          src={logo}
          alt=""
          className="w-40 absolute top-12 left-24 hover:scale-105 transition-all cursor-pointer"
        />
      </Link>

      <form
        onSubmit={handleSignup}
        className="signup-form-form overflow-visible form-control absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 card bg-base-300 p-5"
      >
        <h2 className="text-secondary text-2xl mb-3 inline-block">Signup</h2>

        <div
          className={`${
            (invalidSignupData.username || invalidSignupData.usernameTaken) &&
            "tooltip tooltip-open tooltip-error tooltip-right mb-5"
          }`}
          data-tip={usernameError()}
        >
          <input
            type="text"
            name="username"
            className={`input input-bordered ${
              invalidSignupData.username || invalidSignupData.usernameTaken
                ? "input-error"
                : "input-secondary mb-5"
            } w-80`}
            placeholder="Username"
            value={signupData.username}
            onChange={handleChange}
          />
        </div>

        <div
          className={`${
            invalidSignupData.password &&
            "tooltip tooltip-open tooltip-error tooltip-right mb-5"
          } `}
          data-tip="Please enter a password!"
        >
          <input
            type="password"
            name="password"
            className={`input input-bordered ${
              invalidSignupData.password
                ? "input-error"
                : "input-secondary mb-5"
            } w-80`}
            placeholder="Password"
            value={signupData.password}
            onChange={handleChange}
          />
        </div>

        <div
          className={`${
            invalidSignupData.passwordConfirmation &&
            "tooltip tooltip-open tooltip-error tooltip-right mb-5"
          }`}
          data-tip="Passwords do not match!"
        >
          <input
            type="password"
            name="password_confirmation"
            className={`input input-bordered ${
              invalidSignupData.passwordConfirmation
                ? "input-error"
                : "input-secondary mb-5"
            } w-80`}
            placeholder="Confirm Password"
            value={signupData.password_confirmation}
            onChange={handleChange}
          />
        </div>

        <button className="btn absolute bottom-4 w-2/4 btn-primary self-center">
          Signup
        </button>
        <h3>
          Already have an account?{" "}
          <Link to="/login">
            <p className="link link-secondary inline-block">Login!</p>
          </Link>
        </h3>
      </form>
    </div>
  );
};

export default SignupForm;
