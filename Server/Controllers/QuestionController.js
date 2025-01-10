const Course = require("../Model/Course");
const Enrollment = require("../Model/Enrollment");
const Question = require("../Model/Question");
const predictDifficulty = require("../Utils/AiModel");

const getNextQuestionFromCourse = (course, userPerformance, nextDifficulty) => {
  return course.questions.find(
    (q) =>
      q.difficulty === nextDifficulty &&
      !userPerformance.answeredQuestions.includes(q._id.toString())
  );
};
const getNextQuestions = async (req, res) => {
  const courseId = req.params.courseId;
  const userId = req.user._id;

  try {
    // Fetch user performance
    const userPerformance = await Enrollment.findOne({ userId, courseId });
    if (!userPerformance) {
      return res
        .status(404)
        .json({ message: "User performance data not found." });
    }
    // Predict next difficulty
    const nextDifficulty = await predictDifficulty(
      userPerformance.currentDifficulty,
      userPerformance.totalAttempts,
      userPerformance.totalCorrect
    );

    // Fetch course and questions
    const course = await Course.findById(courseId).populate("questions");
    if (!course || !course.questions.length) {
      return res
        .status(404)
        .json({ message: "No questions available in this course." });
    }

    // Fetch the next question
    const nextQuestion = getNextQuestionFromCourse(
      course,
      userPerformance,
      nextDifficulty
    );

    if (!nextQuestion) {
      return res
        .status(404)
        .json({ message: "No question found for the next difficulty." });
    }

    // Return the next question
    res.json(nextQuestion);
  } catch (error) {
    console.error("Error in getNextQuestions:", error);
    res.status(500).json({ message: "Error in getNextQuestions." });
  }
};

const submitAnswer = async (req, res) => {
  const { answer, questionId } = req.body;
  const courseId = req.params.courseId;
  const userId = req.user._id;

  try {
    // Fetch user performance
    const userPerformance = await Enrollment.findOne({ userId, courseId });
    if (!userPerformance) {
      return res
        .status(404)
        .json({ message: "User performance data not found." });
    }

    // Fetch the question
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found." });
    }

    // Check if the answer is correct
    const isCorrect = answer === question.answer;

    // Update user performance
    userPerformance.totalAttempts += 1;
    if (isCorrect) userPerformance.totalCorrect += 1;
    userPerformance.answeredQuestions.push(questionId);

    // Predict next difficulty and update
    const nextDifficulty = await predictDifficulty(
      userPerformance.currentDifficulty,
      userPerformance.totalAttempts,
      userPerformance.totalCorrect
    );
    userPerformance.currentDifficulty = nextDifficulty;

    // Save updated performance
    await userPerformance.save();

    // Fetch course and questions
    const course = await Course.findById(courseId).populate("questions");
    if (!course || !course.questions.length) {
      return res
        .status(404)
        .json({ message: "No questions available in this course." });
    }

    // Fetch the next question
    const nextQuestion = getNextQuestionFromCourse(
      course,
      userPerformance,
      nextDifficulty
    );

    if (!nextQuestion) {
      return res
        .status(404)
        .json({ message: "No question found for the next difficulty." });
    }

    // Return the updated performance and next question
    res.json({
      message: isCorrect ? "Correct answer!" : "Wrong answer, try again.",
      isCorrect,
      nextQuestion,
      updatedPerformance: userPerformance,
    });
  } catch (error) {
    console.error("Error in submitAnswer:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

module.exports = {
  getNextQuestions,
  submitAnswer,
};
