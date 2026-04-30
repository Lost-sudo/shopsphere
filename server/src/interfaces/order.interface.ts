import { OrderInput, UpdateOrderInput } from "../schemas/order.schema";
import { Order } from "../types/order.types";
import { ShippingMethod } from "../schemas/shipment.schema";
import { Shipment } from "@/generated/client";

export interface IOrderRepository {
  createOrder(input: OrderInput, userId: string): Promise<Order>;
  getOrderById(orderId: string): Promise<Order | null>;
  getOrdersByUserId(userId: string): Promise<Order[]>;
  getAllOrders(): Promise<Order[]>;
  updateOrder(
    orderId: string,
    input: Partial<UpdateOrderInput>,
  ): Promise<Order | null>;
  deleteOrder(orderId: string): Promise<boolean>;
  getOrderByIdempotencyKey(key: string): Promise<Order | null>;
}

export interface IOrderService {
  createOrder(input: OrderInput, userId: string): Promise<Order>;
  getOrderById(orderId: string): Promise<Order | null>;
  getOrdersByUserId(userId: string): Promise<Order[]>;
  getAllOrders(): Promise<Order[]>;
  updateOrder(
    orderId: string,
    input: Partial<UpdateOrderInput>,
  ): Promise<Order | null>;
  deleteOrder(orderId: string): Promise<boolean>;
  getOrderByIdempotencyKey(key: string): Promise<Order | null>;
  processShipment(orderId: string): Promise<Shipment>;
}
