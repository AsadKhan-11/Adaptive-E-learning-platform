import express from "express";
import bodyParser from "body-parser";
import AuthRouter from "./Routes/AuthRoute.js";
import ProtectedRoute from "./Routes/ProtectedRoute.js";  
import EmailRoute from "./Routes/EmailRoute.js";
import "./Model/db.js";  
import dotenv from "dotenv";
import cors from "cors";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", AuthRouter);
app.use("/api", ProtectedRoute);
app.use("/email", EmailRoute);

// Start the server
app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on port " + (process.env.PORT || 3000));
});
