import { PaymentInput, UpdatePaymentInput } from "../schemas/payment.schema";
import { Payment } from "../types/payment.types";

export interface IPaymentRepository {
  createPayment(input: PaymentInput & { transactionId: string }): Promise<Payment>;
  getPaymentByOrderId(orderId: string): Promise<Payment | null>;
  updatePaymentStatus(paymentId: string, status: string): Promise<Payment>;
}

export interface IPaymentService {
  processPayment(orderId: string, paymentMethod: string): Promise<Payment>;
  getPaymentByOrderId(orderId: string): Promise<Payment | null>;
}
