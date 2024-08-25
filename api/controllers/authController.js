import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";

import { comparePassword, hashPassword } from "../utils/hashpassword.js";
import { UnauthenticatedError } from "../error/customError.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
  try {
    const isFirstAccount = (await User.countDocuments()) === 0;
    req.body.role = isFirstAccount ? "admin" : "user";

    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;

    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({ msg: "success" });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: error });
  }
};

export const login = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new UnauthenticatedError("invalid credentials");
  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));

  if (!isValidUser) throw new UnauthenticatedError("invalid credentials");

  const token = createJWT({ userId: user._id, role: user.role });

  const Oneday = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + Oneday),
    secure: process.env.NODE_ENV === "production",
  });
  const RoleAndUser = { role: user.role, userId: user._id };
  res.status(StatusCodes.OK).json({ message: "User logged in successfully" ,RoleAndUser});
};

export const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ message: "User logged out successfully" });
};
