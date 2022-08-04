import React, { useState, useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import logo from "../attachments/path31005.png";
import gamer_friends3 from "../icons/gamer_friends3.svg";
import loginSc from "../attachments/Screenshot_1.png";
import friendsSc from "../attachments/Screenshot_2.png";
import plannerSc from "../attachments/image.jpg";
import groupSc from "../attachments/Screenshot_3.png";

const Landing = () => {
  const { ref: signupRef, inView: signupIsVisible } = useInView({});
  const { ref: planRef, inView: planIsVisible } = useInView({});
  const { ref: friendsRef, inView: friendsIsVisible } = useInView({});
  const { ref: groupRef, inView: groupIsVisible } = useInView({});
  return (
    <div className="Landing h-screen overflow-auto overflow-x-hidden">
      <div className="bg-primary w-full h-[45rem] relative">
        <div className="bg-neutral absolute top-3 left-80 w-12 h-12 rounded-full select-none cursor-pointer">
          <img
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 pointer-events-none"
            src={logo}
            alt="logo"
          />
        </div>
        <div className="absolute right-80 top-3">
          <Link to="/login">
            <button className="btn rounded-3xl mx-4">Login</button>
          </Link>
          <Link to="/signup">
            <button className="btn rounded-3xl">Signup</button>
          </Link>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[30rem]">
          <div className="w-full text-center mt-20 select-none">
            <h1 className="font-bold text-6xl text-primary-content">
              Welcome to Playtime Planner!
            </h1>
          </div>
          <div className="w-full flex flex-col mt-10 select-none">
            <p className="text-xl w-4/5 text-center self-center text-primary-content">
              Playtime Planner makes it easy to find time for friends, and for
              friends to find time for you.{" "}
              <span className="text-accent border-b-[1px] border-b-accent">
                <Link to="/signup">Sign up</Link>
              </span>
              , add some friends, add some plans, and start planning your
              playtime!
            </p>
          </div>
        </div>
      </div>
      <div className="relative h-0 w-full">
        <div className="absolute bg-base-100 -translate-x-1/2 -translate-y-1/2 w-1/2 h-80 rounded-[100%] z-20" />
        <div className="absolute bg-primary -translate-x-1/2 -translate-y-1/2 right-0 w-1/2 h-80 rounded-[100%] z-20">
          <img
            src={gamer_friends3}
            alt=""
            className="absolute z-30 w-[70%] right-[50%] bottom-[2%] translate-x-1/2 translate-y-1/2 select-none pointer-events-none"
          />
          <div
            className={`absolute w-[20vw] h-[20vw] bg-accent left-[28%] bottom-[-2%] opacity-70 rounded-full`}
          />
        </div>
        <div className="absolute bg-base-100 -translate-x-1/2 -translate-y-1/2 -right-[50.06%] w-1/2 h-80 rounded-[100%] z-20" />
      </div>

      <div className="w-full h-[60rem] bg-base-100 relative flex flex-col items-center">
        <div className="h-80" />

        <div
          ref={signupRef}
          className={`w-4/5 flex flex-row mt-40 select-none justify-between transition-all duration-1000 ${
            signupIsVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="ml-10 mt-[0%]">
            <img
              src={loginSc}
              alt=""
              className="w-[30vw] rounded-xl z-20 absolute pointer-events-none"
            />
            <div className="bg-secondary w-[30.5vw] h-[15.25vw] rounded-xl ml-2 mt-2 opacity-60" />
          </div>
          <div className="w-full flex flex-col items-center">
            <h2 className="text-center text-4xl font-bold w-7/12">
              Press "
              <span className="text-secondary border-b-[1px] border-b-secondary">
                <Link to="/signup">Sign up</Link>
              </span>
              " to create a Playtime Planner account.{" "}
              <span className="font-normal text-3xl">
                Make sure to pick a unique username and a secure password!
              </span>
            </h2>
          </div>
        </div>
      </div>

      <div className="w-full h-[40rem] bg-base-200 relative flex flex-col items-center">
        <div
          ref={planRef}
          className={`w-4/5 flex flex-row mt-40 select-none justify-between transition-all duration-1000 ${
            planIsVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="w-full flex flex-col items-center">
            <h2 className="text-center text-4xl font-bold w-7/12">
              Set your schedule in your personal planner.{" "}
              <span className="font-normal text-3xl">
                Just click and drag to set the date!
              </span>
            </h2>
          </div>
          <div className="mr-40 mt-4">
            <img
              src={plannerSc}
              alt=""
              className="w-[30vw] rounded-xl z-20 absolute pointer-events-none"
            />
            <div className="bg-primary w-[30.5vw] h-[15.25vw] rounded-xl ml-2 mt-2 opacity-60" />
          </div>
        </div>
      </div>

      <div className="w-full h-[40rem] bg-base-100 relative flex flex-col items-center">
        <div
          ref={friendsRef}
          className={`w-4/5 flex flex-row mt-40 select-none justify-between transition-all duration-1000 ${
            friendsIsVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="ml-10 mt-[0%]">
            <img
              src={friendsSc}
              alt=""
              className="w-[30vw] rounded-xl z-20 absolute pointer-events-none"
            />
            <div className="bg-accent w-[30.5vw] h-[15.25vw] rounded-xl ml-2 mt-2 opacity-60" />
          </div>
          <div className="w-full flex flex-col items-center">
            <h2 className="text-center text-4xl font-bold w-7/12">
              Add friends in the "Friends" tab.{" "}
              <span className="font-normal text-3xl">
                You can view their planners and see when would be best to have
                some fun!
              </span>
            </h2>
          </div>
        </div>
      </div>

      <div className="w-full h-[40rem] bg-base-200 relative flex flex-col items-center">
        <div
          ref={groupRef}
          className={`w-4/5 flex flex-row mt-40 select-none justify-between transition-all duration-1000 ${
            groupIsVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="w-full flex flex-col items-center">
            <h2 className="text-center text-4xl font-bold w-7/12">
              Group up some of your friends into a Grouped Planner!{" "}
              <span className="font-normal text-3xl">
                a Grouped Planer can only be seen by the user that makes it! So
                feel free to make as many as you want!
              </span>
            </h2>
          </div>
          <div className="mr-40 mt-4">
            <img
              src={groupSc}
              alt=""
              className="w-[30vw] rounded-xl z-20 absolute pointer-events-none"
            />
            <div className="bg-success w-[30.5vw] h-[15.25vw] rounded-xl ml-2 mt-2 opacity-60" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
