const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/requireAuth");
const { requireAdmin } = require("../middleware/requireAdmin");
const adminController = require("../controllers/adminController");

router.use(requireAuth);
router.use(requireAdmin);

router.get("/stats", adminController.getStats);
router.get("/users", adminController.getAllUsers);
router.delete("/users/:id", adminController.deleteUser);
router.patch("/users/:id/role", adminController.updateUserRole);
router.get("/towtrucks", adminController.getAllTowTrucks);
router.delete("/towtrucks/:id", adminController.deleteTowTruck);

module.exports = router;
