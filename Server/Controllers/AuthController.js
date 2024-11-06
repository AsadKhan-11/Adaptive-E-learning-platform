const userModel = require("../Model/User");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      return res
        .status(409)
        .json({ message: "Already has an account", success: false });
    }
    const newPassword = await bcrypt.hash(password, 10);
    const newModel = new userModel({
      name,
      email: email.toLowerCase(),
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
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email: email.toLowerCase() });
    console.log("User found:", user);

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
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err, success: false });
  }
};

module.exports = {
  signup,
  login,
};
