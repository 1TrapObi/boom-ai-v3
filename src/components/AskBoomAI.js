import React, { useState } from "react";

const navItems = [
  { icon: "🏠", label: "Home" },
  { icon: "🤖", label: "Ask Boom AI" },
  { icon: "📊", label: "Reports" },
  { icon: "🕒", label: "History" },
  { icon: "🔗", label: "Data Connections" },
];

const suggestedPrompts = [
  "How are we doing this month?",
  "How can I increase my sales?",
  "What is my financial story?",
];

const AskBoomAI = () => {
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted query:", query);
    setQuery("");
  };

  const handleSuggestedPrompt = (prompt) => {
    setQuery(prompt);
    setShowModal(false);
  };

  return (
    <div className="flex h-screen bg-[#1a1e2e] text-white">
      {/* Sidebar */}
      <div className="w-64 bg-[#141824] p-6 flex flex-col">
        <div className="flex items-center mb-12">
          <img
            src="/boom-logo.png"
            alt="Boom AI Logo"
            className="w-8 h-8 mr-3"
          />
          <h1 className="text-xl font-bold text-boom-orange">Boom AI</h1>
        </div>
        <nav className="flex-grow">
          {navItems.map(({ icon, label }) => (
            <button
              key={label}
              className="flex items-center w-full py-3 px-4 text-gray-400 hover:bg-[#1f2537] rounded-lg mb-2 transition-colors duration-200"
            >
              <span className="mr-3 text-xl">{icon}</span>
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-10 flex flex-col">
        <header className="flex justify-end mb-12">
          <div className="flex space-x-4">
            {["Settings", "Suggested Prompts", "+ New Query"].map(
              (label, index) => (
                <button
                  key={index}
                  onClick={() =>
                    label === "Suggested Prompts" && setShowModal(true)
                  }
                  className="bg-boom-orange text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-all duration-200"
                >
                  {label}
                </button>
              )
            )}
          </div>
        </header>

        <div className="flex-grow flex items-center justify-center">
          <div className="w-full max-w-3xl bg-[#1f2537] p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl mb-8 font-semibold text-boom-orange text-center">
              What questions do you have about your business?
            </h3>
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask a Question..."
                className="w-full p-4 pr-24 rounded-lg bg-[#2a3144] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-boom-orange"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-boom-orange text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-all duration-200"
              >
                Boom
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal for Suggested Prompts */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-[#1f2537] p-6 rounded-lg w-full max-w-md">
            <h4 className="text-xl font-semibold mb-4 text-boom-orange">
              Suggested Prompts
            </h4>
            {suggestedPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedPrompt(prompt)}
                className="block w-full text-left p-3 hover:bg-[#2a3144] rounded transition-colors duration-200 mb-2 text-white"
              >
                {prompt}
              </button>
            ))}
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-boom-orange text-white py-2 px-4 rounded-lg w-full hover:bg-opacity-90 transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AskBoomAI;
