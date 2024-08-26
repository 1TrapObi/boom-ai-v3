// src/components/IntegratedDataDisplay.js
import React, { useState, useEffect } from "react";
import { fetchIntegratedData } from "../services/api";

const IntegratedDataDisplay = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchIntegratedData();
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch integrated data:", error);
      setError("Failed to fetch data. Please try again later.");
      setLoading(false);
    }
  };

  if (loading) return <div>Loading data...</div>;
  if (error) return <div>{error}</div>;
  if (!data) return <div>No data available</div>;

  return (
    <div>
      <h2>Integrated Data</h2>
      {Object.entries(data).map(([source, sourceData]) => (
        <div key={source}>
          <h3>{source}</h3>
          <pre>{JSON.stringify(sourceData, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
};

export default IntegratedDataDisplay;
