import { IPaymentMethodProcessor, PaymentResult } from "@/interfaces/payment_method.interface";

export class GcashPaymentMethod implements IPaymentMethodProcessor {
    async processPayment(orderId: string, amount: number): Promise<PaymentResult> {
        // Simulate GCash e-wallet processing
        const transactionId = `GCASH-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

        // Simulate processing delay
        await new Promise((resolve) => setTimeout(resolve, 300));

        // Mock: 98% success rate
        const isSuccess = Math.random() < 0.98;

        return {
            transactionId,
            status: isSuccess ? "COMPLETED" : "FAILED",
            method: "GCASH",
            message: isSuccess
                ? "GCash payment processed successfully."
                : "GCash payment failed. Insufficient balance.",
        };
    }
}
