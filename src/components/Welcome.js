// src/components/Welcome.js

import React from "react";

const Welcome = () => {
  return (
    <div className="welcome-container">
      <h1>Welcome to Boom</h1>
      <button onClick={() => (window.location.href = "/role-selection")}>
        Next
      </button>
    </div>
  );
};

export default Welcome;
