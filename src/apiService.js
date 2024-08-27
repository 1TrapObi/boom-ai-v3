// src/apiService.js
import axios from "axios";

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const openai = axios.create({
  baseURL: "https://api.openai.com/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Important for handling authentication cookies
});

// OpenAI API
export const getResponse = async (prompt) => {
  try {
    const response = await openai.post("/completions", {
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 100,
    });
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error(
      "Error making request to OpenAI:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to get response from OpenAI");
  }
};

// Backend API routes
export const login = (credentials) => api.post("/auth/login", credentials);
export const signup = (userData) => api.post("/auth/signup", userData);
export const logout = () => api.post("/auth/logout");

export const getUserProfile = () => api.get("/user/profile");

export const getIntegrationStatus = () => api.get("/integration/status");
export const connectIntegration = (integration, credentials) =>
  api.post("/integration/connect", { integration, credentials });
export const disconnectIntegration = (integration) =>
  api.post("/integration/disconnect", { integration });
export const fetchIntegratedData = () => api.get("/integration/data");

// Test integration functions
export const sendTestIntegrationData = (userId, integrationData) =>
  api.post("/integration/test-integration", { userId, integrationData });

export const fetchTestIntegrationData = (userId) =>
  api.get(`/integration/test-integration/${userId}`);

// New Shopify integration functions
export const integrateShopify = () =>
  api.post("/api/shopify/integrate-shopify");
export const fetchShopifyData = () => api.get("/api/shopify/fetch-data");

// Interceptor for handling authentication errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect to login page or refresh token
      // This depends on your authentication strategy
      console.log("Authentication error. Redirecting to login...");
      // Example: window.location = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
