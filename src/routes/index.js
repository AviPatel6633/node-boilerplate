const express = require("express");
const router = express.Router();

// Module routes
const authRoutes = require("../modules/auth/auth.route");
const userRoutes = require("../modules/user/user.route");
const roleRoutes = require("../modules/role/role.route");
const permissionRoutes = require("../modules/permission/permission.route");

// Health check
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API is running 🚀",
  });
});

// Mount routes
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/roles", roleRoutes);
router.use("/permissions", permissionRoutes);

module.exports = router;