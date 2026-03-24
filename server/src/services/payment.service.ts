import { IPaymentService, IPaymentRepository } from "../interfaces/payment.interface";
import { IOrderRepository } from "../interfaces/order.interface";
import { Payment, PaymentStatus } from "../types/payment.types";
import { BadRequestError } from "../utils/errors/badRequestError";
import { NotFoundError } from "../utils/errors/notFoundError";

export class PaymentService implements IPaymentService {
  constructor(
    private readonly paymentRepository: IPaymentRepository,
    private readonly orderRepository: IOrderRepository
  ) {}

  async processPayment(orderId: string, paymentMethod: string): Promise<Payment> {
    const order = await this.orderRepository.getOrderById(orderId);
    if (!order) {
      throw new NotFoundError("Order not found.");
    }

    if (order.status === "paid") {
      throw new BadRequestError("Order is already paid.");
    }

    // Mock payment processing
    // In a real scenario, this would involve Stripe/PayPal SDKs
    const transactionId = `trans_${Math.random().toString(36).substr(2, 9)}`;
    const amount = order.totalAmount;

    const payment = await this.paymentRepository.createPayment({
      orderId,
      amount,
      paymentMethod,
      transactionId,
      status: PaymentStatus.COMPLETED,
    });

    // Update order status to PAID
    await this.orderRepository.updateOrder(orderId, {
      status: "PAID",
    });

    return payment;
  }

  async getPaymentByOrderId(orderId: string): Promise<Payment | null> {
    const payment = await this.paymentRepository.getPaymentByOrderId(orderId);
    if (!payment) {
      throw new NotFoundError("Payment for this order not found.");
    }
    return payment;
  }
}
