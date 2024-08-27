// src/components/ShopifyIntegration.js

import React, { useState } from "react";
import { integrateShopify, fetchShopifyData, getResponse } from "../apiService";

const ShopifyIntegration = () => {
  const [message, setMessage] = useState("");
  const [shopifyData, setShopifyData] = useState("");
  const [gptResponse, setGptResponse] = useState("");

  const handleIntegrate = async () => {
    try {
      await integrateShopify();
      setMessage("Shopify data integrated successfully");
    } catch (error) {
      setMessage("Error integrating Shopify data");
    }
  };

  const handleFetchData = async () => {
    try {
      const response = await fetchShopifyData();
      setShopifyData(response.data);
    } catch (error) {
      setMessage("Error fetching Shopify data");
    }
  };

  const handleAskGPT = async () => {
    try {
      const prompt = `Analyze this Shopify sales data:\n\n${shopifyData}\n\nProvide a summary of the sales.`;
      const response = await getResponse(prompt);
      setGptResponse(response);
    } catch (error) {
      setMessage("Error getting GPT response");
    }
  };

  return (
    <div>
      <h2>Shopify Integration</h2>
      <button onClick={handleIntegrate}>Integrate Shopify Data</button>
      <button onClick={handleFetchData}>Fetch Shopify Data</button>
      <button onClick={handleAskGPT}>Ask GPT</button>
      {message && <p>{message}</p>}
      {shopifyData && (
        <div>
          <h3>Shopify Data:</h3>
          <pre>{shopifyData}</pre>
        </div>
      )}
      {gptResponse && (
        <div>
          <h3>GPT Response:</h3>
          <p>{gptResponse}</p>
        </div>
      )}
    </div>
  );
};

export default ShopifyIntegration;
