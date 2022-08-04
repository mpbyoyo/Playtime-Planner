import React from "react";
import LoginForm from "../Components/LoginForm";
import { useNavigate } from "react-router-dom";
import { stateContext } from "../Components/App";

const LoginPage = () => {
  const { user } = React.useContext(stateContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) navigate("/home");
  }, [user]);

  return (
    <div className="login-page">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
