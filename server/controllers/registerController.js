const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, role } = req.body;

    // Check that required fields are provided
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Ensure password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Check if a user with the given email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User with this email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user; if no role provided, default to "user"
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: "user",
    });

    await newUser.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    // Log the full error for debugging purposes
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
