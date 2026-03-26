const jwt = require("jsonwebtoken");

exports.requireAuth = (req, res, next) => {
    try {
        // 1. Check for the Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: "No token provided" });
        }

        // 2. Extract the token (assuming format "Bearer <token>")
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Malformed token" });
        }

        // 3. Verify the token using the secret key from the environment
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "towtrucks2025"
        );

        // 4. Attach the decoded user info to req.user for downstream usage
        req.user = decoded;

        // 5. Continue to the next middleware or route handler
        next();
    } catch (error) {
        console.error("JWT verification error:", error);
        return res.status(403).json({ error: "Invalid or expired token" });
    }
};
