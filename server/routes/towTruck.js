const express = require("express");
const router = express.Router();
const towTruckController = require("../controllers/towTruckController");
const { checkTowTruckOwnership } = require("../middleware/checkTowTruckOwnership");
const { requireAuth } = require("../middleware/requireAuth");
const { validateTowTruck } = require("../middleware/validateTowTruck");

router.post("/", requireAuth, validateTowTruck, towTruckController.createTowTruck);

// Get all tow trucks (public)
router.get("/", towTruckController.getAllTowTrucks);

// Get all tow trucks for a specific user (protected)
router.get("/user/:userId", requireAuth, towTruckController.getTowTrucksByUserId);

// Get one tow truck by ID (public)
// Note: this route comes after "/user/:userId" to prevent route conflicts.
router.get("/:id", towTruckController.getTowTruckById);

// Update a tow truck: must be owner
router.put("/:id", requireAuth, towTruckController.updateTowTruck);

// Delete a tow truck: must be owner
router.delete("/:id", requireAuth, towTruckController.deleteTowTruck);

module.exports = router;
