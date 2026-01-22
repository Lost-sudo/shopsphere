import { Router } from "express";
import { validate } from "../middlewares/zodValidate.middleware";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import { authController } from "../config/container";

const router = Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);

export default router;
