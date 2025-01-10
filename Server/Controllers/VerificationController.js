const VerificationCode = require("../Model/Verification");
const User = require("../Model/User");
const Verification = require("../Model/Verification");
const userModel = require("../Model/User");
const transporter = require("../Config/nodemailerConfig");

const verifyEmail = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const emailPattern = new RegExp(
      "^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z.-]+.[a-zA-Z]{2,}$"
    );
    const passPattern = new RegExp("^.{8,}$");

    if (!name) {
      return res.status(400).json({
        message: "Name is required",
        success: false,
      });
    } else if (!email) {
      return res.status(400).json({
        message: "Email is required",
        success: false,
      });
    } else if (!emailPattern.test(email)) {
      return res.status(400).json({
        message: "Enter correct Email",
        success: false,
      });
    } else if (!password) {
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

    const lowerCaseEmail = email.toLowerCase();

    const user = await userModel.findOne({
      email: lowerCaseEmail,
    });

    if (user) {
      return res
        .status(409)
        .json({ message: "Already has an account", success: false });
    }

    // Generate and save verification code
    const code = Math.floor(100000 + Math.random() * 900000);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Email",
      text: `Your verification code is: ${code}`,
    };

    const info = await transporter.sendMail(mailOptions);

    const VerificationCode = new Verification({ email, code });
    VerificationCode.save();

    res.status(200).json({
      message: "Verification code has been sent to your email!",
      success: true,
      info,
    });
  } catch (error) {
    res.status(500).json({ message: "Verification failed.", error });
  }
};

module.exports = { verifyEmail };
