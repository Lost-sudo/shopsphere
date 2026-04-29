import { Payment } from "../types/payment.types";

export interface PaymentResult {
    transactionId: string;
    status: string;
    method: string;
    message: string;
}

export interface IPaymentMethodProcessor {
    processPayment(orderId: string, amount: number): Promise<PaymentResult>;
}
