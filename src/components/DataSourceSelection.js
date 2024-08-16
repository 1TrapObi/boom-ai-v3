import React from "react";
import { Link } from "react-router-dom";

const DataSourceSelection = () => {
  const dataSources = [
    { name: "Shopify", icon: "🛍️" },
    { name: "Stripe", icon: "💳" },
    { name: "QuickBooks", icon: "📚" },
    { name: "HubSpot", icon: "🔗" },
    { name: "Notion", icon: "📝" },
    { name: "MailChimp", icon: "📧" },
  ];

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
              className="bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
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
          <Link
            to="/confirm-selection/skipped"
            className="bg-gradient-to-r from-orange-400 to-pink-500 text-white py-2 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DataSourceSelection;
