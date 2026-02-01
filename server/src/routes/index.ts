import { Router } from "express";
import authRoutes from "./auth.routes";
import addressRoutes from "./address.routes";
import categoryRoutes from "./category.routes";
import productRoutes from "./product.routes";



const router = Router();

router.use("/auth", authRoutes);
router.use("/address", addressRoutes);
router.use("/category", categoryRoutes);
router.use("/products", productRoutes);


export default router;
