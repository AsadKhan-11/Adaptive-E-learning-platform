const router = require("express").Router();
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
} = require("../Controllers/AuthController");
const { verifyEmail } = require("../Controllers/VerificationController");

router.post("/login", login);
router.post("/signup", signup);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
