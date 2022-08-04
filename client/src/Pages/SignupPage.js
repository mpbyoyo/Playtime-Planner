import React from "react";
import SignupForm from "../Components/SignupForm";
import { useNavigate } from "react-router-dom";
import { stateContext } from "../Components/App";

const SignupPage = () => {
  const { user } = React.useContext(stateContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) navigate("/home");
  }, [user]);

  return (
    <div className="signup-page">
      <SignupForm />
    </div>
  );
};

export default SignupPage;
