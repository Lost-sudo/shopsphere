import { Payment } from "./payment.types";
import { Shipment } from "./shipment.types";

export type Order = {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: string;
  paymentMethod: string;
  shippingMethod: string;
  idempotencyKey?: string | null;
  status: string;
  payment?: Payment;
  user?: {
    name: string | null;
    email: string;
  };
  shipment?: Shipment;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  product?: any; // Avoiding circular dependency or complex types for now
  createdAt: Date;
  updatedAt: Date;
};
