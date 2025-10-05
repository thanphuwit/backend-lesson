const express = require("express");
const { PrismaClient } = require("@prisma/client");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todo");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(express.json());

global.prisma = new PrismaClient(); // ให้ prisma ใช้ได้ทั่วทั้ง app

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/todo", todoRoutes);

// Error handler (ใส่ท้ายสุด)
app.use(errorHandler);

module.exports = app;
