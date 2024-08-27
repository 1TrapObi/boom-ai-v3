// src/components/TestIntegration.js

import React, { useState } from "react";
import { sendTestIntegrationData } from "../apiService";

const TestIntegration = () => {
  const [userId, setUserId] = useState("");
  const [testData, setTestData] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendTestIntegrationData(userId, { testData });
      setResult({ success: true, message: response.data.message });
    } catch (error) {
      setResult({
        success: false,
        message: error.response?.data?.message || "An error occurred",
      });
    }
  };

  return (
    <div>
      <h2>Test Integration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userId">User ID:</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="testData">Test Data:</label>
          <input
            type="text"
            id="testData"
            value={testData}
            onChange={(e) => setTestData(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Test Data</button>
      </form>
      {result && (
        <div>
          <h3>Result:</h3>
          <p>
            {result.success ? "Success" : "Error"}: {result.message}
          </p>
        </div>
      )}
    </div>
  );
};

export default TestIntegration;
