import prisma from "../config/db";
import { IOrderRepository } from "../interfaces/order.interface";
import { Order } from "../types/order.types";
import { OrderInput, UpdateOrderInput } from "../schemas/order.schema";
import { OrderStatus } from "../generated/client";

export class OrderRepository implements IOrderRepository {
  private mapPrismaOrderToOrder(prismaOrder: any): Order {
    return {
      id: prismaOrder.id,
      userId: prismaOrder.userId,
      items: prismaOrder.items?.map((item: any) => ({
        id: item.id,
        orderId: item.orderId,
        productId: item.productId,
        quantity: item.quantity,
        price: Number(item.price),
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      })) || [],
      totalAmount: Number(prismaOrder.totalAmount),
      shippingAddress: prismaOrder.shippingAddress,
      paymentMethod: prismaOrder.paymentMethod,
      status: prismaOrder.status.toLowerCase(),
      payment: prismaOrder.payment ? {
        id: prismaOrder.payment.id,
        orderId: prismaOrder.payment.orderId,
        method: prismaOrder.payment.method,
        transactionId: prismaOrder.payment.transactionId,
        amount: Number(prismaOrder.payment.amount),
        status: prismaOrder.payment.status,
        createdAt: prismaOrder.payment.createdAt,
        updatedAt: prismaOrder.payment.updatedAt,
      } : undefined,
      idempotencyKey: prismaOrder.idempotencyKey,
      createdAt: prismaOrder.createdAt,
      updatedAt: prismaOrder.updatedAt,
    };
  }

  async createOrder(input: OrderInput, userId: string): Promise<Order> {
    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount: input.totalAmount,
        shippingAddress: input.shippingAddress,
        paymentMethod: input.paymentMethod,
        idempotencyKey: input.idempotencyKey,
        status: (input.status?.toUpperCase() as OrderStatus) || OrderStatus.PENDING,
        items: {
          create: input.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: true,
        payment: true,
      },
    });

    return this.mapPrismaOrderToOrder(order);
  }

  async getOrderByIdempotencyKey(key: string): Promise<Order | null> {
    const order = await prisma.order.findUnique({
      where: { idempotencyKey: key },
      include: {
        items: true,
        payment: true,
      },
    });

    if (!order) return null;
    return this.mapPrismaOrderToOrder(order);
  }

  async getOrderById(orderId: string): Promise<Order | null> {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: true,
        payment: true,
      },
    });

    if (!order) return null;
    return this.mapPrismaOrderToOrder(order);
  }

  async getOrdersByUserId(userId: string): Promise<Order[]> {
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: true,
        payment: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return orders.map((order) => this.mapPrismaOrderToOrder(order));
  }

  async updateOrder(
    orderId: string,
    input: Partial<UpdateOrderInput>,
  ): Promise<Order | null> {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: input.status?.toUpperCase() as OrderStatus,
        totalAmount: input.totalAmount,
        shippingAddress: input.shippingAddress,
        paymentMethod: input.paymentMethod,
      },
      include: {
        items: true,
        payment: true,
      },
    });

    return this.mapPrismaOrderToOrder(order);
  }

  async deleteOrder(orderId: string): Promise<boolean> {
    await prisma.order.delete({
      where: { id: orderId },
    });
    return true;
  }
}
