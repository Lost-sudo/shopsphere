import { IPaymentMethodProcessor, PaymentResult } from "@/interfaces/payment_method.interface";

export class CardPaymentMethod implements IPaymentMethodProcessor {
    async processPayment(orderId: string, amount: number): Promise<PaymentResult> {
        // Simulate credit/debit card gateway processing
        const transactionId = `CARD-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

        // Simulate processing delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Mock: 95% success rate
        const isSuccess = Math.random() < 0.95;

        return {
            transactionId,
            status: isSuccess ? "COMPLETED" : "FAILED",
            method: "CARD",
            message: isSuccess
                ? "Card payment processed successfully."
                : "Card payment declined. Please try again.",
        };
    }
}
