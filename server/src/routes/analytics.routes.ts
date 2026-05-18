import { Router } from "express";
import { authenticated, authorized } from "../middlewares/auth.middleware";
import { analyticsController } from "../controllers/analytics.controller";

const router = Router();

router.get(
  "/",
  authenticated,
  authorized(["ADMIN", "SUPER_ADMIN"]),
  analyticsController.getAnalyticsData,
);

export default router;
