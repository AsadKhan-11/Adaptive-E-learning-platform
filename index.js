import express from "express";
import bodyParser from "body-parser";
import AuthRouter from "./Server/Routes/AuthRoute.js";
import ProtectedRoute from "./Server/Routes/ProtectedRoute.js";
import EmailRoute from "./Server/Routes/EmailRoute.js";
import "./Server/Model/db.js";
import dotenv from "dotenv";
import cors from "cors";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json());

const corsOptions = {
  origin: "https://adaptive-e-learning-platform.vercel.app", // Frontend URL
  methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
  allowedHeaders: "Content-Type, Authorization", // Allowed headers
};
app.use(cors(corsOptions));

// Routes
app.use("/auth", AuthRouter);
app.use("/api", ProtectedRoute);
app.use("/email", EmailRoute);

// Start the server
app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on port " + (process.env.PORT || 3000));
});
