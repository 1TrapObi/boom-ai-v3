import React, { useState } from "react";
import {
  Home,
  BarChart2,
  Clock,
  FileText,
  Link,
  Bell,
  HelpCircle,
  Search,
  Plus,
  ChevronDown,
} from "lucide-react";

const Sidebar = () => (
  <div className="w-64 bg-gray-900 text-white p-4 flex flex-col h-screen">
    <div className="flex items-center mb-8">
      <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mr-2"></div>
      <span className="text-xl font-bold">Boom AI</span>
    </div>
    <nav className="flex-grow">
      {[
        { icon: Home, label: "Home" },
        { icon: BarChart2, label: "Dashboard" },
        { icon: Clock, label: "History" },
        { icon: FileText, label: "Reports", active: true },
        { icon: Link, label: "Connections" },
        { icon: Bell, label: "Notifications" },
        { icon: HelpCircle, label: "Ask Boom AI" },
      ].map(({ icon: Icon, label, active }) => (
        <a
          key={label}
          href="#"
          className={`flex items-center py-2 px-4 ${
            active ? "text-white bg-gray-800" : "text-gray-400 hover:text-white"
          }`}
        >
          <Icon className="mr-2" size={20} />
          {label}
        </a>
      ))}
    </nav>
    <button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2 px-4 rounded-md hover:from-orange-600 hover:to-pink-600 transition duration-300">
      Upgrade
    </button>
  </div>
);

const Header = () => (
  <div className="flex justify-between items-center mb-8">
    <h1 className="text-3xl font-bold text-white">Reports</h1>
    <div className="space-x-2">
      <button className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300">
        View Settings
      </button>
      <button className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300">
        New Report
      </button>
    </div>
  </div>
);

const SearchBar = () => (
  <div className="relative mb-6">
    <input
      type="text"
      placeholder="Search reports..."
      className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
    />
    <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
  </div>
);

const ReportList = () => {
  const reports = [
    { id: 1, title: "Q2 Financial Summary", date: "2023-06-30", type: "PDF" },
    {
      id: 2,
      title: "Marketing Campaign Results",
      date: "2023-07-15",
      type: "Chart",
    },
    {
      id: 3,
      title: "Customer Satisfaction Survey",
      date: "2023-08-01",
      type: "Doc",
    },
  ];

  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <div
          key={report.id}
          className="bg-gray-800 p-4 rounded-md flex justify-between items-center"
        >
          <div>
            <h3 className="text-lg font-semibold text-white">{report.title}</h3>
            <p className="text-sm text-gray-400">
              {report.date} • {report.type}
            </p>
          </div>
          <button className="text-orange-500 hover:text-orange-600">
            View
          </button>
        </div>
      ))}
    </div>
  );
};

const ReportCollections = () => {
  const collections = [
    "Financial",
    "Marketing",
    "Operations",
    "Human Resources",
  ];

  return (
    <div className="bg-gray-800 p-4 rounded-md">
      <h2 className="text-xl font-bold text-white mb-4">Collections</h2>
      <ul className="space-y-2">
        {collections.map((collection) => (
          <li
            key={collection}
            className="flex items-center justify-between text-gray-400 hover:text-white cursor-pointer"
          >
            <span>{collection}</span>
            <ChevronDown size={16} />
          </li>
        ))}
      </ul>
      <button className="mt-4 text-orange-500 hover:text-orange-600 flex items-center">
        <Plus size={16} className="mr-1" /> Add Collection
      </button>
    </div>
  );
};

const ReportsPage = () => (
  <div className="flex bg-gray-900 min-h-screen text-white">
    <Sidebar />
    <main className="flex-grow p-8">
      <Header />
      <div className="flex gap-8">
        <div className="flex-grow">
          <SearchBar />
          <ReportList />
        </div>
        <div className="w-64">
          <ReportCollections />
        </div>
      </div>
    </main>
  </div>
);

export default ReportsPage;
