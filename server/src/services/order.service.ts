import { IOrderService, IOrderRepository } from "../interfaces/order.interface";
import { Order } from "../types/order.types";
import { OrderInput, UpdateOrderInput } from "../schemas/order.schema";
import { BadRequestError } from "../utils/errors/badRequestError";
import { NotBeforeError } from "jsonwebtoken";
import { NotFoundError } from "../utils/errors/notFoundError";

export class OrderService implements IOrderService {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async createOrder(input: OrderInput, userId: string): Promise<Order> {
    if (!userId) throw new BadRequestError("User ID is required.");

    if (input.items.length === 0)
      throw new BadRequestError("Order must contain at least one item.");

    if (input.idempotencyKey) {
      const existingOrder = await this.orderRepository.getOrderByIdempotencyKey(input.idempotencyKey);
      if (existingOrder) {
        return existingOrder;
      }
    }

    const order = await this.orderRepository.createOrder(input, userId);
    return order;
  }

  async getOrderByIdempotencyKey(key: string): Promise<Order | null> {
    return await this.orderRepository.getOrderByIdempotencyKey(key);
  }
  async getOrderById(orderId: string): Promise<Order | null> {
    const order = await this.orderRepository.getOrderById(orderId);

    if (!order)
      throw new NotFoundError("Order with the given ID does not exist.");
    return order;
  }
  async getOrdersByUserId(userId: string): Promise<Order[]> {
    const orders = await this.orderRepository.getOrdersByUserId(userId);
    return orders;
  }
  async updateOrder(
    orderId: string,
    input: Partial<UpdateOrderInput>,
  ): Promise<Order | null> {
    const existingOrder = await this.orderRepository.getOrderById(orderId);
    if (!existingOrder)
      throw new NotFoundError("Order with the given ID does not exist.");
    const updatedOrder = await this.orderRepository.updateOrder(orderId, input);
    return updatedOrder;
  }
  async deleteOrder(orderId: string): Promise<boolean> {
    const existingOrder = await this.orderRepository.getOrderById(orderId);
    if (!existingOrder)
      throw new NotFoundError("Order with the given ID does not exist.");
    await this.orderRepository.deleteOrder(orderId);
    return true;
  }
}
