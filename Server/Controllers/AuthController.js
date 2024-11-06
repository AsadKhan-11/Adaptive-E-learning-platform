const userModel = require("../Model/User");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const user = userModel.findOne({ email: email });
  try {
    if (user) {
      return res
        .status(409)
        .json({ message: "Already has an account", success: false });
    }
    const newModel = new userModel({ name, email, password });
    res.status(201).json({
      message: "Account created succesfully",
      response: result,
    });
    newModel.password = bcrypt.hash(password, 10);
    newModel.save();
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err, success: false });
  }
};

module.exports = {
  signup,
};
