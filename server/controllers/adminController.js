const User = require("../models/User");
const TowTruck = require("../models/TowTruck");

exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTowTrucks = await TowTruck.countDocuments();
    const totalAdmins = await User.countDocuments({ role: "admin" });
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("username email role createdAt");
    const recentTowTrucks = await TowTruck.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "username email");

    res.json({
      totalUsers,
      totalTowTrucks,
      totalAdmins,
      recentUsers,
      recentTowTrucks,
    });
  } catch (error) {
    console.error("Stats error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (id === req.user.userId) {
      return res.status(400).json({ error: "Cannot delete your own account" });
    }

    await TowTruck.deleteMany({ user: id });
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User and their tow trucks deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllTowTrucks = async (req, res) => {
  try {
    const towTrucks = await TowTruck.find()
      .populate("user", "username email")
      .sort({ createdAt: -1 });
    res.json(towTrucks);
  } catch (error) {
    console.error("Admin get towtrucks error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteTowTruck = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await TowTruck.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Tow truck not found" });
    }
    res.json({ message: "Tow truck deleted successfully" });
  } catch (error) {
    console.error("Admin delete towtruck error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    if (id === req.user.userId) {
      return res.status(400).json({ error: "Cannot change your own role" });
    }

    const updated = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    ).select("-password");

    if (!updated) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error("Update role error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
