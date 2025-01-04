const router = require("express").Router();
const { signup, login } = require("../Controllers/AuthController");
const { verifyEmail } = require("../Controllers/VerificationController");

router.post("/login", login);
router.post("/signup", signup);
router.post("/verify-email", verifyEmail);

module.exports = router;
