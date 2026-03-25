const express = require("express");
const router = express.Router();

const controller = require("./role.controller");
const authenticate = require("../../middlewares/auth.middleware");
const authorize = require("../../middlewares/authorize.middleware");

// router.post("/", authenticate, authorize("role:create"), controller.createRole);
router.post("/", controller.createRole);
router.get("/", controller.getRoles);
router.put("/:id", authenticate, authorize("MANAGE_ROLES"), controller.updateRole);

module.exports = router;
