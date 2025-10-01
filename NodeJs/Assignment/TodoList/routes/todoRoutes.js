const express=require("express");
const router=express.Router();
const {getTodos, addTodos, searchTodos, updateTodo, deletetodo}=require('../Controllers/todoController.js');

router.get('/', getTodos);
router.get("/search", searchTodos);
router.post("/", addTodos);
router.put("/:id",updateTodo);
router.delete("/:id", deletetodo);

module.exports=router;