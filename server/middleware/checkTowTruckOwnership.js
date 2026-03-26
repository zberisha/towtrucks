const TowTruck = require("../models/TowTruck");

exports.checkTowTruckOwnership = async (req, res, next) => {
  try {
    const { id } = req.params; // TowTruck ID from URL
    const towTruck = await TowTruck.findById(id);

    if (!towTruck) {
      return res.status(404).json({ error: "Tow truck not found" });
    }

    // Get the user id from the request header (client should set it from session storage)
    const clientUserId = req.headers["x-user-id"];
    if (!clientUserId) {
      return res.status(401).json({ error: "User ID not provided in headers" });
    }

    // Compare the tow truck's user field with the user id from the client
    if (towTruck.user.toString() !== clientUserId.toString()) {
      return res.status(403).json({ error: "Unauthorized to modify this resource" });
    }

    next();
  } catch (error) {
    console.error("Error verifying tow truck ownership:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
