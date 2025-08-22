const express = require('express')
const {createTodoController,getTodoController,updateTodoController,toggleCompleteTodoController,deleteController} = require('../controllers/todoController');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post("/",verifyToken,createTodoController);
router.get("/",verifyToken,getTodoController);
router.put("/:id",verifyToken,updateTodoController);
router.patch("/:id",verifyToken,toggleCompleteTodoController);
router.delete("/:id",verifyToken,deleteController);

module.exports = router;