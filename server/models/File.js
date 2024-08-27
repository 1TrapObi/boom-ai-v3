// models/File.js
const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  name: String,
  type: String, // 'pdf' or 'csv'
  content: Buffer,
  uploadDate: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("File", FileSchema);
