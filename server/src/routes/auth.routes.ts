import { Router } from "express";
import { validate } from "../middlewares/zodValidate.middleware";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import { authController } from "../config/container";
import { authenticated } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.post("/logout", authController.logout);
router.get("/get-me", authenticated, authController.getMe);
router.post("/refresh", authenticated, authController.refresh);
router.get("/verify", authController.verifyVerificationToken);
router.post(
    "/request-verification-email",
    authController.requestVerificationEmail,
);

export default router;
