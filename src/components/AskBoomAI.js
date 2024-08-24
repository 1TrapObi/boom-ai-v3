import React, { useState } from "react";
import { Link } from "react-router-dom";

const AskBoomAI = () => {
  const [prompt, setPrompt] = useState("");
  const [insights, setInsights] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestedPrompts, setShowSuggestedPrompts] = useState(false);

  const suggestedPrompts = [
    "How are we doing this month?",
    "How can I increase my sales?",
    "What is my financial story?",
  ];

  const handlePromptSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    try {
      // Simulating API call
      const response = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              data: {
                insights: "Here are some insights based on your prompt...",
              },
            }),
          2000
        )
      );
      setInsights(response.data.insights);
    } catch (error) {
      console.error("Failed to get insights:", error);
      setInsights("Failed to generate insights. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedPromptClick = (suggestedPrompt) => {
    setPrompt(suggestedPrompt);
    setShowSuggestedPrompts(false);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="w-64 bg-gray-800 p-5">
        <div className="flex items-center mb-12">
          <img
            src="/boom-logo.png"
            alt="Boom AI Logo"
            className="w-8 h-8 mr-3"
          />
          <h1 className="text-3xl font-extrabold text-orange-500">Boom AI</h1>
        </div>
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className="flex items-center py-2 px-4 hover:bg-gray-700 rounded"
            >
              <span className="mr-2">🏠</span>Home
            </Link>
          </li>
          <li>
            <Link
              to="/ask-boom-ai"
              className="flex items-center py-2 px-4 bg-gray-700 rounded"
            >
              <span className="mr-2">🤖</span>Ask Boom AI
            </Link>
          </li>
          <li>
            <Link
              to="/reports"
              className="flex items-center py-2 px-4 hover:bg-gray-700 rounded"
            >
              <span className="mr-2">📊</span>Reports
            </Link>
          </li>
          <li>
            <Link
              to="/history"
              className="flex items-center py-2 px-4 hover:bg-gray-700 rounded"
            >
              <span className="mr-2">🕒</span>History
            </Link>
          </li>
          <li>
            <Link
              to="/data-connections"
              className="flex items-center py-2 px-4 hover:bg-gray-700 rounded"
            >
              <span className="mr-2">🔗</span>Data Connections
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main content */}
      <main className="flex-1 p-10 relative">
        <div className="max-w-4xl mx-auto">
          {/* Top buttons */}
          <div className="flex justify-end mb-8 space-x-4">
            <button className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors duration-200">
              Settings
            </button>
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors duration-200"
              onClick={() => setShowSuggestedPrompts(true)}
            >
              Suggested Prompts
            </button>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors duration-200">
              + New Query
            </button>
          </div>

          {/* Prompt input */}
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-orange-500">
              What questions do you have about your business?
            </h2>
            <form
              onSubmit={handlePromptSubmit}
              className="flex items-center bg-gray-700 rounded-full overflow-hidden"
            >
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask a Question..."
                className="flex-grow px-6 py-3 bg-transparent text-white focus:outline-none"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-orange-500 text-white px-6 py-3 hover:bg-orange-600 transition-colors duration-200 disabled:opacity-50"
              >
                {isLoading ? "Processing..." : "Boom"}
              </button>
            </form>
          </div>

          {/* Insights display */}
          {insights && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-orange-500">
                Insights
              </h3>
              <p className="text-gray-300">{insights}</p>
            </div>
          )}
        </div>

        {/* Suggested Prompts Modal */}
        {showSuggestedPrompts && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded-lg w-96">
              <h3 className="text-xl font-bold mb-4 text-orange-500">
                Suggested Prompts
              </h3>
              <ul className="space-y-2">
                {suggestedPrompts.map((suggestedPrompt, index) => (
                  <li key={index}>
                    <button
                      className="w-full text-left p-2 hover:bg-gray-700 rounded transition-colors duration-200"
                      onClick={() =>
                        handleSuggestedPromptClick(suggestedPrompt)
                      }
                    >
                      {suggestedPrompt}
                    </button>
                  </li>
                ))}
              </ul>
              <button
                className="mt-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-200"
                onClick={() => setShowSuggestedPrompts(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AskBoomAI;
