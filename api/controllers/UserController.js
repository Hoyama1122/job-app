import User from "../models/UserModel.js";
import Job from "../models/JobModel.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import { hashPassword } from "../utils/hashpassword.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";

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
  const newUser = { ...req.body };
  delete newUser.password;

  if (req.file) {
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);  // ลบไฟล์ในระบบหลังจากอัปโหลด
    newUser.avatar = result.secure_url;  // ใช้ secure_url เพื่อเก็บ URL ที่ถูกต้อง
    newUser.avatarPublicId = result.public_id;
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: req.user.userId }, 
    newUser,
    { new: true }
  );

  res.status(StatusCodes.OK).json({ user: updatedUser });
};


