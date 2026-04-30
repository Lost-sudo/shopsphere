import {
  IPaymentService,
  IPaymentRepository,
} from "../interfaces/payment.interface";
import { IOrderRepository } from "../interfaces/order.interface";
import { Payment, PaymentStatus } from "../types/payment.types";
import { BadRequestError } from "../utils/errors/badRequestError";
import { NotFoundError } from "../utils/errors/notFoundError";
import { paymentRepository } from "../repositories/payment.repository";
import { orderRepository } from "../repositories/order.repository";
import { PaymentMethodFactory } from "../factory/payment_method.factory";
import { PaymentMethod } from "@/schemas/payment.schema";

export class PaymentService implements IPaymentService {
  constructor(
    private readonly paymentRepository: IPaymentRepository,
    private readonly orderRepository: IOrderRepository,
  ) {}

  async processPayment(
    orderId: string,
    paymentMethod: PaymentMethod,
  ): Promise<Payment> {
    const order = await this.orderRepository.getOrderById(orderId);
    if (!order) {
      throw new NotFoundError("Order not found.");
    }

    if (order.status.toUpperCase() === "PAID") {
      throw new BadRequestError("Order is already paid.");
    }

    const processor = PaymentMethodFactory.getPaymentMethod(paymentMethod);
    const amount = Number(order.totalAmount);

    const result = await processor.processPayment(orderId, amount);

    const payment = await this.paymentRepository.createPayment({
      orderId,
      amount,
      paymentMethod,
      transactionId: result.transactionId,
      status: result.status,
    });

    if (result.status === "COMPLETED") {
      // Update order status to PAID
      await this.orderRepository.updateOrder(orderId, {
        status: "PAID",
      });
    } else if (result.method === "COD") {
      // For COD we can just transition order to PROCESSING or leave it as PENDING
      // Let's update it to PROCESSING since the order is confirmed
      await this.orderRepository.updateOrder(orderId, {
        status: "PROCESSING",
      });
    }

    return payment;
  }

  async getPaymentByOrderId(orderId: string): Promise<Payment | null> {
    const payment = await this.paymentRepository.getPaymentByOrderId(orderId);
    if (!payment) {
      throw new NotFoundError("Payment for this order not found.");
    }
    return payment;
  }

  async updatePaymentStatus(
    paymentId: string,
    status: string,
  ): Promise<Payment> {
    return await this.paymentRepository.updatePaymentStatus(paymentId, status);
  }
}

export const paymentService = new PaymentService(
  paymentRepository,
  orderRepository,
);
