// src/components/ConfirmSelection.js

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ConfirmSelection.css";

const ConfirmSelection = () => {
  const { source } = useParams();
  const navigate = useNavigate();

  const dataTypes = [
    "Sales Data",
    "Customer Data",
    "Financial Data",
    "Inventory Data",
    "Marketing Data",
    "Website Analytics",
    "Operations",
  ];

  return (
    <div className="confirm-selection-container">
      <h1>Connect {source}</h1>
      <p>Select the types of data you want to import from {source}</p>
      <ul className="data-type-list">
        {dataTypes.map((type) => (
          <li key={type}>
            <input type="checkbox" id={type} name={type} />
            <label htmlFor={type}>{type}</label>
          </li>
        ))}
      </ul>
      <button
        className="next-button"
        onClick={() => navigate("/role-selection")}
      >
        Next
      </button>
    </div>
  );
};

export default ConfirmSelection;
