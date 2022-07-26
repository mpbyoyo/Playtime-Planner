import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="Landing">
      <Link to="/login">
        <button className="btn mx-4">Login</button>
      </Link>
      <Link to="/signup">
        <button className="btn">Signup</button>
      </Link>
    </div>
  );
};

export default Landing;
