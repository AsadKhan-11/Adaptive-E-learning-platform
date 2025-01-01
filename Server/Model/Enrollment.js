const mongoose = require("mongoose");
const Question = require("./Question");

const enrollmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    enrolledAt: {
      type: Date,
      default: Date.now,
    },
    currentDifficulty: {
      type: Number,
      default: 0,
    },

    totalAttempts: {
      type: Number,
      default: 0,
    },

    totalCorrect: {
      type: Number,
      default: 0,
    },
    // currentQuestionId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Question",
    //   default: null,
    //   required: true,
    // },

    completed: {
      type: Boolean,
      default: false,
    },
    answeredQuestions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enrollment", enrollmentSchema);
