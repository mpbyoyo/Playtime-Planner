import React from "react";
import Friends from "../Components/Friends";
import NavBar from "../Components/NavBar";
import { useNavigate } from "react-router-dom";
import { stateContext } from "../Components/App";

const FriendsPage = () => {
  const { user } = React.useContext(stateContext);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!user) navigate("/");
  }, []);

  return (
    <div className="FriendsPage">
      <NavBar />
      <Friends />
    </div>
  );
};

export default FriendsPage;
