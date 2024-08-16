import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

const ToggleButton = () => {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleDarkMode}
      className="relative inline-flex items-center p-1 rounded-full w-14 h-8 transition-colors duration-300 focus:outline-none"
      style={{
        backgroundColor: isDarkMode ? "#4B5563" : "#D1D5DB",
      }}
    >
      <span
        className={`inline-block w-6 h-6 transform rounded-full transition-transform duration-300 ${
          isDarkMode ? "translate-x-6 bg-gray-800" : "translate-x-0 bg-white"
        }`}
      />
      <span className="sr-only">{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
      <span
        className={`absolute left-1 text-xs ${
          isDarkMode ? "text-gray-400" : "text-gray-700"
        }`}
      >
        ☀️
      </span>
      <span
        className={`absolute right-1 text-xs ${
          isDarkMode ? "text-gray-200" : "text-gray-500"
        }`}
      >
        🌙
      </span>
    </button>
  );
};

export default ToggleButton;
