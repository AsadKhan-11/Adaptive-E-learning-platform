const mongoose = require("mongoose");
require("dotenv").config();
const MongoDB = process.env.DB_URI;

mongoose
  .connect(MongoDB)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));
