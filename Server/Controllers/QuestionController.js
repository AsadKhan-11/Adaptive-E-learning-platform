const Course = require("../Model/Course");
const Enrollment = require("../Model/Enrollment");
const predictDifficulty = require("../Utils/AiModel");

const getNextQuestions = async (req, res) => {
  const courseId = req.params.courseId;
  const userId = req.user._id;

  try {
    const userPerformance = await Enrollment.findOne({ userId, courseId });

    if (!userPerformance) {
      return res
        .status(404)
        .json({ message: "User performance data not found." });
    }
    console.log("User performance", userPerformance);

    const nextDifficulty = await predictDifficulty(
      userPerformance.currentDifficulty,
      userPerformance.totalAttempts,
      userPerformance.totalCorrect
    );

    console.log("Next Difficulty:", nextDifficulty);

    const course = await Course.findById(courseId).populate("questions");

    const nextQuestion = course.questions.find((question) => {
      console.log("question difficulty", question.difficulty);
      return question.difficulty === nextDifficulty;
    });
    console.log("Next question", nextQuestion);

    if (!nextQuestion) {
      return res
        .status(404)
        .json({ message: "No questions found for this difficulty." });
    }

    res.json(nextQuestion);
  } catch (error) {
    console.error("Error in getNextQuestions:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

const submitAnswer = async (req, res) => {
  const userId = req.user._id;
  const { courseId, questionId, userAnswer } = req.body;

  const course = await Course.findOne({ _id: courseId });

  const question = course.questions.find(
    (q) => q._id.toString() === questionId
  );

  const isCorrect = question.answer === userAnswer;

  const enrollment = await Enrollment.findOne({ userId, courseId });
  enrollment.totalAttempts += 1;
  if (isCorrect) {
    enrollment.totalCorrect += 1;
  }

  const nextDifficulty = await predictDifficulty(
    enrollment.currentDifficulty,
    enrollment.totalAttempts,
    enrollment.totalCorrect
  );

  enrollment.currentDifficulty = nextDifficulty;

  await enrollment.save();

  res.json({ isCorrect, nextDifficulty });
};

module.exports = {
  getNextQuestions,
  submitAnswer,
};
