const jwt = require("jsonwebtoken");
const userModel = require("../Model/User");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const lowerCaseEmail = email.toLowerCase();

    const user = await userModel.findOne({ email: lowerCaseEmail });

    if (user) {
      return res
        .status(409)
        .json({ message: "Already has an account", success: false });
    }
    const newPassword = await bcrypt.hash(password, 10);
    const newModel = new userModel({
      name,
      email,
      password: newPassword,
    });
    newModel.save();
    res.status(200).json({
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
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required", success: false });
    }
    console.log("Request body:", req.body);
    const lowercasedEmail = email.toLowerCase();

    const user = await userModel.findOne({ email: lowercasedEmail });

    // console.log("User found:", user);

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

    console.log(isPassEqual);

    const jwtToken = jwt.sign(
      {
        email: user.email,
        _id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
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
