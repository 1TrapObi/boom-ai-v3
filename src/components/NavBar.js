// components/NavBar.js
import React from "react";
import {
  Home,
  BarChart2,
  History,
  Database,
  Link,
  Bell,
  HelpCircle,
} from "lucide-react";

const navItems = [
  { icon: Home, label: "Home" },
  { icon: BarChart2, label: "Dashboard" },
  { icon: History, label: "History" },
  { icon: Database, label: "Data room Reports" },
  { icon: Link, label: "Connections" },
  { icon: Bell, label: "Notifications" },
  { icon: HelpCircle, label: "Ask Boom AI" },
];

const NavBar = () => (
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
);

export default NavBar;
