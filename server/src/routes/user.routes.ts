import { Router } from "express";
import { userController } from "../config/container";
import { authenticated, authorized } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authenticated, authorized(["ADMIN", "SUPER_ADMIN"]), userController.getAllUser);

export default router;