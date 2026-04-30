import { IOrderService, IOrderRepository } from "../interfaces/order.interface";
import { Order } from "../types/order.types";
import { OrderInput, UpdateOrderInput } from "../schemas/order.schema";
import { BadRequestError } from "../utils/errors/badRequestError";
import { NotFoundError } from "../utils/errors/notFoundError";
import { IShipmentService } from "../interfaces/shipment.interface";
import { ShippingMethod, ShipmentStatus } from "../schemas/shipment.schema";
import { Shipment } from "../generated/client";
import { orderRepository } from "../repositories/order.repository";
import { shipmentService } from "./shipment.service";
import { IPaymentService } from "@/interfaces/payment.interface";
import { paymentService } from "./payment.service";
import { ICartService } from "@/interfaces/cart.interface";
import { cartService } from "./cart.service";
import { IProductService } from "@/interfaces/product.interface";
import { productService } from "./product.service";

export class OrderService implements IOrderService {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly shipmentService: IShipmentService,
    private readonly paymentService: IPaymentService,
    private readonly cartService: ICartService,
    private readonly productService: IProductService,
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
    // 1. Validate variants
    for (const item of input.items) {
      await this.productService.validateVariantSelection(
        item.productId,
        item.variantId,
      );
    }

    // 2. Remove from cart
    await this.cartService.removeItemsFromCart(
      userId,
      input.items.map((item) => ({
        productId: item.productId,
        variantId: item.variantId,
      })),
    );

    // 3. Create Order
    const order = await this.orderRepository.createOrder(input, userId);

    // 4. Reduce Stock
    for (const item of input.items) {
      await this.productService.reduceStock(
        item.productId,
        item.quantity,
        item.variantId,
      );
    }

    // 5. Process Payment
    await this.paymentService.processPayment(order.id, input.paymentMethod);

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
  async getAllOrders(): Promise<Order[]> {
    const orders = await this.orderRepository.getAllOrders();
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
    
    // If order is marked as DELIVERED and it's COD, we should also mark payment as COMPLETED
    if (input.status?.toUpperCase() === "DELIVERED" && updatedOrder?.paymentMethod.toUpperCase() === "COD") {
      const payment = await this.paymentService.getPaymentByOrderId(orderId);
      if (payment && payment.status !== "COMPLETED") {
        await this.paymentService.updatePaymentStatus(payment.id, "COMPLETED");
      }
    }

    return updatedOrder;
  }
  async deleteOrder(orderId: string): Promise<boolean> {
    const existingOrder = await this.orderRepository.getOrderById(orderId);
    if (!existingOrder)
      throw new NotFoundError("Order with the given ID does not exist.");
    await this.orderRepository.deleteOrder(orderId);
    return true;
  }

  async processShipment(
    orderId: string,
    method: ShippingMethod,
  ): Promise<Shipment> {
    const order = await this.orderRepository.getOrderById(orderId);
    if (!order) {
      throw new NotFoundError("Order not found.");
    }

    if (order.status.toUpperCase() !== "PAID" && order.paymentMethod.toUpperCase() !== "COD") {
      throw new BadRequestError(
        "Order must be paid or COD before processing shipment.",
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
      phoneNumber: "09123456789",
    };

    // Recipient info from order's shipping address
    const recipient = {
      address: order.shippingAddress,
      name: "Customer", // Placeholder
    };

    const shipment = await this.shipmentService.createShipment({
      orderId: order.id,
      shippingMethod: method,
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

export const orderService = new OrderService(
  orderRepository,
  shipmentService,
  paymentService,
  cartService,
  productService,
);
