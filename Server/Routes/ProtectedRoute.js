const router = require("express").Router();
const authMiddleware = require("../Middlewares/AuthMiddleware");

router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: `Welcome to your dashboard, ${req.user.email}!` });
});

module.exports = router;
