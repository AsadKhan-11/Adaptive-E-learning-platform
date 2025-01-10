// Required Modules
const AuthRouter = require("./Routes/AuthRoute.js");
const ProtectedRoute = require("./Routes/ProtectedRoute.js");
const EmailRoute = require("./Routes/EmailRoute.js");
require("./Model/db");
require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Initialize Express app
const app = express();

// Middleware setup
app.use(express.json()); 
app.use(cors()); 

// Define Routes
app.use("/auth", AuthRouter);
app.use("/api", ProtectedRoute);
app.use("/email", EmailRoute);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
