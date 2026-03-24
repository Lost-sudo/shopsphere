import { Payment } from "./payment.types";

export type Order = {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: string;
  paymentMethod: string;
  status: string;
  payment?: Payment;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
};
