const express = require("express");
const router = express.Router();
const {
  integrateData,
  getIntegrationStatus,
  connectIntegration,
  disconnectIntegration,
} = require("../integrations/dataIntegration");

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

module.exports = router;
