const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find the user in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Compare provided password with stored hash using your model method
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate a JWT token using your secret
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || "towtrucks2025",
            { expiresIn: "24h" }
        );

        res.json({
            success: true,
            message: "Login successful",
            token,
            userId: user._id,
            role: user.role,
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
