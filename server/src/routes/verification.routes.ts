import { Router } from "express";

import { verificationController } from "../config/container";

const router = Router();

router.get("/verify-email", verificationController.verifyEmailUpdate);
router.post("/reset-password", verificationController.verifyPasswordReset);

export default router;
