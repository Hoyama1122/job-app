import { Router } from "express";
import { login, logout, register } from "../controllers/authController.js";
const router = Router();
import {
  validateRegister,
  validateLogin,
} from "../middlewares/validationMiddleware.js";

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/logout", logout);

export default router;
