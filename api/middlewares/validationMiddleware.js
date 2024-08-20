import { body, param, validationResult } from "express-validator";
import { BadRequestError, NotFoundError } from "../error/customError.js";
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
  param("id").custom(async (value) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) {
      throw new BadRequestError("invalid MongoDB id");
    }
    const job = await Job.findById(value);
    if (!job) throw new NotFoundError(`no job with id : ${value}`);
  }),
]);

export const validateRegister = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .isEmail()
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
  body("role").isIn(Object.values(Role)).withMessage("role is invalid"),
]);
