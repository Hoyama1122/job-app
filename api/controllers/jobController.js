import { nanoid } from "nanoid";
import Job from "../models/JobModel.js";
import { StatusCodes } from "http-status-codes";
let jobs = [
  { id: nanoid(), company: "Google", position: "back-end" },
  { id: nanoid(), company: "Appple", position: "Full-Stack" },
];

export const GetAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(StatusCodes.OK).json({ jobs });
};

export const CreateJobs = async (req, res) => {
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const Getjob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return res.status(404).json({ msg: `Not found id: ${id}` });
  }

  res.status(StatusCodes.OK).json({ job });
};

export const EditJobs = async (req, res) => {
  const { id } = req.params;
  const updateJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updateJob) {
    return res.status(404).json({ msg: `Not found id: ${id}` });
  }
  res.status(StatusCodes.OK).json({ jobs: updateJob });
};

export const DeleteJobs = async (req, res) => {
  const { id } = req.params;
  const deleteJob = await Job.findByIdAndDelete(id);
  if (!deleteJob) {
    return res.status(404).json({ msg: `Not found id: ${id}` });
  }
  res.status(StatusCodes.OK).json({ jobs: deleteJob });
};
