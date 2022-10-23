const express = require('express');
const UserController = require("../controller/UserController");
const AuthController = require("../controller/AuthController");
const TodoListController = require("../controller/TodoListController");
const AuthVerifyMiddleware = require("../middleware/AuthVerifyMiddleware");

const router = express.Router();

router.post("/user/create", UserController.createUser);
router.post("/user/login", AuthController.loginUser);

router.get("/user/info", AuthVerifyMiddleware, UserController.userInfo);
router.post("/user/update", AuthVerifyMiddleware, UserController.updateUser);

router.post("/todo/create", AuthVerifyMiddleware, TodoListController.createTodo);
router.get("/todo/list", AuthVerifyMiddleware, TodoListController.getTodoList);
router.post("/todo/update", AuthVerifyMiddleware, TodoListController.updateTodo);
router.post("/todo/update/status", AuthVerifyMiddleware, TodoListController.updateTodoStatus);
router.post("/todo/delete", AuthVerifyMiddleware, TodoListController.deleteTodo);
router.get("/todo/list/filter/status", AuthVerifyMiddleware, TodoListController.filterByStatus);
router.get("/todo/list/filter/daterange", AuthVerifyMiddleware, TodoListController.filterByDate);

module.exports = router;