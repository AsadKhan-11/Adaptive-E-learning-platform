const jwt = require("jsonwebtoken");
const userModel = require("../Model/User");
const bcrypt = require("bcrypt");
const Verification = require("../Model/Verification");
const transporter = require("../Config/nodemailerConfig");
require("dotenv").config();

const signup = async (req, res) => {
  const { name, email, password, code } = req.body;
  console.log(req.body);
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
      },
      process.env.JWT_SECRET,
      { expiresIn: "10h" }
    );

    res.status(200).json({
      message: "Login Successful",
      name: user.name,
      jwtToken,
      email,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err, success: false });
  }
};

module.exports = {
  signup,
  login,
};
