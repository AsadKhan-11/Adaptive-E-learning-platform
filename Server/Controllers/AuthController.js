const jwt = require("jsonwebtoken");
const userModel = require("../Model/User");
const bcrypt = require("bcrypt");
const Verification = require("../Model/Verification");
const transporter = require("../Config/nodemailerConfig");
const crypto = require("crypto");
require("dotenv").config();

const signup = async (req, res) => {
  const { name, email, password, code } = req.body;

  try {
    const record = await Verification.findOne({ email, code });
    if (!record) {
      return res.status(400).json({ message: "Invalid code ." });
    }

    // Delete the verification code
    await Verification.deleteOne({ email });

    const newPassword = await bcrypt.hash(password, 10);
    const upperCaseName = name.toUpperCase();

    const newModel = new userModel({
      name: upperCaseName,
      email,
      password: newPassword,
    });
    newModel.save();

    res.status(201).json({
      message: "Account created successfully",
      user: newModel,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err, success: false });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
        success: false,
      });
    } else if (!password) {
      return res.status(400).json({
        message: "Password is required",
        success: false,
      });
    }

    const lowercasedEmail = email.toLowerCase();

    const user = await userModel.findOne({ email: lowercasedEmail });

    if (!user) {
      return res
        .status(403)
        .json({ message: "Email does not exist", success: false });
    }

    const isPassEqual = await bcrypt.compare(password, user.password);

    if (!isPassEqual) {
      return res
        .status(403)
        .json({ message: "Wrong Password", success: false });
    }

    const jwtToken = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "10h" }
    );

    res.status(200).json({
      message: "Login Successful",
      name: user.name,
      jwtToken,
      role: user.role,
      email,
      success: true,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err, success: false });
  }
};

// Forgot Password
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

    // await sendEmail(email, "Password Reset", `Click here: ${resetLink}`);
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      text: `Click here: ${resetLink}`,
    };
    const info = await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: " Reset Link has been sent ",
      success: true,
      info,
    });
  } catch (err) {
    res.status(404).json({
      message: "Error while sending link",
      success: false,
    });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  const { token, password } = req.body;
  const passPattern = new RegExp("^.{8,}$");

  try {
    const user = await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "The link has expired" });
    else if (!password) {
      return res.status(400).json({
        message: "Password is required",
        success: false,
      });
    } else if (!passPattern.test(password)) {
      return res.status(400).json({
        message: "Password should be atleast 8 characters ",
        success: false,
      });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error resetting password" });
  }
};

const validateResetToken = async (req, res) => {
  const { token } = req.body;

  try {
    const user = await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ valid: false, message: "Invalid or expired token" });
    }

    res.status(200).json({ valid: true });
  } catch (err) {
    res.status(500).json({ valid: false, message: "Server error" });
  }
};

module.exports = {
  signup,
  login,
  forgotPassword,
  resetPassword,
  validateResetToken,
};
