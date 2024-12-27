const Course = require("../Model/Course");
const Enrollment = require("../Model/Enrollment");
const predictDifficulty = require("../Utils/AiModel");

const getNextQuestions = async (req, res) => {
  const { courseId } = req.params.courseId;
  const userId = req.user._id;

  const userPerformance = await Enrollment.findOne({ userId, courseId });

  const nextDifficulty = await predictDifficulty(
    userPerformance.currentDifficulty,
    userPerformance.totalAttempts,
    userPerformance.totalCorrect
  );

  const questions = await Course.findOne(
    { _id: courseId, "questions.difficulty": nextDifficulty },
    { "questions.$": 1 }
  );

  res.json(questions);
};

module.exports = {
  getNextQuestions,
};
