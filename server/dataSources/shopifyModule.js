// shopifyModule.js
const Shopify = require("shopify-api-node");

module.exports = {
  fetchData: async (user) => {
    try {
      const shopify = new Shopify({
        shopName: user.integrations.shopify.shopName,
        accessToken: user.integrations.shopify.accessToken,
      });

      const products = await shopify.product.list({ limit: 250 });
      const orders = await shopify.order.list({ limit: 250 });

      return { products, orders };
    } catch (error) {
      console.error("Shopify data fetch error:", error);
      throw new Error("Failed to fetch Shopify data");
    }
  },
};
