import { Router } from "express";
import authRoutes from "./auth.routes";
import addressRoutes from "./address.routes";
import categoryRoutes from "./category.routes";
import productRoutes from "./product.routes";
import userRoutes from "./user.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/addresses", addressRoutes);
router.use("/category", categoryRoutes);
router.use("/products", productRoutes);
router.use("/users", userRoutes);

export default router;
