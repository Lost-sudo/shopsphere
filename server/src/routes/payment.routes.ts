import { Router } from "express";
import { authenticated } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/zodValidate.middleware";
import { paymentSchema } from "../schemas/payment.schema";

import { paymentController } from "../config/container";

const router = Router();

router.post(
  "/:orderId",
  authenticated,
  validate(paymentSchema.omit({ orderId: true, amount: true })),
  paymentController.processPayment
);

router.get("/:orderId", authenticated, paymentController.getPaymentByOrderId);

export default router;
