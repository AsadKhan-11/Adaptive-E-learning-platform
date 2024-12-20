const router = require("express").Router();
const authMiddleware = require("../Middlewares/AuthMiddleware");
const User = require("../Model/User");

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
    res.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/course", authMiddleware, (req, res) => {
  res.json({ message: `Welcome to your dashboard, ${req.user.email}!` });
});

router.put("/profile", authMiddleware, async (req, res) => {
  const { name } = req.body;
  console.log(name);
  console.log(req.body);
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
