import React from "react";
import { useNavigate } from "react-router-dom";
import undraw_people_re_8spw1 from "../icons/undraw_people_re_8spw(1).svg";
import undraw_our_solution_re_8yk6 from "../icons/undraw_our_solution_re_8yk6.svg";
import undraw_schedule_re_2vro from "../icons/undraw_schedule_re_2vro.svg";

const Home = () => {
  const navigate = useNavigate();

  const toFriends = () => {
    navigate("/friends");
  };

  const toPlanners = () => {
    navigate("/grouped-planner");
  };

  const toPlanner = () => {
    navigate("/planner");
  };

  return (
    <div className="home flex justify-center h-screen">
      <div className="home-card card bg-base-300 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  origin-top">
        <div className="card-body flex-row">
          <div className="home-button-container flex flex-col w-1/3 justify-between">
            <button
              className="friends-button btn btn-square w-full h-3/6 p-3"
              onClick={toFriends}
            >
              <div className="card bg-base-100 h-full w-full">
                <div className="card-body">
                  <figure>
                    <img
                      src={undraw_people_re_8spw1}
                      alt="Friend img"
                      className="absolute -bottom-9 -translate-x-1/2 pointer-events-none"
                    />
                  </figure>

                  <h2 className="card-title self-center text-3xl mt-5 absolute top-7">
                    Friends
                  </h2>
                </div>
              </div>
            </button>

            <button
              className="group-button btn btn-square w-full h-3/6 p-3"
              onClick={toPlanners}
            >
              <div className="card bg-base-100 h-full w-full">
                <div className="card-body">
                  <figure>
                    <img
                      src={undraw_our_solution_re_8yk6}
                      alt="Friend img"
                      className="absolute left-1/2 bottom-0 -translate-x-1/2 pointer-events-none"
                    />
                  </figure>

                  <h2 className="card-title self-center text-3xl absolute top-7">
                    Grouped Planners
                  </h2>
                </div>
              </div>
            </button>
          </div>

          <div className="w-2/3 home-button-container">
            <button
              className="planner-button btn btn-square w-full p-3"
              onClick={toPlanner}
            >
              <div className="card bg-base-100 h-full w-full">
                <div className="card-body">
                  <figure>
                    <img
                      src={undraw_schedule_re_2vro}
                      alt="Friend img"
                      className="pointer-events-none"
                    />
                  </figure>

                  <h2 className="card-title self-center text-3xl absolute bottom-28">
                    Personal Planner
                  </h2>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
