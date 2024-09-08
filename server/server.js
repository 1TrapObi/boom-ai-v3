const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../src/.env") });
require("dotenv").config();
console.log("ENCRYPTION_KEY loaded:", !!process.env.ENCRYPTION_KEY);
console.log("SIGNING_KEY loaded:", !!process.env.SIGNING_KEY);

const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

require("./passport-config");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const integrationRoutes = require("./routes/integrations");
const shopifyIntegrationRoutes = require("./routes/shopifyIntegration"); // New import

const app = express();

const mongoUri = process.env.MONGODB_URI;

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connected to MongoDB at ${mongoUri}`))
  .catch((err) =>
    console.error(`Failed to connect to MongoDB: ${err.message}`)
  );

app.use(express.json());
app.use(passport.initialize());

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};

// Routes
app.use("/auth", authRoutes);
app.use("/user", isAuthenticated, userRoutes);
app.use("/integrations", isAuthenticated, integrationRoutes);
app.use("/api/shopify", isAuthenticated, shopifyIntegrationRoutes); // New route

// OAuth routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/welcome");
  }
);

app.get("/auth/facebook", passport.authenticate("facebook"));
app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/welcome");
  }
);

app.get(
  "/auth/microsoft",
  passport.authenticate("microsoft", { scope: ["user.read"] })
);
app.get(
  "/auth/microsoft/callback",
  passport.authenticate("microsoft", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/welcome");
  }
);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Backend is successfully deployed and running!');
});
