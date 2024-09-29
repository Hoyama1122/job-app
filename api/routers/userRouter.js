import { Router } from "express";
const router = Router();

import {
  getApplicationStats,
  getuser,
  updateUser,
} from "../controllers/Usercontroller.js";
import { validateUpdateUser } from "../middlewares/validationMiddleware.js";
import {
  authorizePermissions,
  checkForTestUser,
} from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";

router.get("/current-user", getuser);
router.get(
  "/admin/app-stats",
  [authorizePermissions("admin")],
  getApplicationStats
);
router.patch(
  "/update-user",
  checkForTestUser,
  upload.single("avatar"),
  validateUpdateUser,
  updateUser
);

export default router;
