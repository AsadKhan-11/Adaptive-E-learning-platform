require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const userModel = require("./Model/User");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

app.post("/signUp", (req, res) => {
  const { name, email, password, phone } = req.body;

  userModel.findOne({ email: email }).then((user) => {
    if (user) {
      return res.json({ message: "Already has an account" });
    } else {
      userModel
        .create({ name: name, email: email, password: password, phone: phone })
        .then((result) => {
          res.json({
            message: "Account created succesfully",
            response: result,
          });
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
