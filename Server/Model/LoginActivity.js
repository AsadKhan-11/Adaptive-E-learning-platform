const mongoose = require("mongoose");

const loginActivitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  role: { type: String, enum: ["admin", "student"], required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("LoginActivity", loginActivitySchema);
