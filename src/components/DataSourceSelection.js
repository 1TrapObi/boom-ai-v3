import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DataSourceSelection = () => {
  const [selectedSources, setSelectedSources] = useState([]);
  const navigate = useNavigate();

  const dataSources = [
    { name: "Shopify", icon: "🛍️" },
    { name: "Stripe", icon: "💳" },
    { name: "QuickBooks", icon: "📚" },
    { name: "HubSpot", icon: "🔗" },
    { name: "Notion", icon: "📝" },
    { name: "MailChimp", icon: "📧" },
  ];

  const toggleSelection = (source) => {
    setSelectedSources((prev) =>
      prev.includes(source)
        ? prev.filter((s) => s !== source)
        : [...prev, source]
    );
  };

  const handleContinue = () => {
    if (selectedSources.length > 0) {
      navigate("/api-connection", { state: { selectedSources } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center text-white">
          What apps do you use?
        </h1>
        <p className="text-xl mb-8 text-center text-gray-300">
          Add your data source to enhance your Boom experience
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          {dataSources.map((source) => (
            <button
              key={source.name}
              className={`bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                selectedSources.includes(source.name)
                  ? "ring-2 ring-blue-500"
                  : ""
              }`}
              onClick={() => toggleSelection(source.name)}
            >
              <div className="text-4xl mb-2">{source.icon}</div>
              <div className="text-white">{source.name}</div>
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <button className="text-gray-400 hover:text-white transition-colors duration-200">
            Skip for now
          </button>
          <button
            className={`bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors duration-200 ${
              selectedSources.length === 0
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={handleContinue}
            disabled={selectedSources.length === 0}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataSourceSelection;
