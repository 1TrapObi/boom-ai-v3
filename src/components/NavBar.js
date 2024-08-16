import React from "react";

const navItems = [
  {
    icon: "🏠",
    label: "Home",
    description: "Central hub for all your activities.",
  },
  {
    icon: "🤖",
    label: "Ask Boom AI",
    description: "Find answers and insights using AI-driven search.",
  },
  {
    icon: "📊",
    label: "Reports",
    description: "Access and generate detailed data reports.",
  },
  {
    icon: "🕒",
    label: "History",
    description: "View your recent activity and data interactions.",
  },
  {
    icon: "🔗",
    label: "Data Connections",
    description: "Manage your integrated data sources.",
  },
];

const NavBar = () => (
  <div className="w-72 bg-gray-900 p-6 flex flex-col shadow-lg h-screen">
    <div className="flex items-center mb-12">
      <img src="/boom-logo.png" alt="Boom AI Logo" className="w-12 h-12 mr-4" />
      <h1 className="text-2xl font-bold text-boom-orange">Boom AI</h1>
    </div>
    <nav className="flex-grow">
      {navItems.map(({ icon, label, description }) => (
        <div key={label} className="relative group mb-2">
          <button className="flex items-center w-full py-3 px-4 rounded-lg text-gray-300 hover:bg-nav-hover transition-all duration-200 ease-in-out group-hover:text-boom-orange group-hover:translate-x-2">
            <span className="mr-4 text-xl" role="img" aria-label={label}>
              {icon}
            </span>
            {label}
          </button>
          <div className="absolute left-full ml-2 top-0 w-64 p-2 bg-nav-hover text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out pointer-events-none">
            {description}
          </div>
        </div>
      ))}
    </nav>
  </div>
);

export default NavBar;
