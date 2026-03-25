const express = require('express');
const router = express.Router();
const userController = require('./user.controller');

const authenticate = require("../../middlewares/auth.middleware");
const authorize = require("../../middlewares/authorize.middleware");


router.get('/', authenticate, authorize("READ_USER"), userController.getUsers);
// router.post('/', userController.createUser);

module.exports = router;