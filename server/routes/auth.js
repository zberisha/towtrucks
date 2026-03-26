const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/registerController");
const { loginUser } = require("../controllers/loginController");
const { requireAuth } = require("../middleware/requireAuth");

// Registration route
router.post("/register", registerUser);

// Login route – loginUser controller is updated to:
// - Validate credentials,
// - Generate a JWT using process.env.JWT_SECRET,
// - Save the token and user ID in the cookie session (configured in your main app),
// - Return the token and user ID.
router.post("/login", loginUser);

// Logout route – clears the session by setting req.session to null.
router.post("/logout", (req, res) => {
    req.session = null;
    res.json({ success: true, message: "Logged out successfully" });
});

// Example of a protected route using requireAuth middleware:
router.get("/protected", requireAuth, (req, res) => {
    res.json({ message: "This is a protected route", user: req.user });
});

module.exports = router;
