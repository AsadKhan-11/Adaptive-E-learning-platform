const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: [{ type: String, required: true }],
  answer: { type: String, required: true },
  difficulty: { type: Number, enum: [1, 2, 3], required: true },
});

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
