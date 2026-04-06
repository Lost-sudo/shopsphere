import { IOrderService, IOrderRepository } from "../interfaces/order.interface";
import { Order } from "../types/order.types";
import { OrderInput, UpdateOrderInput } from "../schemas/order.schema";
import { BadRequestError } from "../utils/errors/badRequestError";
import { NotFoundError } from "../utils/errors/notFoundError";
import { IShipmentService } from "../interfaces/shipment.interface";
import { Carrier, ShipmentStatus } from "../schemas/shipment.schema";
import { Shipment } from "../generated/client";
import { orderRepository } from "../repositories/order.repository";
import { shipmentService } from "./shipment.service";

export class OrderService implements IOrderService {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly shipmentService: IShipmentService,
  ) {}

  async createOrder(input: OrderInput, userId: string): Promise<Order> {
    if (!userId) throw new BadRequestError("User ID is required.");

    if (input.items.length === 0)
      throw new BadRequestError("Order must contain at least one item.");

    if (input.idempotencyKey) {
      const existingOrder = await this.orderRepository.getOrderByIdempotencyKey(
        input.idempotencyKey,
      );
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

  async processShipment(orderId: string, carrier: Carrier): Promise<Shipment> {
    const order = await this.orderRepository.getOrderById(orderId);
    if (!order) {
      throw new NotFoundError("Order not found.");
    }

    if (order.status.toUpperCase() !== "PAID") {
      throw new BadRequestError(
        "Order must be paid before processing shipment.",
      );
    }

    // Calculate total weight
    const totalWeight = order.items.reduce((acc, item) => {
      return acc + (item.product?.weight || 0) * item.quantity;
    }, 0);

    // Mock sender info - in real app would come from warehouse/config
    const sender = {
      name: "ShopSphere Warehouse",
      address: "123 Warehouse St, Manila, Philippines",
      phone: "09123456789",
    };

    // Recipient info from order's shipping address
    const recipient = {
      address: order.shippingAddress,
      name: "Customer", // Placeholder
    };

    const shipment = await this.shipmentService.createShipment({
      orderId: order.id,
      carrier,
      status: ShipmentStatus.PENDING,
      sender,
      recipient,
      weight: totalWeight,
    });

    // Update order status to SHIPPED
    await this.orderRepository.updateOrder(orderId, {
      status: "SHIPPED",
    });

    return shipment;
  }
}

export const orderService = new OrderService(orderRepository, shipmentService);
