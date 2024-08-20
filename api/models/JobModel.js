import mongoose from "mongoose";
import { JOB_STATUS, JOB_Type } from "../utils/constants.js";
const JobSchema = new mongoose.Schema(
  {
    company: String,
    position: String,
    salary: String,
    jobStatus: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.PENDING,
    },
    jobType: {
      type: String,
      enum: Object.values(JOB_Type),
      default: JOB_Type.FULL_TIME,
    },
    jobLocation: {
      type: String,
      default: "My city",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
