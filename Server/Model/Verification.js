const mongoose = require("mongoose");

const verificationCodeSchema = new mongoose.Schema({
  email: String,
  code: Number,
  createdAt: { type: Date, default: Date.now, expires: 300 },
});

const Verification = mongoose.model("VerificationCode", verificationCodeSchema);

module.exports = Verification;
