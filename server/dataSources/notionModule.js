// notionModule.js
const { Client } = require("@notionhq/client");

module.exports = {
  fetchData: async (user) => {
    try {
      const notion = new Client({ auth: user.integrations.notion.apiKey });

      const databases = await notion.databases.list();
      const pages = await notion.search({
        filter: { property: "object", value: "page" },
      });

      return {
        databases: databases.results,
        pages: pages.results,
      };
    } catch (error) {
      console.error("Notion data fetch error:", error);
      throw new Error("Failed to fetch Notion data");
    }
  },
};
