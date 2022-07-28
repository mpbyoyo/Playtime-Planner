import { useState, useEffect, createContext } from "react";
import "../scss/App.scss";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import SignupPage from "../Pages/SignupPage";
import LandingPage from "../Pages/LandingPage";
import FriendsPage from "../Pages/FriendsPage";
import PlannerPage from "../Pages/PlannerPage";
import { Routes, Route } from "react-router-dom";

export const stateContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((d) => setUser(d));
      }
    });
  }, []);

  console.log(user);
  return (
    <stateContext.Provider value={{ user, setUser }}>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={user && <HomePage />} />
          <Route path="/friends" element={user && <FriendsPage />} />
          <Route path="/planner" element={user && <PlannerPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </div>
    </stateContext.Provider>
  );
}

export default App;
