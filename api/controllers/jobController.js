import Job from "../models/JobModel.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import dayjs from "dayjs";

export const GetAllJobs = async (req, res) => {
  const { search, jobStatus, jobType, sort } = req.query;

 
  const queryObject = {};


  if (req.user.role !== "admin") {
    queryObject.createdBy = req.user.userId;
  }

  
  if (search && search.trim() !== "") {
    queryObject.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ];
  }

  
  if (jobStatus && jobStatus !== "all") {
    queryObject.jobStatus = jobStatus;
  }

 
  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
   
    const jobs = await Job.find(queryObject)
      .sort(sortKey)
      .skip(skip)
      .limit(limit);
    const totalJobs = await Job.countDocuments(queryObject);
    const numberOfPages = Math.ceil(totalJobs / limit);
   
    res
      .status(StatusCodes.OK)
      .json({ totalJobs, numberOfPages, currentPage: page, jobs });
  } catch (error) {
    
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error retrieving jobs" });
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

export const showStats = async (req, res) => {
  let matchCondition = {};
  // Check if the user is not an admin, then filter by userId
  if (req.user.role !== "admin") {
    matchCondition.createdBy = new mongoose.Types.ObjectId(req.user.userId);
  }

  let stats = await Job.aggregate([
    { $match: matchCondition },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    Pending: stats.Pending || 0,
    Interview: stats.Interview || 0,
    Declined: stats.Declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: matchCondition },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = dayjs()
        .month(month - 1)
        .year(year)
        .format("MMM YYYY");
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
