import { Router } from "express";
const router = Router();

import {
  GetAllJobs,
  Getjob,
  CreateJobs,
  EditJobs,
  DeleteJobs,
  showStats,
} from "../controllers/jobController.js";

import {
  validateJobInput,
  validateJobId,
} from "../middlewares/validationMiddleware.js";
import { checkForTestUser } from "../middlewares/authMiddleware.js";

router
  .route("/")
  .get(GetAllJobs)
  .post(checkForTestUser, validateJobInput, CreateJobs);

router.route("/stats").get(showStats);

router
  .route("/:id")
  .get(validateJobId, Getjob)
  .patch(checkForTestUser, validateJobInput, validateJobId, EditJobs)
  .delete(checkForTestUser, validateJobId, DeleteJobs);

export default router;
