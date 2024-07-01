import React, { useState } from "react";
import {
  Home,
  BarChart2,
  History,
  Database,
  Link,
  Bell,
  HelpCircle,
  Send,
} from "lucide-react";
import { getResponse } from "../apiService"; // Import the API service

const AskBoomAI = () => {
  const [query, setQuery] = useState("");
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      setLoading(true);
      try {
        const aiResponse = await getResponse(query); // Get response from OpenAI API
        setResponses([...responses, { query, response: aiResponse }]);
      } catch (error) {
        console.error("Error fetching AI response:", error);
        setResponses([
          ...responses,
          { query, response: "An error occurred. Please try again." },
        ]);
      }
      setLoading(false);
      setQuery("");
    }
  };

  const navItems = [
    { icon: Home, label: "Home" },
    { icon: BarChart2, label: "Dashboard" },
    { icon: History, label: "History" },
    { icon: Database, label: "Data room Reports" },
    { icon: Link, label: "Connections" },
    { icon: Bell, label: "Notifications" },
    { icon: HelpCircle, label: "Ask Boom AI" },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="w-72 bg-gradient-to-b from-gray-800 to-gray-900 p-6 flex flex-col shadow-lg">
        <div className="flex items-center mb-12">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full mr-4 shadow-lg"></div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-500">
            Boom AI
          </h1>
        </div>
        <nav className="flex-grow">
          {navItems.map(({ icon: Icon, label }) => (
            <a
              key={label}
              href="#"
              className="flex items-center py-3 px-4 hover:bg-gray-700 rounded-lg mb-2 transition-all duration-200 ease-in-out transform hover:scale-105"
            >
              <Icon className="mr-4" size={20} />
              {label}
            </a>
          ))}
        </nav>
        <button className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 px-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105">
          Upgrade
        </button>
      </div>

      <div className="flex-1 p-10 overflow-auto">
        <header className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-500">
            Hello! I am Bobby
          </h2>
          <div className="flex space-x-4">
            <button className="bg-gradient-to-r from-orange-400 to-pink-500 text-white py-2 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105">
              View Settings
            </button>
            <button className="bg-gradient-to-r from-orange-400 to-pink-500 text-white py-2 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105">
              Saved Prompts
            </button>
            <button className="bg-gradient-to-r from-orange-400 to-pink-500 text-white py-2 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105">
              + New Query
            </button>
          </div>
        </header>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl">
          <h3 className="text-2xl mb-6 font-semibold text-gray-100">
            What questions do you have about your business?
          </h3>
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type your Prompt here..."
              className="w-full bg-gray-700 p-4 pr-12 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200 ease-in-out"
              disabled={loading}
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-500 hover:text-pink-500 transition-colors duration-200"
              disabled={loading}
            >
              <Send size={24} />
            </button>
          </form>
        </div>

        <div className="mt-12 space-y-6">
          {responses.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-xl"
            >
              <p className="font-semibold text-orange-400 mb-2">
                Q: {item.query}
              </p>
              <p className="text-gray-300">A: {item.response}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AskBoomAI;
