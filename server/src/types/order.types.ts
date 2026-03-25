import { Payment } from "./payment.types";
import { Product } from "./product.types";

export type Order = {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: string;
  paymentMethod: string;
  idempotencyKey?: string | null;
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
  product?: Product;
  createdAt: Date;
  updatedAt: Date;
};
