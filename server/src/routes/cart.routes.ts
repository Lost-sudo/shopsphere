import { Router } from "express";
import { CartController } from "../controllers/cart.controller";
import { CartService } from "../services/cart.service";
import { CartRepository } from "../repositories/cart.repository";
import { authenticated } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/zodValidate.middleware";
import { addCartItemSchema, updateCartItemSchema } from "../schemas/cart.schema";

const router = Router();

const cartRepository = new CartRepository();
const cartService = new CartService(cartRepository);
const cartController = new CartController(cartService);

router.use(authenticated);

router.get("/", cartController.getCart);
router.post("/items", validate(addCartItemSchema), cartController.addItem);
router.put("/items/:itemId", validate(updateCartItemSchema), cartController.updateItem);
router.delete("/items/:itemId", cartController.removeItem);
router.delete("/", cartController.clearCart);

export default router;
