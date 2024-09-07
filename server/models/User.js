// models/User.js
console.log(
  "In User model - ENCRYPTION_KEY loaded:",
  !!process.env.ENCRYPTION_KEY
);
console.log("In User model - SIGNING_KEY loaded:", !!process.env.SIGNING_KEY);

const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  integrations: {
    stripe: {
      isConnected: { type: Boolean, default: false },
      apiKey: String,
    },
    notion: {
      isConnected: { type: Boolean, default: false },
      apiKey: String,
    },
    quickBooks: {
      isConnected: { type: Boolean, default: false },
      accessToken: String,
      refreshToken: String,
      realmId: String,
    },
    shopify: {
      isConnected: { type: Boolean, default: false },
      shopName: String,
      accessToken: String,
    },
    hubSpot: {
      isConnected: { type: Boolean, default: false },
      accessToken: String,
    },
    mailChimp: {
      isConnected: { type: Boolean, default: false },
      apiKey: String,
      server: String,
    },
  },
});

// Encryption setup
const encKey = process.env.ENCRYPTION_KEY;
const sigKey = process.env.SIGNING_KEY;

console.log("encKey exists:", !!encKey);
console.log("sigKey exists:", !!sigKey);

UserSchema.plugin(encrypt, {
  encryptionKey: encKey,
  signingKey: sigKey,
  encryptedFields: [
    "integrations.stripe.apiKey",
    "integrations.notion.apiKey",
    "integrations.quickBooks.accessToken",
    "integrations.quickBooks.refreshToken",
    "integrations.shopify.accessToken",
    "integrations.hubSpot.accessToken",
    "integrations.mailChimp.apiKey",
  ],
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = User;
