const TowTruck = require("../models/TowTruck");

// CREATE a TowTruck
exports.createTowTruck = async (req, res) => {
    try {
        const { businessName, phoneNumber, description, coords, user } = req.body;
        // Alternatively, if using JWT auth, you might get the userId from req.user:
        // const userId = req.user._id;

        const newTowTruck = await TowTruck.create({
            businessName,
            phoneNumber,
            description,
            coords, // { lat, lng }
            user, // or user: userId if using JWT auth
        });

        return res.status(201).json(newTowTruck);
    } catch (error) {
        console.error("Error creating tow truck:", error);
        return res.status(400).json({ error: error.message });
    }
};

// READ all TowTrucks
exports.getAllTowTrucks = async (req, res) => {
    try {
        // Populate the user field to get user details (username, email)
        const towTrucks = await TowTruck.find().populate("user", "username email");
        return res.json(towTrucks);
    } catch (error) {
        console.error("Error fetching tow trucks:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// READ a single TowTruck by ID
exports.getTowTruckById = async (req, res) => {
    try {
        const { id } = req.params;
        const towTruck = await TowTruck.findById(id).populate("user", "username email");

        if (!towTruck) {
            return res.status(404).json({ error: "Tow truck not found" });
        }

        return res.json(towTruck);
    } catch (error) {
        console.error("Error fetching tow truck:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// UPDATE a TowTruck
exports.updateTowTruck = async (req, res) => {
    try {
        const { id } = req.params;
        const { businessName, phoneNumber, description, coords } = req.body;

        const updatedTowTruck = await TowTruck.findByIdAndUpdate(
            id,
            { businessName, phoneNumber, description, coords },
            { new: true } // returns the updated document
        );

        if (!updatedTowTruck) {
            return res.status(404).json({ error: "Tow truck not found" });
        }

        return res.json(updatedTowTruck);
    } catch (error) {
        console.error("Error updating tow truck:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// DELETE a TowTruck
exports.deleteTowTruck = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Attempting to delete tow truck with id:", id);
        const deletedTowTruck = await TowTruck.findByIdAndDelete(id);
        if (!deletedTowTruck) {
            return res.status(404).json({ error: "Tow truck not found" });
        }
        return res.json({ message: "Tow truck deleted successfully" });
    } catch (error) {
        console.error("Error deleting tow truck:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


// GET all TowTrucks for a specific user
exports.getTowTrucksByUserId = async (req, res) => {
    try {
        // Assuming the user id is passed as a URL parameter
        const { userId } = req.params;

        // Find all tow trucks where the user field matches the given userId
        const towTrucks = await TowTruck.find({ user: userId }).populate("user", "username email");

        return res.json(towTrucks);
    } catch (error) {
        console.error("Error fetching tow trucks by user:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
