const express = require('express');
const UserController = require("../controller/UserController");

const router = express.Router();

router.post("/user/create", UserController.createUser);
router.post("/user/login", UserController.loginUser);

module.exports = router;