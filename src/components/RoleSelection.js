import React from "react";
import { Link } from "react-router-dom";

const RoleSelection = () => {
  const roles = [
    "Business Owner",
    "Startup Founder",
    "Sales",
    "Marketing",
    "Operations",
    "Finance",
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-6 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-8 text-center text-white">
          Select Your Role
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {roles.map((role) => (
            <button
              key={role}
              className="bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-white hover:bg-gray-700"
            >
              {role}
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <Link
            to="/data-source-selection"
            className="bg-gradient-to-r from-orange-400 to-pink-500 text-white py-2 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
