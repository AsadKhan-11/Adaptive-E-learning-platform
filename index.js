import express from "express";
import bodyParser from "body-parser";
import AuthRouter from "./Server/Routes/AuthRoute.js";
import ProtectedRoute from "./Server/Routes/ProtectedRoute.js";
import EmailRoute from "./Server/Routes/EmailRoute.js";
import "./Server/Model/db.js";
import dotenv from "dotenv";
import cors from "cors";

const allowedOrigins = [
  "https://adaptive-e-learning-platform.vercel.app", // Your frontend URL
  "http://localhost:3000", // For local development
];

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true, // Allow cookies and authentication headers
  })
);

// Routes
app.use("/auth", AuthRouter);
app.use("/api", ProtectedRoute);
app.use("/email", EmailRoute);

// Start the server
app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on port " + (process.env.PORT || 3000));
});
