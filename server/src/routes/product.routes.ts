import { Router } from "express";
import { validate } from "../middlewares/zodValidate.middleware";
import { upload } from "../utils/upload.util";
import {
  productSchema,
  updateProductSchema,
  productQuerySchema,
  productVariantSchema,
  updateVariantSchema,
  variantParamSchema,
} from "../schemas/product.schema";
import { authenticated, authorized } from "../middlewares/auth.middleware";
import { productController } from "@/controllers/product.controller";

const router = Router();

// ─── Product routes ────────────────────────────────────────────────────────────

router.get(
  "/",
  validate(productQuerySchema, "query"),
  productController.getProducts,
);
router.get("/:id", productController.getProduct);

router.post(
  "/",
  authenticated,
  authorized(["ADMIN", "SUPER_ADMIN"]),
  upload.array("images", 5),
  validate(productSchema),
  productController.createProduct,
);

router.patch(
  "/:id",
  authenticated,
  authorized(["ADMIN", "SUPER_ADMIN"]),
  validate(updateProductSchema),
  productController.updateProduct,
);

router.delete(
  "/:id",
  authenticated,
  authorized(["ADMIN", "SUPER_ADMIN"]),
  productController.deleteProduct,
);

// ─── Variant routes (nested under /:id/variants) ──────────────────────────────

router.get("/:id/variants", productController.getVariants);

router.get(
  "/:id/variants/:variantId",
  validate(variantParamSchema, "params"),
  productController.getVariant,
);

router.post(
  "/:id/variants",
  authenticated,
  authorized(["ADMIN", "SUPER_ADMIN"]),
  validate(productVariantSchema),
  productController.createVariant,
);

router.patch(
  "/:id/variants/:variantId",
  authenticated,
  authorized(["ADMIN", "SUPER_ADMIN"]),
  validate(variantParamSchema, "params"),
  validate(updateVariantSchema),
  productController.updateVariant,
);

router.delete(
  "/:id/variants/:variantId",
  authenticated,
  authorized(["ADMIN", "SUPER_ADMIN"]),
  validate(variantParamSchema, "params"),
  productController.deleteVariant,
);

export default router;
