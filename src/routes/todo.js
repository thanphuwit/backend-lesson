const express = require("express");
const {
  createTodo,
  getTodo,
  deleteTodo,
  updateTodo,
} = require("../controllers/todoController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createTodo);
router.get("/", authMiddleware, getTodo);
router.delete("/:id", authMiddleware, deleteTodo);
router.put("/:id", authMiddleware, updateTodo);

module.exports = router;
