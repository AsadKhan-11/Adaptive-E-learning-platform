const Course = require("../Model/Course");
const UserPerformance = require("../Model/Enrollment");
const predictDifficulty = require("../utils/aiModel");

const getNextQuestions = async (req, res) => {
  const { userId, courseId } = req.params;

  const userPerformance = await UserPerformance.findOne({ userId, courseId });

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
