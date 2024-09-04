import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthentizedError,
} from "../error/customError.js";
import { JOB_STATUS, JOB_Type, Role } from "../utils/constants.js";
import mongoose from "mongoose";
import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";

export const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      console.log(errors.isEmpty());
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("no job")) {
          throw new NotFoundError(errorMessages[0]);
        }
        if (errorMessages[0].startsWith("unauthorized")) {
          throw new UnauthentizedError("unauthorized access");
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateJobInput = withValidationErrors([
  body("company").notEmpty().withMessage("compay is required"),
  body("position").notEmpty().withMessage("position is required"),
  body("salary").notEmpty().withMessage("salary is required"),
  body("jobLocation").notEmpty().withMessage("jon location is required"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("Job status is invalid"),
  body("jobType")
    .isIn(Object.values(JOB_Type))
    .withMessage("job type is invalid"),
]);

export const validateJobId = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) {
      throw new BadRequestError("invalid MongoDB id");
    }
    const job = await Job.findById(value);
    if (!job) throw new NotFoundError(`no job with id : ${value}`);

    const isAdmin = req.user.role === "admin";

    const isOwner = req.user.userId === job.createdBy.toString();
    if (!isAdmin && !isOwner) {
      throw new UnauthentizedError("unauthorized access");
    }
  }),
]);

export const validateRegister = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required ")
    .isEmail()
    .withMessage("invalid email format ")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("email already exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long"),
  body("lastName").notEmpty().withMessage("last name is required"),
  body("location").notEmpty().withMessage("location is required"),
  body("role").isIn([Role.User, Role.Admin]).withMessage("role is invalid"),
]);

export const validateLogin = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required ")
    .isEmail()
    .withMessage("invalid email format "),
  body("password").notEmpty().withMessage("password is required"),
]);

export const validateUpdateUser = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required ")
    .isEmail()
    .withMessage("invalid email format ")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError("email already exists");
      }
    }),
  body("lastName").notEmpty().withMessage("last name is required"),
  body("location").notEmpty().withMessage("location is required"),
]);
