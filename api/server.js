import express from "express";
import * as dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import "express-async-errors";
import cookieParser from "cookie-parser";
import { NotFoundError } from "./error/customError.js";
import cloudinary from "cloudinary";

// Initialize dotenv
dotenv.config();

// Initialize Express application
const app = express();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});


// Public imports
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

// Routers
import jobsRouter from "./routers/jobsRouter.js";
import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";

// Middleware
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import { authenticateUser } from "./middlewares/authMiddleware.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "../web/public")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cookieParser());

app.get("/api/v/test", (req, res) => {
  res.json({ msg: "success" });
});

// Router api
app.use("/api/v/jobs", authenticateUser, jobsRouter);
app.use("/api/v/user", authenticateUser, userRouter);
app.use("/api/v/auth", authRouter);

// Notify error for unknown routes
app.use("*", (req, res) => {
  throw new NotFoundError(`Can't find ${req.originalUrl} on this server`);
});

// Error handling middleware
app.use(errorHandlerMiddleware);

const PORT = parseInt(process.env.PORT, 10) || 3000;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(PORT, () => {
    console.log("Server is running on port ", PORT);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
