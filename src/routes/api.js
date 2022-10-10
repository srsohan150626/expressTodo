const express = require('express');
const UserController = require("../controller/UserController");
const AuthController = require("../controller/AuthController");
const AuthVerifyMiddleware = require("../middleware/AuthVerifyMiddleware");

const router = express.Router();

router.post("/user/create", UserController.createUser);
router.post("/user/login", AuthController.loginUser);

router.get("/user/info", AuthVerifyMiddleware, UserController.userInfo);

module.exports = router;