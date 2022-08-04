import { useState, useEffect, createContext } from "react";
import "../scss/App.scss";
import Chat from "./Chat";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import SignupPage from "../Pages/SignupPage";
import LandingPage from "../Pages/LandingPage";
import FriendsPage from "../Pages/FriendsPage";
import PlannerPage from "../Pages/PlannerPage";
import FriendPlannerPage from "../Pages/FriendPlannerPage";
import GroupedPlannerPage from "../Pages/GroupedPlannerPage";
import { Routes, Route } from "react-router-dom";

export const stateContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/me")
      .then((r) => {
        if (r.ok) {
          r.json().then((d) => setUser(d));
        }
      })
      .then(() => setLoaded(true));
  }, []);

  // console.log(user);
  return (
    loaded && (
      <stateContext.Provider value={{ user, setUser }}>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={user && <HomePage />} />
            <Route path="/friends" element={user && <FriendsPage />} />
            <Route path="/planner" element={user && <PlannerPage />} />
            <Route
              path="/planner/:username"
              element={user && <FriendPlannerPage />}
            />
            <Route
              path="/grouped-planner"
              element={user && <GroupedPlannerPage />}
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
          {/* {user && <Chat />} */}
        </div>
      </stateContext.Provider>
    )
  );
}

export default App;
