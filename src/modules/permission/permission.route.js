const express = require("express");
const router = express.Router();

const controller = require("./permission.controller");
// const authenticate = require("../../middlewares/auth.middleware");
// const authorize = require("../../middlewares/authorize.middleware");

router.post(
  "/",
  // authenticate,
  // authorize("permission:create"),
  controller.createPermission
);

router.get(
  "/",
  // authenticate,
  // authorize("permission:read"),
  controller.getPermissions
);

module.exports = router;