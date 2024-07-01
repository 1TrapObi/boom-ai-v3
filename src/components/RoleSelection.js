// src/components/RoleSelection.js

import React from "react";
import "../styles/RoleSelection.css";

const roles = [
  "Business Owner",
  "Startup Founder",
  "Sales",
  "Marketing",
  "Operations",
  "Finance",
];

const RoleSelection = ({ onSelectRole }) => {
  return (
    <div className="role-selection-container">
      <h1>Select Your Role</h1>
      <div className="roles">
        {roles.map((role, index) => (
          <button
            key={index}
            onClick={() => onSelectRole(role)}
            className="role-button"
          >
            {role}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoleSelection;
