import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SignUp from "./components/SignUp";
import Welcome from "./components/Welcome";
import RoleSelection from "./components/RoleSelection";
import DataSourceSelection from "./components/DataSourceSelection";
import ConfirmSelection from "./components/ConfirmSelection";
import AskBoomAI from "./components/AskBoomAI";
import ShopifyIntegration from "./components/ShopifyIntegration"; // Import the new component

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Router>
        <nav className="p-4 bg-gray-800">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-gray-300">
                Sign Up
              </Link>
            </li>
            <li>
              <Link to="/welcome" className="hover:text-gray-300">
                Welcome
              </Link>
            </li>
            <li>
              <Link to="/role-selection" className="hover:text-gray-300">
                Role Selection
              </Link>
            </li>
            <li>
              <Link to="/data-source-selection" className="hover:text-gray-300">
                Data Source Selection
              </Link>
            </li>
            <li>
              <Link to="/ask-boom-ai" className="hover:text-gray-300">
                Ask Boom AI
              </Link>
            </li>
            <li>
              <Link to="/shopify-integration" className="hover:text-gray-300">
                Shopify Integration
              </Link>
            </li>
          </ul>
        </nav>

        <div className="container mx-auto mt-8">
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/role-selection" element={<RoleSelection />} />
            <Route
              path="/data-source-selection"
              element={<DataSourceSelection />}
            />
            <Route
              path="/confirm-selection/:source"
              element={<ConfirmSelection />}
            />
            <Route path="/ask-boom-ai" element={<AskBoomAI />} />
            <Route
              path="/shopify-integration"
              element={<ShopifyIntegration />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
