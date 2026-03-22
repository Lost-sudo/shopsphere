import { OrderInput, UpdateOrderInput } from "../schemas/order.schema";
import { Order } from "../types/order.types";

export interface IOrderRepository {
  createOrder(input: OrderInput, userId: string): Promise<Order>;
  getOrderById(orderId: string): Promise<Order | null>;
  getOrdersByUserId(userId: string): Promise<Order[]>;
  updateOrder(
    orderId: string,
    input: Partial<UpdateOrderInput>,
  ): Promise<Order | null>;
  deleteOrder(orderId: string): Promise<boolean>;
}

export interface IOrderService {
  createOrder(input: OrderInput, userId: string): Promise<Order>;
  getOrderById(orderId: string): Promise<Order | null>;
  getOrdersByUserId(userId: string): Promise<Order[]>;
  updateOrder(
    orderId: string,
    input: Partial<UpdateOrderInput>,
  ): Promise<Order | null>;
  deleteOrder(orderId: string): Promise<boolean>;
}
