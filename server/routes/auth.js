// server/routes/auth.js

const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
  const { email, name } = req.body;
  try {
    const newUser = new User({ email, name });
    await newUser.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    res.status(500).send("Error registering user");
  }
});

module.exports = router;
