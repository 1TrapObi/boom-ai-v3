import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const APIConnectionForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSources } = location.state || { selectedSources: [] };

  const [apiKeys, setApiKeys] = useState({});
  const [errors, setErrors] = useState({});

  const handleInputChange = (source, value) => {
    setApiKeys((prev) => ({ ...prev, [source]: value }));
    if (errors[source]) {
      setErrors((prev) => ({ ...prev, [source]: null }));
    }
  };

  const validateInputs = () => {
    const newErrors = {};
    selectedSources.forEach((source) => {
      if (!apiKeys[source] || apiKeys[source].trim() === "") {
        newErrors[source] = `${source} API key is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateInputs()) {
      try {
        // Here you would typically send the API keys to your backend
        // For now, we'll just simulate a successful connection
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate("/confirmation", {
          state: { connectedSources: selectedSources },
        });
      } catch (error) {
        console.error("Failed to connect sources:", error);
        setErrors({ submit: "Failed to connect sources. Please try again." });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center text-white">
          Connect Your Data Sources
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {selectedSources.map((source) => (
            <div key={source}>
              <label
                htmlFor={source}
                className="block text-sm font-medium text-gray-300"
              >
                {source} API Key
              </label>
              <input
                type="text"
                id={source}
                name={source}
                onChange={(e) => handleInputChange(source, e.target.value)}
                className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                placeholder={`Enter your ${source} API key`}
              />
              {errors[source] && (
                <p className="mt-2 text-sm text-red-500">{errors[source]}</p>
              )}
            </div>
          ))}
          {errors.submit && (
            <p className="text-sm text-red-500">{errors.submit}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-200"
          >
            Connect Sources
          </button>
        </form>
      </div>
    </div>
  );
};

export default APIConnectionForm;
