// services/shopifyService.js

const ShopifyData = require("../models/ShopifyData");

const storeShopifyData = async (csvData, userId) => {
  try {
    const newShopifyData = new ShopifyData({
      user: userId,
      data: csvData,
      dataType: "sales",
    });
    await newShopifyData.save();
    console.log("Shopify data stored successfully");
  } catch (error) {
    console.error("Error storing Shopify data:", error);
    throw error;
  }
};

module.exports = { storeShopifyData };
