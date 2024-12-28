const Course = require("../Model/Course");
const Enrollment = require("../Model/Enrollment");
const predictDifficulty = require("../Utils/AiModel");

const getNextQuestions = async (req, res) => {
  const courseId = req.params.courseId;
  const userId = req.user._id;

  try {
    const userPerformance = await Enrollment.findOne({ userId, courseId });

    const nextDifficulty = await predictDifficulty(
      userPerformance.currentDifficulty,
      userPerformance.totalAttempts,
      userPerformance.totalCorrect
    );

    const nextQuestion = await Course.findOne(
      { _id: courseId, "questions.difficulty": nextDifficulty },
      { "questions.$": 1 }
    );

    if (!nextQuestion) {
      return res
        .status(404)
        .json({ message: "No questions found for the predicted difficulty." });
    }

    res.json(nextQuestion);
    return res.status(404).json({ message: "Internal Server Error." });
  } catch (err) {}
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
