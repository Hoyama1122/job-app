import { Router } from "express";
const router = Router();

import {
  GetAllJobs,
  Getjob,
  CreateJobs,
  EditJobs,
  DeleteJobs,
} from "../controllers/jobController.js";

// router.get("/", GetAllJobs);
// router.post("/", CreateJobs);

router.route("/").get(GetAllJobs).post(CreateJobs);
router.route("/:id").get(Getjob).patch(EditJobs).delete(DeleteJobs);

export default router;
