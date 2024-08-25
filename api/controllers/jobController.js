import Job from "../models/JobModel.js";
import { StatusCodes } from "http-status-codes";

export const GetAllJobs = async (req, res) => {
  if (req.user.role === "admin") {
    const jobs = await Job.find({});
    res.status(StatusCodes.OK).json({ jobs });
  } else {
    const jobs = await Job.find({ createdBy: req.user.userId });
    res.status(StatusCodes.OK).json({ jobs });
  }
};

export const CreateJobs = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const Getjob = async (req, res) => {
  const job = await Job.findById(req.params.id);

  res.status(StatusCodes.OK).json({ job });
};

export const EditJobs = async (req, res) => {
  const updateJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ jobs: updateJob });
};

export const DeleteJobs = async (req, res) => {
  const deleteJob = await Job.findByIdAndDelete(req.params.id);

  res.status(StatusCodes.OK).json({ jobs: deleteJob });
};
