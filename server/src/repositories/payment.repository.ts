import prisma from "../config/db";
import { IPaymentRepository } from "../interfaces/payment.interface";
import { Payment, PaymentStatus } from "../types/payment.types";
import { PaymentInput } from "../schemas/payment.schema";

export class PaymentRepository implements IPaymentRepository {
  private mapPrismaPaymentToPayment(prismaPayment: any): Payment {
    return {
      id: prismaPayment.id,
      orderId: prismaPayment.orderId,
      method: prismaPayment.method,
      transactionId: prismaPayment.transactionId,
      amount: Number(prismaPayment.amount),
      status: prismaPayment.status as PaymentStatus,
      createdAt: prismaPayment.createdAt,
      updatedAt: prismaPayment.updatedAt,
    };
  }

  async createPayment(input: PaymentInput & { transactionId: string }): Promise<Payment> {
    const payment = await prisma.payment.create({
      data: {
        orderId: input.orderId,
        method: input.paymentMethod,
        transactionId: input.transactionId,
        amount: input.amount,
        status: (input.status?.toUpperCase() as PaymentStatus) || PaymentStatus.PENDING,
      },
    });

    return this.mapPrismaPaymentToPayment(payment);
  }

  async getPaymentByOrderId(orderId: string): Promise<Payment | null> {
    const payment = await prisma.payment.findUnique({
      where: { orderId },
    });

    if (!payment) return null;
    return this.mapPrismaPaymentToPayment(payment);
  }

  async updatePaymentStatus(paymentId: string, status: string): Promise<Payment> {
    const payment = await prisma.payment.update({
      where: { id: paymentId },
      data: {
        status: status.toUpperCase(),
      },
    });

    return this.mapPrismaPaymentToPayment(payment);
  }
}
