// src/components/IntegrationManagement.js
import React, { useState, useEffect } from "react";
import {
  getIntegrationStatus,
  connectIntegration,
  disconnectIntegration,
} from "../services/api";

const IntegrationManagement = () => {
  const [integrations, setIntegrations] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIntegrationStatus();
  }, []);

  const fetchIntegrationStatus = async () => {
    try {
      const response = await getIntegrationStatus();
      setIntegrations(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch integration status:", error);
      setLoading(false);
    }
  };

  const handleConnect = async (integration) => {
    try {
      // In a real app, you'd collect credentials from the user
      const credentials = { apiKey: "dummy-key" };
      await connectIntegration(integration, credentials);
      fetchIntegrationStatus();
    } catch (error) {
      console.error(`Failed to connect ${integration}:`, error);
    }
  };

  const handleDisconnect = async (integration) => {
    try {
      await disconnectIntegration(integration);
      fetchIntegrationStatus();
    } catch (error) {
      console.error(`Failed to disconnect ${integration}:`, error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Manage Integrations</h2>
      {Object.entries(integrations).map(([integration, isConnected]) => (
        <div key={integration}>
          <span>
            {integration}: {isConnected ? "Connected" : "Not Connected"}
          </span>
          {isConnected ? (
            <button onClick={() => handleDisconnect(integration)}>
              Disconnect
            </button>
          ) : (
            <button onClick={() => handleConnect(integration)}>Connect</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default IntegrationManagement;
