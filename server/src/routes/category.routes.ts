import { Router } from "express";
import { categoryController } from "../config/container";
import { validate } from "../middlewares/zodValidate.middleware";
import {
    categorySchema,
    updateCategorySchema,
} from "../schemas/category.schema";
import { authenticated, authorized } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", categoryController.getCategories);
router.get("/:id", categoryController.getCategory);

router.post(
    "/",
    authenticated,
    authorized(["ADMIN", "SUPER_ADMIN"]),
    validate(categorySchema),
    categoryController.createCategory,
);

router.put(
    "/:id",
    authenticated,
    authorized(["ADMIN", "SUPER_ADMIN"]),
    validate(updateCategorySchema),
    categoryController.updateCategory,
);

router.delete(
    "/:id",
    authenticated,
    authorized(["ADMIN", "SUPER_ADMIN"]),
    categoryController.deleteCategory,
);

export default router;
