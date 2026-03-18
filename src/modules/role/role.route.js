const express = require("express");
const router = express.Router();

const controller = require("./role.controller");
const authenticate = require("../../middlewares/auth.middleware");
const authorize = require("../../middlewares/authorize.middleware");

router.post(
  "/",
  authenticate,
  authorize("role:create"),
  controller.createRole
);

router.get(
  "/",
  authenticate,
  authorize("role:read"),
  controller.getRoles
);

module.exports = router;