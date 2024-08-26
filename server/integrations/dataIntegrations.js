// server/integrations/dataIntegration.js

const stripeModule = require("../dataSources/stripeModule");
const notionModule = require("../dataSources/notionModule");
const quickBooksModule = require("../dataSources/quickBooksModule");
const shopifyModule = require("../dataSources/shopifyModule");
const hubSpotModule = require("../dataSources/hubSpotModule");
const mailChimpModule = require("../dataSources/mailChimpModule");

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchWithRetry = async (fetchFunction, user, retries = 0) => {
  try {
    return await fetchFunction(user);
  } catch (error) {
    if (retries < MAX_RETRIES) {
      console.log(`Retrying... Attempt ${retries + 1} of ${MAX_RETRIES}`);
      await wait(RETRY_DELAY);
      return fetchWithRetry(fetchFunction, user, retries + 1);
    } else {
      throw error;
    }
  }
};

const integrationModules = {
  stripe: stripeModule,
  notion: notionModule,
  quickBooks: quickBooksModule,
  shopify: shopifyModule,
  hubSpot: hubSpotModule,
  mailChimp: mailChimpModule,
};

const integrateData = async (user) => {
  const integrationResults = {};
  const errors = [];

  for (const [integration, module] of Object.entries(integrationModules)) {
    if (
      user.integrations[integration] &&
      user.integrations[integration].isConnected
    ) {
      try {
        integrationResults[integration] = await fetchWithRetry(
          module.fetchData,
          user
        );
        console.log(`Successfully fetched data from ${integration}`);
      } catch (error) {
        console.error(`Error fetching data from ${integration}:`, error);
        errors.push({ integration, error: error.message });
        integrationResults[integration] = { error: error.message };
      }
    }
  }

  return { integrationResults, errors };
};

const getIntegrationStatus = (user) => {
  const status = {};
  for (const integration of Object.keys(integrationModules)) {
    status[integration] = user.integrations[integration]
      ? user.integrations[integration].isConnected
      : false;
  }
  return status;
};

const connectIntegration = async (user, integration, credentials) => {
  if (!integrationModules[integration]) {
    throw new Error(`Unsupported integration: ${integration}`);
  }

  try {
    // Here you would typically validate the credentials with the service
    // For this example, we'll just assume they're valid if provided
    user.integrations[integration] = {
      isConnected: true,
      ...credentials,
    };
    await user.save();
    return { success: true, message: `${integration} connected successfully` };
  } catch (error) {
    console.error(`Error connecting ${integration}:`, error);
    return { success: false, error: error.message };
  }
};

const disconnectIntegration = async (user, integration) => {
  if (!user.integrations[integration]) {
    throw new Error(`Integration not found: ${integration}`);
  }

  try {
    user.integrations[integration].isConnected = false;
    // Clear sensitive data
    for (const key in user.integrations[integration]) {
      if (key !== "isConnected") {
        user.integrations[integration][key] = undefined;
      }
    }
    await user.save();
    return {
      success: true,
      message: `${integration} disconnected successfully`,
    };
  } catch (error) {
    console.error(`Error disconnecting ${integration}:`, error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  integrateData,
  getIntegrationStatus,
  connectIntegration,
  disconnectIntegration,
};
