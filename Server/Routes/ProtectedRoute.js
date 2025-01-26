const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const authMiddleware = require("../Middlewares/AuthMiddleware");
const Enrollment = require("../Model/Enrollment");
const User = require("../Model/User");
const Course = require("../Model/Course");
const Question = require("../Model/Question");
const {
  getNextQuestions,
  submitAnswer,
} = require("../Controllers/QuestionController");
const userModel = require("../Model/User");

router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: `Welcome to your dashboard, ${req.user.email}!` });
});
router.get("/send/email", authMiddleware, (req, res) => {
  res.json({ message: `Welcome to your dashboard, ${req.user.email}!` });
});

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

    const courses = enrollment.map((enrollment) => enrollment.courseId);

    return res.status(200).json({ user, courses });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//get courses
router.get("/course", authMiddleware, async (req, res) => {
  try {
    const courses = await Course.find();
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
      throw new Error("No questions available for this course.");
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
    res.status(500).json({ error: "Internal server error" });
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
    updateUser = await User.findByIdAndUpdate(
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

router.post("/addcourse", async (req, res) => {
  const { title, description } = req.body;

  console.log(title, description);
  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Title and description are required" });
  }

  try {
    const newCourse = new Course({ title, description });
    console.log(newCourse);
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    console.error("Error saving course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
