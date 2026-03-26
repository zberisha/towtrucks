const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session"); // Import cookie-session
const authRoutes = require("./routes/auth");
require("dotenv").config();
const towTruckRoutes = require("./routes/towTruck");
const adminRoutes = require("./routes/admin");

const app = express();


app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your client URL
    credentials: true,
  })
);


// Middleware to parse JSON bodies
app.use(express.json());

// Configure cookie-session middleware before mounting routes
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SESSION_SECRET || "your-secret-key-here"],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secure: process.env.NODE_ENV === "production", 
  })
);


app.use("/api", authRoutes);
app.use("/api/towtrucks", towTruckRoutes);
app.use("/api/admin", adminRoutes);

// Connect to MongoDB (update the connection string as needed)
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
