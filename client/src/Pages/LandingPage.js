import React from "react";
import Landing from "../Components/Landing";
import { useNavigate } from "react-router-dom";
import { stateContext } from "../Components/App";

const LandingPage = () => {
  const { user } = React.useContext(stateContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) navigate("/home");
  }, [user]);

  return (
    <div className="LandingPage">
      <Landing />
    </div>
  );
};

export default LandingPage;
