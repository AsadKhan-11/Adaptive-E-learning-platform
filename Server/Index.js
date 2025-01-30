const bodyParser = require("body-parser");
const AuthRouter = require("./Routes/AuthRoute");
const ProtectedRoute = require("./Routes/ProtectedRoute");
const EmailRoute = require("./Routes/EmailRoute");
require("./Model/db");
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(express.json());
const corsOptions = {
  origin: ["https://nexedu.netlify.app", "http://localhost:5173"], // Frontend URL
  methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
  allowedHeaders: "Content-Type, Authorization", // Allowed headers
};

app.use(cors(corsOptions));
app.use("/auth", AuthRouter);

app.use("/api", ProtectedRoute);

app.use("/email", EmailRoute);

app.listen(process.env.PORT, () => {
  console.log("server start");
});
