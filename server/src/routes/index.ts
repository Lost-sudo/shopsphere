import { Router } from "express";
import authRoutes from "./auth.routes";
import addressRoutes from "./address.routes";
import categoryRoutes from "./category.routes";
import productRoutes from "./product.routes";
import userRoutes from "./user.routes";
import orderRoutes from "./order.routes";
import paymentRoutes from "./payment.routes";
import cartRoutes from "./cart.routes";
import verificationRoutes from "./verification.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/addresses", addressRoutes);
router.use("/category", categoryRoutes);
router.use("/products", productRoutes);
router.use("/users", userRoutes);
router.use("/orders", orderRoutes);
router.use("/payments", paymentRoutes);
router.use("/cart", cartRoutes);
router.use("/verification", verificationRoutes);

export default router;
