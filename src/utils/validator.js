const { z } = require("zod");

exports.registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

exports.loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

exports.createTodoSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
});
