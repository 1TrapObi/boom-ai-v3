// routes/shopifyIntegration.js

const express = require("express");
const router = express.Router();
const { createMockShopifyData } = require("../utils/mockShopifyData");
const { storeShopifyData } = require("../services/shopifyService");

router.post("/integrate-shopify", async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have authentication middleware
    const mockData = createMockShopifyData();
    await storeShopifyData(mockData, userId);
    res.status(200).json({ message: "Shopify data integrated successfully" });
  } catch (error) {
    console.error("Error in Shopify integration:", error);
    res.status(500).json({ message: "Error integrating Shopify data" });
  }
});

module.exports = router;
