// server/routes/user.js

const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Import the User model

// Define your routes here
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add more routes as needed

module.exports = router;
