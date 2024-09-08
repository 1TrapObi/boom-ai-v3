const express = require("express");
const router = express.Router();
const {
  integrateData,
  getIntegrationStatus,
  connectIntegration,
  disconnectIntegration,
} = require("../integrations/dataIntegrations");
const User = require("../models/User"); // Make sure to adjust this path to your User model

router.get("/status", (req, res) => {
  const status = getIntegrationStatus(req.user);
  res.json(status);
});

router.post("/connect", async (req, res) => {
  const { integration, credentials } = req.body;
  try {
    const result = await connectIntegration(req.user, integration, credentials);
    res.json(result);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.post("/disconnect", async (req, res) => {
  const { integration } = req.body;
  try {
    const result = await disconnectIntegration(req.user, integration);
    res.json(result);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.get("/data", async (req, res) => {
  try {
    const { integrationResults, errors } = await integrateData(req.user);
    res.json({ success: true, data: integrationResults, errors });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// New route for sending test integration data
router.post("/test-integration", async (req, res) => {
  try {
    const { userId, integrationData } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add or update integration data
    user.integrations = user.integrations || {};
    user.integrations.testIntegration = integrationData;

    await user.save();

    res
      .status(200)
      .json({ message: "Test integration data saved successfully" });
  } catch (error) {
    console.error("Error in test integration:", error);
    res.status(500).json({ message: "Error saving test integration data" });
  }
});

// New route for fetching test integration data
router.get("/test-integration/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const testIntegrationData = user.integrations?.testIntegration || null;
    res.status(200).json({ testIntegrationData });
  } catch (error) {
    console.error("Error fetching test integration data:", error);
    res.status(500).json({ message: "Error fetching test integration data" });
  }
});

module.exports = router;
