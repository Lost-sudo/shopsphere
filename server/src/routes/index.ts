import { Router } from "express";
import authRoutes from "./auth.routes";
import addressRoutes from "./address.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/address", addressRoutes);

export default router;
