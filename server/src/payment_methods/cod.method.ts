import { IPaymentMethodProcessor, PaymentResult } from "@/interfaces/payment_method.interface";

export class CodPaymentMethod implements IPaymentMethodProcessor {
    async processPayment(orderId: string, amount: number): Promise<PaymentResult> {
        // COD always succeeds — payment is collected on delivery
        const transactionId = `COD-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

        return {
            transactionId,
            status: "PENDING", // COD stays PENDING until delivery rider collects
            method: "COD",
            message: "Cash on Delivery order confirmed. Payment will be collected upon delivery.",
        };
    }
}
