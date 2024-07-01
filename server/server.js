const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

require("./passport-config");

const authRoutes = require("./routes/auth");

const app = express();

const mongoUri =
  process.env.MONGODB_URI ||
  "mongodb+srv://obi:AllMoneyIn5!@boomcustomer.zj5blyf.mongodb.net/";

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

app.use("/auth", authRoutes);

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

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
