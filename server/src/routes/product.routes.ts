import { Router } from "express";
import { productController } from "../config/container";
import { validate } from "../middlewares/zodValidate.middleware";
import { upload } from "../utils/upload.util";
import {
    productSchema,
    updateProductSchema,
    productQuerySchema,
} from "../schemas/product.schema";
import { authenticated, authorized } from "../middlewares/auth.middleware";

const router = Router();

router.get(
    "/",
    validate(productQuerySchema, "query"),
    productController.getProducts
);
router.get("/:id", productController.getProduct);

router.post(
    "/",
    authenticated,
    authorized(["ADMIN", "SUPER_ADMIN"]),
    upload.array("images", 5),
    validate(productSchema),
    productController.createProduct
);

router.patch(
    "/:id",
    authenticated,
    authorized(["ADMIN", "SUPER_ADMIN"]),
    validate(updateProductSchema),
    productController.updateProduct
);

router.delete(
    "/:id",
    authenticated,
    authorized(["ADMIN", "SUPER_ADMIN"]),
    productController.deleteProduct
);

export default router;
