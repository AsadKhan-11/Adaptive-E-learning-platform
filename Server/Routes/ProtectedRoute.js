const router = require("express").Router();
const authMiddleware = require("../Middlewares/AuthMiddleware");
const User = require("../Model/User");

router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: `Welcome to your dashboard, ${req.user.email}!` });
});
router.get("/send/email", authMiddleware, (req, res) => {
  res.json({ message: `Welcome to your dashboard, ${req.user.email}!` });
});
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: `Welcome to your dashboard, ${req.user.email}!` });
});
router.get("/course", authMiddleware, (req, res) => {
  res.json({ message: `Welcome to your dashboard, ${req.user.email}!` });
});

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
