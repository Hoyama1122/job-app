import { Router } from "express";
const router = Router();

import {
  getApplicationStats,
  getuser,
  updateUser,
} from "../controllers/Usercontroller.js";
import { validateUpdateUser } from "../middlewares/validationMiddleware.js";
import { authorizePermissions } from "../middlewares/authMiddleware.js";

router.get("/current-user", getuser);
router.get(
  "/admin/app-stats",
  [authorizePermissions("admin")],
  getApplicationStats
);
router.patch("/update-user", validateUpdateUser, updateUser);

export default router;
