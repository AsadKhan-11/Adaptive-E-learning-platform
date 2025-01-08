const router = require("express").Router();
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  validateResetToken,
} = require("../Controllers/AuthController");
const { verifyEmail } = require("../Controllers/VerificationController");

router.post("/login", login);
router.post("/signup", signup);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/reset-token", validateResetToken);

module.exports = router;
