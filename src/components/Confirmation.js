// src/components/Confirmation.js
import React from "react";
import { useHistory } from "react-router-dom";
import "./Confirmation.css";

const Confirmation = () => {
  const history = useHistory();

  const handleNext = () => {
    history.push("/role-selection");
  };

  return (
    <div className="container">
      <div className="confirmation-box">
        <h1>Welcome to Boom!</h1>
        <p>Your account has been successfully created.</p>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Confirmation;
