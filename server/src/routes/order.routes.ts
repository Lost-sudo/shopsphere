import { Router } from "express";
import { validate } from "../middlewares/zodValidate.middleware";
import { orderSchema, updateOrderSchema } from "../schemas/order.schema";
import { orderController } from "../config/container";
import { authenticated } from "../middlewares/auth.middleware";
import { authorized } from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/create-order",
  authenticated,
  authorized(["CUSTOMER"]),
  validate(orderSchema),
  orderController.createOrder,
);
router.get(
  "/get-user-orders",
  authenticated,
  authorized(["CUSTOMER", "ADMIN", "SUPER_ADMIN"]),
  orderController.getOrdersByUserId,
);
router.get(
  "/get-order/:id",
  authenticated,
  authorized(["CUSTOMER", "ADMIN", "SUPER_ADMIN"]),
  orderController.getOrderById,
);
router.put(
  "/update-order/:id",
  authenticated,
  authorized(["CUSTOMER"]),
  validate(updateOrderSchema),
  orderController.updateOrder,
);
router.delete(
  "/delete-order/:id",
  authenticated,
  authorized(["CUSTOMER", "ADMIN", "SUPER_ADMIN"]),
  orderController.deleteOrder,
);

export default router;
