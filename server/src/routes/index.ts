import { Router } from "express";
import authRoutes from "./auth.routes";
import addressRoutes from "./address.routes";
import categoryRoutes from "./category.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/address", addressRoutes);
router.use("/category", categoryRoutes);

export default router;
