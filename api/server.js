import express from "express";
import * as dotenv from "dotenv";
import morgan from "morgan";
import jobsRouter from "./routers/jobsRouter.js";
import mongoose from "mongoose";
import 'express-async-errors';
const app = express();

dotenv.config();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

// // axios
// app.get("/getData", async (req, res) => {
//   const response = await axios(
//     "https://www.course-api.com/react-useReducer-cart-project"
//   );
//   res.send(response.data);
//   console.log(response);
//   // const FilterData = response.data.map((item) => ({
//   //   title: item.title,
//   //   price: item.price,
//   // }));
//   // res.send({message:"success",FilterData})
//   // console.log(FilterData)
// });

// // start
// app.get("/", (req, res) => {
//   res.send("hello");
// });

// // post
// app.post("/post", (req, res) => {
//   console.log(req.body);
//   res.json({ message: "Data received", data: req.body });
// });

// GetAllJob
app.use("/api/v/jobs", jobsRouter);

// norify err
app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found api" });
});
// norify err
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: "something went wrong." });
});

const PORT = parseInt(process.env.PORT, 10) || 3000;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(PORT, () => {
    console.log("Server is runing on port ", PORT);
  });
} catch (error) {
  console.log(error)
  process.exit(1)
}
 
