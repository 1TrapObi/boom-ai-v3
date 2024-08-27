// server/models/User.js

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

const encKey = process.env.ENCRYPTION_KEY;
const sigKey = process.env.SIGNING_KEY;

UserSchema.plugin(encrypt, {
  encryptionKey: encKey,
  signingKey: sigKey,
  encryptedFields: [
    "password",
    "integrations.stripe.apiKey",
    "integrations.notion.apiKey",
    "integrations.quickBooks.accessToken",
    "integrations.quickBooks.refreshToken",
    "integrations.shopify.accessToken",
    "integrations.hubSpot.accessToken",
    "integrations.mailChimp.apiKey",
  ],
});

module.exports = mongoose.model("User", UserSchema);
