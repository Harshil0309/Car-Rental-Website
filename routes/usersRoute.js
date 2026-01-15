const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

// Middleware to verify super admin
const verifySuperAdmin = async (req, res, next) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "User ID required" });
    }

    const superAdminUser = await User.findOne({ _id: userId });
    if (
      !superAdminUser ||
      (!superAdminUser.isSuperAdmin && superAdminUser.role !== "superadmin")
    ) {
      return res
        .status(403)
        .json({ message: "Access denied. Super Admin privileges required." });
    }
    next();
  } catch (error) {
    return res.status(400).json({ message: "Authentication failed", error });
  }
};

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.send(user);
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    const newuser = new User(req.body);
    await newuser.save();
    res.send("User registered successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

// Get all users - Super Admin only
router.get("/all", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "Super admin user ID required" });
    }

    // Verify super admin
    const superAdminUser = await User.findOne({ _id: userId });
    if (!superAdminUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!superAdminUser.isSuperAdmin && superAdminUser.role !== "superadmin") {
      return res
        .status(403)
        .json({ message: "Access denied. Super Admin privileges required." });
    }

    const users = await User.find({}, "-password");
    res.json(users);
  } catch (error) {
    console.error("Error in /all endpoint:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: error.message });
  }
});

// Toggle admin status - Super Admin only
router.post("/toggleadmin", async (req, res) => {
  try {
    const { userId, targetUserId, isAdmin } = req.body;

    if (!userId || !targetUserId) {
      return res
        .status(400)
        .json({ message: "User ID and target user ID required" });
    }

    // Verify super admin
    const superAdminUser = await User.findOne({ _id: userId });
    if (
      !superAdminUser ||
      (!superAdminUser.isSuperAdmin && superAdminUser.role !== "superadmin")
    ) {
      return res
        .status(403)
        .json({ message: "Access denied. Super Admin privileges required." });
    }

    // Cannot modify super admin user
    const targetUser = await User.findOne({ _id: targetUserId });
    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (targetUser.isSuperAdmin || targetUser.role === "superadmin") {
      return res
        .status(403)
        .json({ message: "Cannot modify super admin user" });
    }

    // Update user admin status
    targetUser.isAdmin = isAdmin;
    targetUser.role = isAdmin ? "admin" : "user";
    targetUser.updatedAt = new Date();
    await targetUser.save();

    res.send({
      message: isAdmin ? "User promoted to Admin" : "Admin privileges removed",
      user: targetUser,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Failed to toggle admin status", error });
  }
});

// Delete user - Super Admin only
router.delete("/:id", async (req, res) => {
  try {
    const { userId } = req.query;
    const targetUserId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: "Super admin user ID required" });
    }

    // Verify super admin
    const superAdminUser = await User.findOne({ _id: userId });
    if (
      !superAdminUser ||
      (!superAdminUser.isSuperAdmin && superAdminUser.role !== "superadmin")
    ) {
      return res
        .status(403)
        .json({ message: "Access denied. Super Admin privileges required." });
    }

    // Cannot delete super admin user
    const targetUser = await User.findOne({ _id: targetUserId });
    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (targetUser.isSuperAdmin || targetUser.role === "superadmin") {
      return res
        .status(403)
        .json({ message: "Cannot delete super admin user" });
    }

    // Cannot delete self
    if (userId === targetUserId) {
      return res
        .status(403)
        .json({ message: "Cannot delete your own account" });
    }

    await User.findByIdAndDelete(targetUserId);
    res.send({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: "Failed to delete user", error });
  }
});

module.exports = router;
