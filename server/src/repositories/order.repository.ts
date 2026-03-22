import { IOrderRepository } from "../interfaces/order.interface";
import { Order } from "../types/order.types";
import { OrderInput, UpdateOrderInput } from "../schemas/order.schema";

export class OrderRepository implements IOrderRepository {
  createOrder(input: OrderInput, userId: string): Promise<Order> {
    throw new Error("Method not implemented.");
  }
  getOrderById(orderId: string): Promise<Order | null> {
    throw new Error("Method not implemented.");
  }
  getOrdersByUserId(userId: string): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }
  updateOrder(
    orderId: string,
    input: Partial<UpdateOrderInput>,
  ): Promise<Order | null> {
    throw new Error("Method not implemented.");
  }
  deleteOrder(orderId: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
