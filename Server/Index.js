const bodyParser = require("body-parser");
const AuthRouter = require("./Routes/AuthRoute");
const ProtectedRoute = require("./Routes/ProtectedRoute");
require("./Model/db");
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use("/auth", AuthRouter);

app.use("/api", ProtectedRoute);

app.listen(process.env.PORT, () => {
  console.log("server start");
});
