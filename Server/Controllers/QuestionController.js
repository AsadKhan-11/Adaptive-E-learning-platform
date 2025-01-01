const Course = require("../Model/Course");
const Enrollment = require("../Model/Enrollment");
const Question = require("../Model/Question");
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

    const nextDifficulty = await predictDifficulty(
      userPerformance.currentDifficulty,
      userPerformance.totalAttempts,
      userPerformance.totalCorrect
    );

    const course = await Course.findById(courseId).populate("questions");

    const nextQuestion = course.questions.find((question) => {
      console.log("question difficulty", question.difficulty);
      return question.difficulty === nextDifficulty;
    });

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
  const { answer, questionId } = req.body; // The answer the user submitted

  const courseId = req.params.courseId;
  const userId = req.user._id;

  console.log(questionId, answer, courseId);

  try {
    // Step 1: Fetch user performance data
    const userPerformance = await Enrollment.findOne({ userId, courseId });

    if (!userPerformance) {
      return res
        .status(404)
        .json({ message: "User performance data not found." });
    }

    console.log("User performance before answer submission", userPerformance);

    // Step 2: Fetch the question to check if the answer is correct
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ message: "Question not found." });
    }

    const isCorrect = answer === question.answer;

    // Step 3: Update the user's performance
    userPerformance.totalAttempts += 1;
    if (isCorrect) {
      userPerformance.totalCorrect += 1;
    }

    userPerformance.answeredQuestions.push(questionId);

    // Update current difficulty based on the result (keep it the same for now)
    const nextDifficulty = await predictDifficulty(
      userPerformance.currentDifficulty,
      userPerformance.totalAttempts,
      userPerformance.totalCorrect
    );
    userPerformance.currentDifficulty = nextDifficulty;

    // Save the updated performance data
    await userPerformance.save();

    console.log("User performance after answer submission", userPerformance);
    console.log("Query Parameters:", { courseId, difficulty: nextDifficulty });

    const course = await Course.findById(courseId).populate("questions");

    // Step 4: Fetch the next question based on the predicted difficulty
    if (!course || !course.questions || course.questions.length === 0) {
      return res
        .status(404)
        .json({ message: "No questions available in this course." });
    }

    // Step 5: Filter the questions by the predicted difficulty
    const nextQuestion = course.questions.find(
      (q) =>
        q.difficulty === nextDifficulty &&
        !userPerformance.answeredQuestions.includes(q._id.toString())
    );

    console.log(nextQuestion);

    if (!nextQuestion) {
      return res
        .status(404)
        .json({ message: "No question found for the next difficulty." });
    }

    // Step 5: Return the updated user performance and the next question
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
