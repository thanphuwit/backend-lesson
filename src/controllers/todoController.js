const { createTodoSchema } = require("../utils/validator");

exports.createTodo = async (req, res, next) => {
  try {
    const data = createTodoSchema.parse(req.body);

    const todo = await prisma.todo.create({
      data: {
        title: data.title,
        userId: req.userId,
      },
    });
    res.json({
      success: true,
      message: "Todo created",
      data: todo,
    });
  } catch (err) {
    next(err);
  }
};

exports.getTodo = async (req, res, next) => {
  try {
    const todo = await prisma.todo.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: "desc" },
    });
    res.json({ success: true, data: todo });
  } catch (err) {
    next(err);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const todo = await prisma.todo.deleteMany({
      where: { id: parseInt(req.params.id), userId: req.userId },
    });
    if (todo.count === 0)
      return res.status(404).json({ error: "Todo not found" });
    res.json({ success: true, message: "Todo deleted" });
  } catch (err) {
    next(err);
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const { title, completed } = req.body;
    const todo = await prisma.todo.updateMany({
      where: { id: parseInt(req.params.id), userId: req.userId },
      data: { title, completed },
    });
    if (todo.count === 0)
      return res.status(404).json({ error: "Todo not found" });
    res.json({ success: true, message: "Todo updated" });
  } catch (err) {
    next(err);
  }
};
