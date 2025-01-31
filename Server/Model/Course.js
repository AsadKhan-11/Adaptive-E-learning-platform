const mongoose = require("mongoose");
const Question = require("./Question");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    deleted: { type: Boolean, default: false },

    imageUrl: {
      type: String,
      required: true,
    },

    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  },

  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
