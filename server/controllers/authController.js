const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, name, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ status: "success", data: newUser });
  } catch (error) {
    res
      .status(400)
      .json({ status: "error", message: "Failed to register user", error });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ status: "success", data: { user, token } });
  } catch (error) {
    res
      .status(400)
      .json({ status: "error", message: "Failed to log in user", error });
  }
};

exports.verifyUser = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ status: "error", message: "Token is not valid" });
    }

    res.status(200).json({ status: "success", data: decoded });
  });
};
