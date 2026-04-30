import { Router } from "express";
import { validate } from "../middlewares/zodValidate.middleware";
import { orderSchema, updateOrderSchema } from "../schemas/order.schema";
import { authenticated } from "../middlewares/auth.middleware";
import { authorized } from "../middlewares/auth.middleware";
import { orderController } from "@/controllers/order.controller";

const router = Router();

router.post(
  "/create-order",
  authenticated,
  authorized(["CUSTOMER", "ADMIN", "SUPER_ADMIN"]),
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
  "/get-all-orders",
  authenticated,
  authorized(["ADMIN", "SUPER_ADMIN"]),
  orderController.getAllOrders,
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
  authorized(["CUSTOMER", "ADMIN", "SUPER_ADMIN"]),
  validate(updateOrderSchema),
  orderController.updateOrder,
);
router.delete(
  "/delete-order/:id",
  authenticated,
  authorized(["CUSTOMER", "ADMIN", "SUPER_ADMIN"]),
  orderController.deleteOrder,
);

router.post(
  "/process-shipment/:id",
  authenticated,
  authorized(["ADMIN", "SUPER_ADMIN"]),
  orderController.processShipment,
);

export default router;
