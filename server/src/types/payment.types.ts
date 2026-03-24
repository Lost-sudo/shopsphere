export enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export type Payment = {
  id: string;
  orderId: string;
  method: string;
  transactionId: string;
  amount: number;
  status: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
};
