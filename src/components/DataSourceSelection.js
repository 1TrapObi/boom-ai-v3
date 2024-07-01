// src/components/DataSourceSelection.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DataSourceSelection.css";

const DataSourceSelection = () => {
  const [selectedDataSource, setSelectedDataSource] = useState(null);
  const navigate = useNavigate();

  const dataSources = [
    { name: "Shopify", icon: "/icons/shopify-icon.png" },
    { name: "Stripe", icon: "/icons/stripe-icon.png" },
    { name: "QuickBooks", icon: "/icons/quickbooks-icon.png" },
    { name: "HubSpot", icon: "/icons/hubspot-icon.png" },
    { name: "Notion", icon: "/icons/notion-icon.png" },
    { name: "MailChimp", icon: "/icons/mailchimp-icon.png" },
  ];

  const handleDataSourceClick = (source) => {
    setSelectedDataSource(source);
    console.log("Selected Data Source:", source); // Temporary usage
    navigate(`/confirm-selection/${source.name}`);
  };

  return (
    <div className="data-source-selection-container">
      <h1>What apps do you use?</h1>
      <p>Add your data source to enhance your Boom experience</p>
      <div className="data-source-grid">
        {dataSources.map((source) => (
          <div
            key={source.name}
            className="data-source-card"
            onClick={() => handleDataSourceClick(source)}
          >
            <img src={source.icon} alt={source.name} />
            <p>{source.name}</p>
          </div>
        ))}
      </div>
      <div className="action-buttons">
        <button className="skip-button" onClick={() => navigate("/dashboard")}>
          Skip for now
        </button>
        <button
          className="continue-button"
          onClick={() => navigate("/confirm-selection")}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default DataSourceSelection;
