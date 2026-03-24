import { Router } from "express";
import { PaymentController } from "../controllers/payment.controller";
import { PaymentService } from "../services/payment.service";
import { PaymentRepository } from "../repositories/payment.repository";
import { OrderRepository } from "../repositories/order.repository";
import { authenticated } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/zodValidate.middleware";
import { paymentSchema } from "../schemas/payment.schema";

const router = Router();

const orderRepository = new OrderRepository();
const paymentRepository = new PaymentRepository();
const paymentService = new PaymentService(paymentRepository, orderRepository);
const paymentController = new PaymentController(paymentService);

router.post(
  "/:orderId",
  authenticated,
  validate(paymentSchema.omit({ orderId: true, amount: true })),
  paymentController.processPayment
);

router.get("/:orderId", authenticated, paymentController.getPaymentByOrderId);

export default router;
