const express = require("express");
const router = express.Router();

const controller = require("./user.controller");
const authenticate = require("../../middlewares/auth.middleware");

router.get("/me", authenticate, controller.getMe);

module.exports = router;