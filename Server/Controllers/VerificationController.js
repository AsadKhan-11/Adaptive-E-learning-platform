const VerificationCode = require("../Model/Verification");
const User = require("../Model/User");

const verifyEmail = async (req, res) => {
  const { email, code } = req.body;
  try {
    const record = await VerificationCode.findOne({ email, code });
    if (!record) {
      return res.status(400).json({ message: "Invalid code or email." });
    }

    // Mark user as verified
    await User.findOneAndUpdate({ email }, { isVerified: true });

    // Delete the verification code
    await VerificationCode.deleteOne({ email });

    res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Verification failed.", error });
  }
};

module.exports = { verifyEmail };
