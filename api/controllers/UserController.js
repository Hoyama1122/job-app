import User from "../models/UserModel.js";
import Job from "../models/JobModel.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import { hashPassword } from "../utils/hashpassword.js";

export const getuser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();

  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};
export const getApplicationStats = async (req, res) => {
  const userCount = await User.countDocuments();
  const jobCount = await Job.countDocuments();

  res.status(StatusCodes.OK).json({ userCount, jobCount });
};

export const updateUser = async (req, res) => {
  const { password, ...otherFields } = req.body;

  if (password) {
    otherFields.password = await hashPassword(password);
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user.userId,
    otherFields,
    {
      new: true,
    }
  );

  res.status(StatusCodes.OK).json({ msg: "Update success", updatedUser });
};
