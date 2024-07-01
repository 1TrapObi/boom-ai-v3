// src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Welcome from "./components/Welcome";
import RoleSelection from "./components/RoleSelection";
import DataSourceSelection from "./components/DataSourceSelection";
import ConfirmSelection from "./components/ConfirmSelection";
import AskBoomAI from "./components/AskBoomAI";
import ProfileSettings from "./components/ProfileSettings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route
          path="/data-source-selection"
          element={<DataSourceSelection />}
        />
        <Route
          path="/confirm-selection/:source"
          element={<ConfirmSelection />}
        />
        <Route path="/ask-boom-ai" element={<AskBoomAI />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
      </Routes>
    </Router>
  );
}

export default App;
