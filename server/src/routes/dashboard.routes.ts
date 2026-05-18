import { Router } from "express";
import { authenticated, authorized } from "../middlewares/auth.middleware";
import { dashboardController } from "../controllers/dashboard.controller";

const router = Router();

router.get(
  "/",
  authenticated,
  authorized(["ADMIN", "SUPER_ADMIN"]),
  dashboardController.getDashboardData,
);

export default router;
