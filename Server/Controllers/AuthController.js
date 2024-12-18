const jwt = require("jsonwebtoken");
const userModel = require("../Model/User");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const emailPattern = new RegExp(
      "^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z.-]+.[a-zA-Z]{2,}$"
    );
    const passPattern = new RegExp("^.{8,}$");

    const { name, email, password } = req.body;
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
    const upperCaseName = name.toUpperCase();

    const user = await userModel.findOne({
      email: lowerCaseEmail,
    });

    if (user) {
      return res
        .status(409)
        .json({ message: "Already has an account", success: false });
    }
    const newPassword = await bcrypt.hash(password, 10);
    const newModel = new userModel({
      name: upperCaseName,
      email,
      password: newPassword,
    });
    newModel.save();

    res.status(200).json({
      message: "Account created successfully",
      user: newModel,
    });
  } catch (err) {
    console.log(err);
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
