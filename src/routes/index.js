const express = require("express");
const router = express.Router();
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");

const userRoutes = require("../modules/user/user.route");
const roleRoutes = require("../modules/role/role.route");
const permissionRoutes = require("../modules/permission/permission.route");

router.use('/user', userRoutes);
router.use("/roles", roleRoutes);
router.use("/permissions", permissionRoutes);

// router.use("/", (req, res) => {
//   res.status(200).json(new ApiResponse(200, "API is running 🚀"));
// }); 

/*
Test API - success
*/
router.get("/success", (req, res) => {
  res.json({
    success: true,
    message: "API working"
  });
});

/*
Test API - custom error
*/
router.get("/error", (req, res, next) => {
  next(new ApiError(400, "This is a custom error"));
});

/*
Test API - server error
*/
router.get("/server-error", (req, res) => {
  throw new Error("Unexpected server crash");
});

/*
Test API - mongoose cast error simulation
*/
router.get("/cast-error", (req, res, next) => {
  const err = new Error("Invalid ID");
  err.name = "CastError";
  err.value = "abc123";
  next(err);
});

module.exports = router;