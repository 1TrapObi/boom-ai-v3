// models/ShopifyData.js

const mongoose = require("mongoose");

const ShopifyDataSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  data: String,
  dataType: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ShopifyData", ShopifyDataSchema);
