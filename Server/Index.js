import bcrypt from "bcrypt";
import bodyParser from "body-parser";

require("./Model/db");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userModel = require("./Model/User");
const userModel = require("./Model/User");

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.post("/signUp", (req, res) => {
  const { name, email, password } = req.body;

  userModel.findOne({ email: email }).then((user) => {
    if (user) {
      return res.json({ message: "Already has an account", success: false });
    } else {
      userModel
        .create({ name: name, email: email, password: password })
        .then((result) => {
          res.json({
            message: "Account created succesfully",
            response: result,
          });
          const newModel = userModel({ name, email, password });
          newModel.password = bcrypt.hash(password, 10);
          newModel.save();
        })
        .catch((err) => {
          res.status(500).json({ message: "Cannot create user", error: err });
        });
    }
  });
});

app.listen(process.env.PORT, () => {
  console.log("server start");
});
