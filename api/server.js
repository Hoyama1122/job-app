import express from "express";
import * as dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import "express-async-errors";

const app = express();

// Router
import jobsRouter from "./routers/jobsRouter.js";
import authRouter from "./routers/authRouter.js";
// middleware
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";

dotenv.config();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

// Router api
app.use("/api/v/jobs", jobsRouter);
app.use("/api/v/auth", authRouter);




// norify err
app.use("*", (req, res) => {
  throw new NotFoundError(`Can't find ${req.originalUrl} on this server`);
});

// norify err
app.use(errorHandlerMiddleware);

const PORT = parseInt(process.env.PORT, 10) || 3000;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(PORT, () => {
    console.log("Server is runing on port ", PORT);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
