import React, { useState } from "react";
import {
  Home,
  BarChart2,
  Clock,
  FileText,
  Link,
  Bell,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import NavBar from "./NavBar"; // Adjust the path as necessary

const ProfileSettingsDashboard = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => setExpanded(!expanded);

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Navigation Bar */}
      <NavBar />

      {/* Main content */}
      <div className="flex-1 p-10 overflow-auto">
        <header className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-500">
            Profile Settings
          </h2>
        </header>
        <div className="flex gap-8">
          {/* Form */}
          <div className="flex-1">{/* Form content */}</div>

          {/* Apps section */}
          <div className="w-80">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-yellow-400">Apps</h2>
              <button className="text-sm bg-gray-800 px-3 py-1 rounded-lg text-orange-500">
                + Add Connections
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <AppCard name="Shopify" color="#96dc49" icon={ShopifyIcon} />
              <AppCard name="Stripe" color="#6772e5" icon={StripeIcon} />
              <AppCard
                name="QuickBooks"
                color="#2ca01c"
                icon={QuickBooksIcon}
              />
            </div>
            {expanded && (
              <div className="grid grid-cols-3 gap-4 mb-4">
                <AppCard name="PayPal" color="#003087" icon={PayPalIcon} />
                <AppCard name="Square" color="#3e4348" icon={SquareIcon} />
                <AppCard name="Xero" color="#13b5ea" icon={XeroIcon} />
              </div>
            )}
            <button
              className="w-full bg-gray-800 text-orange-500 py-2 rounded-lg flex items-center justify-center"
              onClick={toggleExpand}
            >
              {expanded ? "See Less" : "See More"}
              {expanded ? (
                <ChevronUp className="ml-2" size={16} />
              ) : (
                <ChevronDown className="ml-2" size={16} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AppCard = ({ name, color, icon: Icon }) => (
  <div className="bg-gray-800 text-white p-4 rounded-lg flex flex-col items-center justify-center">
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
      style={{ backgroundColor: color }}
    >
      <Icon className="w-8 h-8" />
    </div>
    <span className="text-sm">{name}</span>
  </div>
);

const ShopifyIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.34 7.17c-.1-.2-.3-.39-.51-.46l-.95-.3-.61-1.92a.45.45 0 0 0-.5-.3L12 4.5l-.77-.31a.45.45 0 0 0-.5.3l-.61 1.92-.95.3c-.21.07-.41.26-.51.46l-.65 1.07c-.12.23-.13.49-.03.72l.17.37-1.1 3.46a7.67 7.67 0 0 0-.3 1.99v.09c0 2.21 1.79 4 4 4h4c2.21 0 4-1.79 4-4v-.09c0-.68-.11-1.36-.3-1.99l-1.1-3.46.17-.37c.1-.23.09-.49-.03-.72l-.65-1.07zM12 18.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
  </svg>
);
const StripeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.97 14.56c0-.94-.76-1.7-1.7-1.7-.93 0-1.69.76-1.69 1.7 0 .93.76 1.69 1.69 1.69.94 0 1.7-.76 1.7-1.69zm-3.77-2.87c0-.93-.76-1.69-1.69-1.69-.94 0-1.7.76-1.7 1.69 0 .94.76 1.7 1.7 1.7.93 0 1.69-.76 1.69-1.7zm7.54 2.87c0-.94-.76-1.7-1.7-1.7-.93 0-1.69.76-1.69 1.7 0 .93.76 1.69 1.69 1.69.94 0 1.7-.76 1.7-1.69zm3.77-2.87c0-.93-.76-1.69-1.69-1.69-.94 0-1.7.76-1.7 1.69 0 .94.76 1.7 1.7 1.7.93 0 1.69-.76 1.69-1.7z" />
  </svg>
);
const QuickBooksIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-4.42 3.58-8 8-8 4.42 0 8 3.58 8 8 0 4.42-3.58 8-8 8zm1-13h-2v2h2V7zm-3 0H8v2h2V7zm6 0h-2v2h2V7zm-9 9h8v2H8v-2zm6-4h-2v2h2v-2z" />
  </svg>
);
const PayPalIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-4.42 3.58-8 8-8 4.42 0 8 3.58 8 8 0 4.42-3.58 8-8 8zm1-13h-2v2h2V7zm-3 0H8v2h2V7zm6 0h-2v2h2V7zm-9 9h8v2H8v-2zm6-4h-2v2h2v-2z" />
  </svg>
);
const SquareIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-4.42 3.58-8 8-8 4.42 0 8 3.58 8 8 0 4.42-3.58 8-8 8zm1-13h-2v2h2V7zm-3 0H8v2h2V7zm6 0h-2v2h2V7zm-9 9h8v2H8v-2zm6-4h-2v2h2v-2z" />
  </svg>
);
const XeroIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-4.42 3.58-8 8-8 4.42 0 8 3.58 8 8 0 4.42-3.58 8-8 8zm1-13h-2v2h2V7zm-3 0H8v2h2V7zm6 0h-2v2h2V7zm-9 9h8v2H8v-2zm6-4h-2v2h2v-2z" />
  </svg>
);

export default ProfileSettingsDashboard;
