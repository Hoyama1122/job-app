import { Router } from "express";
const router = Router();

import {
  GetAllJobs,
  Getjob,
  CreateJobs,
  EditJobs,
  DeleteJobs,
} from "../controllers/jobController.js";

import {
  validateJobInput,
  validateJobId,
} from "../middlewares/validationMiddleware.js";

router.route("/").get(GetAllJobs).post(validateJobInput, CreateJobs);
router
  .route("/:id")
  .get(validateJobId, Getjob)
  .patch(validateJobInput, validateJobId, EditJobs)
  .delete(validateJobId,DeleteJobs);

export default router;
