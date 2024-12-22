const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const authMiddleware = require("../Middlewares/AuthMiddleware");
const Enrollment = require("../Model/Enrollment");
const User = require("../Model/User");
const Course = require("../Model/Course");

router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: `Welcome to your dashboard, ${req.user.email}!` });
});
router.get("/send/email", authMiddleware, (req, res) => {
  res.json({ message: `Welcome to your dashboard, ${req.user.email}!` });
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
    console.error("Error fetching user data:", error);
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

// router.get(`/course/enrollment/:courseId`, authMiddleware, async (req, res) => {
//   const courseId = req.params.courseId;
//   const userId = req.user._id;

//   const normalizedCourseId = new mongoose.Types.ObjectId(courseId);
//   const normalizedUserId = new mongoose.Types.ObjectId(userId);

//   try {
//     const isEnrolled = await Enrollment.exists({
//       courseId: normalizedCourseId,
//       userId: normalizedUserId,
//     });
//     console.log(isEnrolled);

//     return res.status(200).json({ enrolled: !!isEnrolled });
//   } catch (err) {
//     return res.status(500).json({ error: "Server error" });
//   }
// });

//enrolling in a course
router.post("/course/enroll", authMiddleware, async (req, res) => {
  const courseId = req.body.courseId;
  const userId = req.user._id;

  try {
    const alreadyEnrolled = await Enrollment.exists({ courseId, userId });

    if (alreadyEnrolled) {
      return res.status(400).json({ error: "Already enrolled in this course" });
    }
    const enrollment = new Enrollment({ courseId, userId });
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

  console.log(courseId);
  console.log(userId);

  try {
    const alreadyEnrolled = await Enrollment.exists({ courseId, userId });

    return res.status(201).json({ enrolled: !!alreadyEnrolled });
  } catch (err) {
    return res.status(500).json({ error: "Server Error" });
  }
});

// updating profile info
router.put("/profile", authMiddleware, async (req, res) => {
  const { name } = req.body;

  try {
    updateUser = await User.findByIdAndUpdate(
      req.user._id,
      { name },
      { new: true }
    );
    res.json(updateUser);
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ error: "Failed to update user data" });
  }
});

module.exports = router;
