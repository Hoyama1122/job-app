import express from "express";
import * as dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import "express-async-errors";
import cookieParser from "cookie-parser";
import { NotFoundError } from "./error/customError.js";

const app = express();

// Router
import jobsRouter from "./routers/jobsRouter.js";
import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";

// middleware
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import { authenticateUser } from "./middlewares/authMiddleware.js";

dotenv.config();
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

// notify error
app.use("*", (req, res) => {
  throw new NotFoundError(`Can't find ${req.originalUrl} on this server`);
});

// notify error
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
