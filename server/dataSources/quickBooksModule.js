// quickBooksModule.js
const OAuthClient = require("intuit-oauth");
const QuickBooks = require("node-quickbooks");

module.exports = {
  fetchData: async (user) => {
    try {
      const oauthClient = new OAuthClient({
        clientId: process.env.QB_CLIENT_ID,
        clientSecret: process.env.QB_CLIENT_SECRET,
        environment: "sandbox", // or 'production'
        redirectUri: process.env.QB_REDIRECT_URI,
      });

      // Note: You need to handle token refresh if it's expired
      oauthClient.setToken(user.integrations.quickBooks.token);

      const qbo = new QuickBooks(
        process.env.QB_CLIENT_ID,
        process.env.QB_CLIENT_SECRET,
        user.integrations.quickBooks.token.access_token,
        false, // no token secret for oAuth 2.0
        user.integrations.quickBooks.realmId,
        true, // use the sandbox?
        false, // enable debugging?
        null, // set minorversion, or null for the latest version
        "2.0", // oAuth version
        user.integrations.quickBooks.token.refresh_token
      );

      const companyInfo = await new Promise((resolve, reject) => {
        qbo.getCompanyInfo(
          user.integrations.quickBooks.realmId,
          (err, companyInfo) => {
            if (err) reject(err);
            else resolve(companyInfo);
          }
        );
      });

      return { companyInfo };
    } catch (error) {
      console.error("QuickBooks data fetch error:", error);
      throw new Error("Failed to fetch QuickBooks data");
    }
  },
};
