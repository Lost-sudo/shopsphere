import { Router } from "express";
import { authenticated } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/zodValidate.middleware";
import { addCartItemSchema, updateCartItemSchema } from "../schemas/cart.schema";

import { cartController } from "../config/container";

const router = Router();

router.use(authenticated);

router.get("/", cartController.getCart);
router.post("/items", validate(addCartItemSchema), cartController.addItem);
router.put("/items/:itemId", validate(updateCartItemSchema), cartController.updateItem);
router.delete("/items/:itemId", cartController.removeItem);
router.delete("/", cartController.clearCart);

export default router;
