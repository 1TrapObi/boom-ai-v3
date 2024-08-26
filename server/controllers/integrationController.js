const { integrateData } = require("../integrations/dataIntegration");

exports.runIntegration = async (req, res) => {
  try {
    const integrationResults = await integrateData(req.user);
    res.json({ success: true, data: integrationResults });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateIntegration = async (req, res) => {
  try {
    const { integration, apiKey } = req.body;
    req.user.integrations[integration].apiKey = apiKey;
    await req.user.save();
    res.json({ success: true, message: "Integration updated" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
