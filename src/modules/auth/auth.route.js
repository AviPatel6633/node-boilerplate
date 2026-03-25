const express = require("express");
const router = express.Router();

const controller = require("./auth.controller");
const validate = require("../../middlewares/validate.middleware");
const { registerSchema } = require("./auth.validation");

router.post("/register", validate(registerSchema), controller.register);
router.post("/login", controller.login);
router.post("/logout", controller.logout);

module.exports = router;