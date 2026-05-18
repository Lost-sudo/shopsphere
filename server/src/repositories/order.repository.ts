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
          product: item.product ? {
          id: item.product.id,
          name: item.product.name,
          description: item.product.description,
          price: Number(item.product.price),
          stock: item.product.stock,
          images: item.product.images,
          isActive: item.product.isActive,
          weight: Number(item.product.weight),
          createdAt: item.product.createdAt,
          updatedAt: item.product.updatedAt,
        } : undefined,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      })) || [],
      totalAmount: Number(prismaOrder.totalAmount),
      shippingAddress: prismaOrder.shippingAddress,
      paymentMethod: prismaOrder.paymentMethod,
      shippingMethod: prismaOrder.shippingMethod,
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
      user: prismaOrder.user ? {
        name: prismaOrder.user.name,
        email: prismaOrder.user.email,
      } : undefined,
      shipment: prismaOrder.shipment ? {
        id: prismaOrder.shipment.id,
        orderId: prismaOrder.shipment.orderId,
        trackingNumber: prismaOrder.shipment.trackingNumber,
        shippingMethod: prismaOrder.shipment.shippingMethod,
        status: prismaOrder.shipment.status,
        shipping_fee: Number(prismaOrder.shipment.shipping_fee),
        weight: Number(prismaOrder.shipment.weight),
        sender: prismaOrder.shipment.sender,
        recipient: prismaOrder.shipment.recipient,
        createdAt: prismaOrder.shipment.createdAt,
        updatedAt: prismaOrder.shipment.updatedAt,
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
        shippingMethod: input.shippingMethod,
        idempotencyKey: input.idempotencyKey,
        status: (input.status?.toUpperCase() as OrderStatus) || OrderStatus.PENDING,
        items: {
          create: input.items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        payment: true,
        user: true,
        shipment: true,
      },
    });

    return this.mapPrismaOrderToOrder(order);
  }

  async getOrderByIdempotencyKey(key: string): Promise<Order | null> {
    const order = await prisma.order.findUnique({
      where: { idempotencyKey: key },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        payment: true,
        user: true,
        shipment: true,
      },
    });

    if (!order) return null;
    return this.mapPrismaOrderToOrder(order);
  }

  async getOrderById(orderId: string): Promise<Order | null> {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        payment: true,
        user: true,
        shipment: true,
      },
    });

    if (!order) return null;
    return this.mapPrismaOrderToOrder(order);
  }

  async getOrdersByUserId(userId: string): Promise<Order[]> {
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        payment: true,
        user: true,
        shipment: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return orders.map((order) => this.mapPrismaOrderToOrder(order));
  }

  async getAllOrders(): Promise<Order[]> {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true,
          },
        },
        payment: true,
        user: true,
        shipment: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return orders.map((order) => this.mapPrismaOrderToOrder(order));
  }

  async getRecentOrders(limit: number): Promise<Order[]> {
    const orders = await prisma.order.findMany({
      take: limit,
      include: {
        items: {
          include: {
            product: true,
          },
        },
        payment: true,
        user: true,
        shipment: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return orders.map((order) => this.mapPrismaOrderToOrder(order));
  }

  async getOrderStats(): Promise<{
    totalRevenue: number;
    totalOrders: number;
    orderStatusCounts: { status: string; count: number }[];
    revenueByMonth: { month: string; value: number }[];
  }> {
    const orders = await prisma.order.findMany({
      select: {
        status: true,
        totalAmount: true,
        createdAt: true,
      },
    });

    const totalOrders = orders.length;

    const completedOrders = orders.filter(
      (o) => o.status === "DELIVERED" || o.status === "PAID",
    );
    const totalRevenue = completedOrders.reduce(
      (sum, o) => sum + Number(o.totalAmount),
      0,
    );

    const statusMap = new Map<string, number>();
    for (const o of orders) {
      const status = o.status.toLowerCase();
      statusMap.set(status, (statusMap.get(status) || 0) + 1);
    }
    const orderStatusCounts = Array.from(statusMap.entries()).map(
      ([status, count]) => ({ status, count }),
    );

    // Revenue by month for last 7 months
    const now = new Date();
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    const monthlyMap = new Map<string, number>();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
      monthlyMap.set(key, 0);
    }
    for (const o of completedOrders) {
      const d = new Date(o.createdAt);
      const key = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
      if (monthlyMap.has(key)) {
        monthlyMap.set(key, monthlyMap.get(key)! + Number(o.totalAmount));
      }
    }
    const revenueByMonth = Array.from(monthlyMap.entries()).map(
      ([month, value]) => ({ month, value }),
    );

    return { totalRevenue, totalOrders, orderStatusCounts, revenueByMonth };
  }

  async getRevenueByPeriod(months: number): Promise<{ month: string; value: number }[]> {
    const now = new Date();
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    const startDate = new Date(now.getFullYear(), now.getMonth() - (months - 1), 1);

    const orders = await prisma.order.findMany({
      where: {
        status: { in: ["DELIVERED", "PAID"] },
        createdAt: { gte: startDate },
      },
      select: {
        totalAmount: true,
        createdAt: true,
      },
    });

    const monthlyMap = new Map<string, number>();
    for (let i = months - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
      monthlyMap.set(key, 0);
    }
    for (const o of orders) {
      const d = new Date(o.createdAt);
      const key = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
      if (monthlyMap.has(key)) {
        monthlyMap.set(key, monthlyMap.get(key)! + Number(o.totalAmount));
      }
    }

    return Array.from(monthlyMap.entries()).map(([month, value]) => ({ month, value }));
  }

  async getAverageOrderValue(): Promise<number> {
    const result = await prisma.order.aggregate({
      _avg: { totalAmount: true },
      where: { status: { in: ["DELIVERED", "PAID"] } },
    });
    return Number(result._avg.totalAmount) || 0;
  }

  async getRevenueByPaymentMethod(): Promise<{ method: string; revenue: number; count: number }[]> {
    const orders = await prisma.order.findMany({
      where: { status: { in: ["DELIVERED", "PAID"] } },
      select: {
        paymentMethod: true,
        totalAmount: true,
      },
    });

    const methodMap = new Map<string, { revenue: number; count: number }>();
    for (const o of orders) {
      const method = o.paymentMethod.toUpperCase();
      const existing = methodMap.get(method) || { revenue: 0, count: 0 };
      existing.revenue += Number(o.totalAmount);
      existing.count += 1;
      methodMap.set(method, existing);
    }

    return Array.from(methodMap.entries()).map(([method, data]) => ({
      method,
      revenue: data.revenue,
      count: data.count,
    }));
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
        shippingMethod: input.shippingMethod,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        payment: true,
        user: true,
        shipment: true,
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

export const orderRepository = new OrderRepository();
