// mailChimpModule.js
const mailchimp = require("@mailchimp/mailchimp_marketing");

module.exports = {
  fetchData: async (user) => {
    try {
      mailchimp.setConfig({
        apiKey: user.integrations.mailChimp.apiKey,
        server: user.integrations.mailChimp.server,
      });

      const lists = await mailchimp.lists.getAllLists();
      const campaigns = await mailchimp.campaigns.list();

      return { lists, campaigns };
    } catch (error) {
      console.error("MailChimp data fetch error:", error);
      throw new Error("Failed to fetch MailChimp data");
    }
  },
};
