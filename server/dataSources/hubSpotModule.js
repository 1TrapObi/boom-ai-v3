// hubSpotModule.js
const hubspot = require("@hubspot/api-client");

module.exports = {
  fetchData: async (user) => {
    try {
      const hubspotClient = new hubspot.Client({
        accessToken: user.integrations.hubSpot.accessToken,
      });

      const contacts = await hubspotClient.crm.contacts.getAll();
      const deals = await hubspotClient.crm.deals.getAll();

      return { contacts, deals };
    } catch (error) {
      console.error("HubSpot data fetch error:", error);
      throw new Error("Failed to fetch HubSpot data");
    }
  },
};
