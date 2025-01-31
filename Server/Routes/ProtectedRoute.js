const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const authMiddleware = require("../Middlewares/AuthMiddleware");
const Enrollment = require("../Model/Enrollment");
const User = require("../Model/User");
const Course = require("../Model/Course");
const Question = require("../Model/Question");
const express = require("express");
const path = require("path");
const {
  getNextQuestions,
  submitAnswer,
} = require("../Controllers/QuestionController");
const userModel = require("../Model/User");
const LoginActivity = require("../Model/LoginActivity");
const multer = require("multer");
const { Router } = require("express");

router.get("/user/average", authMiddleware, async (req, res) => {
  const userId = req.user._id;

  try {
    const results = await Enrollment.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "courses", // Adjust to match your course collection name
          localField: "courseId",
          foreignField: "_id",
          as: "courseDetails",
        },
      },
      {
        $unwind: "$courseDetails", // Unwind course details
      },
      {
        $project: {
          courseName: "$courseDetails.title",
          totalCorrect: 1,
          totalAttempts: 1,
          averageCorrect: {
            $cond: {
              if: { $eq: ["$totalAttempts", 0] },
              then: 0,
              else: {
                $multiply: [
                  {
                    $divide: ["$totalCorrect", "$totalAttempts"],
                  },
                  100,
                ],
              },
            },
          },
        },
      },
    ]);

    const overallStats = results.reduce(
      (acc, course) => {
        acc.totalCorrect += course.totalCorrect || 0;
        acc.totalAttempts += course.totalAttempts || 0;
        return acc;
      },
      { totalCorrect: 0, totalAttempts: 0 }
    );

    const overallAverage =
      overallStats.totalAttempts === 0
        ? 0
        : (overallStats.totalCorrect / overallStats.totalAttempts) * 100;

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No enrolled courses found for the user." });
    }

    return res.status(200).json({
      results,
      overallStats: {
        totalCorrect: overallStats.totalCorrect,
        totalAttempts: overallStats.totalAttempts,
        overallAverage,
      },
    });
  } catch (error) {
    console.error("Error fetching user course averages:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const enrollment = await Enrollment.find({ userId: req.user._id }).populate(
      "courseId"
    );

    const validCourses = enrollment
      .map((enroll) => enroll.courseId)
      .filter((course) => !course.deleted);

    return res.status(200).json({ user, courses: validCourses });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//get courses
router.get("/course", authMiddleware, async (req, res) => {
  try {
    const courses = await Course.find({ deleted: false });
    return res.status(200).json(courses);
  } catch (err) {
    return res.status(500).json({ error: "Server Error" });
  }
});

//enrolling in a course
router.post("/course/enroll/:courseId", authMiddleware, async (req, res) => {
  const courseId = req.params.courseId;
  const userId = req.user._id;

  try {
    const alreadyEnrolled = await Enrollment.exists({ courseId, userId });
    if (alreadyEnrolled) {
      return res.status(400).json({ error: "Already enrolled in this course" });
    }

    const course = await Course.findById(courseId).populate("questions");

    if (!course || !course.questions || course.questions.length === 0) {
      return res
        .status(400)
        .json({ error: "No questions available for this course." });
    }

    const firstQuestion = course.questions[0];

    const enrollment = new Enrollment({
      courseId,
      userId,
      currentDifficulty: 0,
      totalAttempts: 0,
      totalCorrect: 0,
      currentQuestion: firstQuestion._id,
    });

    await enrollment.save();

    return res
      .status(201)
      .json({ message: "Enrollment successful", success: true });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
});

//checking if already enrolled
router.get("/course/enrollment/:courseId", authMiddleware, async (req, res) => {
  const courseId = req.params.courseId;
  const userId = req.user._id;

  try {
    const alreadyEnrolled = await Enrollment.exists({ courseId, userId });
    const courses = await Course.findById(courseId);

    if (!courses) {
      return res.status(404).json({ error: "Course not found" });
    }

    return res.status(201).json({ enrolled: !!alreadyEnrolled, courses });
  } catch (err) {
    return res.status(500).json({ error: "Server Error" });
  }
});

// updating profile info
router.put("/profile", authMiddleware, async (req, res) => {
  const { name } = req.body;

  const upperCaseName = name.toUpperCase();

  try {
    const updateUser = await User.findByIdAndUpdate(
      req.user._id,
      { name: upperCaseName },
      { new: true }
    );
    res.json(updateUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user data" });
  }
});

router.get("/quiz/:courseId", authMiddleware, getNextQuestions);

router.post("/quiz/:courseId/submit-answer", authMiddleware, submitAnswer);

router.get("/course/difficulty/:courseId", async (req, res) => {
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId).populate("questions");
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ difficulty: course.currentDifficulty });
  } catch (err) {
    console.error("Error fetching course difficulty:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/addcourse", async (req, res) => {
  const { title, desc } = req.body;
  if (!title || !desc)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const newCourse = new Course({
      title,
      description: desc,
    });
    await newCourse.save();
    return res.status(201).json({
      message: "Course created successfully",
      course: newCourse,
    });
  } catch (error) {
    console.error("Error saving course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/deletecourse/:courseId", async (req, res) => {
  const id = req.params.courseId;

  try {
    const course = await Course.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).send({ success: true, message: "Course has been deleted" });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Error deleting the course" });
  }
});

router.get("/:courseId/getQuestions", async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const course = await Course.findById(courseId).populate("questions");
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).send(course.questions);
  } catch (error) {
    console.error("Error fetching course questions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/students", async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).select(
      "name email lastLogin"
    );
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students" });
  }
});

router.get("/logins-per-day", async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const logins = await LoginActivity.aggregate([
      {
        $match: {
          timestamp: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.json(logins);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch login data" });
  }
});
router.post("/add-questions/:courseId", async (req, res) => {
  try {
    const { courseId } = req.params;
    const { text, answer, options, helpVideo, difficulty } = req.body;

    // Create a new question
    const newQuestion = new Question({
      text,
      answer,
      options,
      helpVideo: helpVideo.filter((link) => link.trim() !== ""),
      difficulty,
    });
    const savedQuestion = await newQuestion.save();

    // Update the course by adding the new question's ID
    await Course.findByIdAndUpdate(courseId, {
      $push: { questions: savedQuestion._id },
    });

    res.status(201).json({
      message: "Question added successfully!",
      question: savedQuestion,
    });
  } catch (error) {
    console.error("Error adding question:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/deleteQuestion/:id", async (req, res) => {
  try {
    const questionId = req.params.id;

    // Remove the question from the database
    const deletedQuestion = await Question.findByIdAndDelete(questionId);

    if (!deletedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    const updateCourses = await Course.updateMany(
      { questions: questionId },
      { $pull: { questions: questionId } }
    );

    if (updateCourses.nModified === 0) {
      return res
        .status(404)
        .json({ message: "Question ID not found in any courses" });
    }

    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting question", error });
  }
});

module.exports = router;
