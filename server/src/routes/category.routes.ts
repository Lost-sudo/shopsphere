import { Router } from "express";
import { categoryController } from "../config/container";
import { validate } from "../middlewares/zodValidate.middleware";
import {
  categorySchema,
  updateCategorySchema,
} from "../schemas/category.schema";
import { authenticated, authorized } from "../middlewares/auth.middleware";

const router = Router();

router.get("/get-all-categories", categoryController.getCategories);
router.get("/get-category/:id", categoryController.getCategory);

router.post(
  "/create-category",
  authenticated,
  authorized(["ADMIN", "SUPER_ADMIN"]),
  validate(categorySchema),
  categoryController.createCategory,
);

router.put(
  "/update-category/:id",
  authenticated,
  authorized(["ADMIN", "SUPER_ADMIN"]),
  validate(updateCategorySchema),
  categoryController.updateCategory,
);

router.delete(
  "/delete-category/:id",
  authenticated,
  authorized(["ADMIN", "SUPER_ADMIN"]),
  categoryController.deleteCategory,
);

export default router;
