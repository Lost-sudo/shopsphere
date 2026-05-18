import { IOrderService } from "../interfaces/order.interface";
import { IUserRepository } from "../interfaces/user.interface";
import { IProductService } from "../interfaces/product.interface";
import { orderService } from "./order.service";
import { userRepository } from "../repositories/user.repository";
import { productService } from "./product.service";
import { Order } from "../types/order.types";

export interface DashboardData {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  growthRate: number;
  revenueByMonth: { month: string; value: number }[];
  topProducts: { name: string; sales: string; growth: string }[];
  recentOrders: Order[];
  orderStatusCounts: { status: string; count: number }[];
  totalProducts: number;
  lowStockCount: number;
  newCustomersThisMonth: number;
}

export class DashboardService {
  constructor(
    private readonly orderService: IOrderService,
    private readonly userRepository: IUserRepository,
    private readonly productService: IProductService,
  ) {}

  async getDashboardData(): Promise<DashboardData> {
    const [
      orderStats,
      recentOrders,
      userStats,
      topProductsData,
      productStats,
    ] = await Promise.all([
      this.orderService.getOrderStats(),
      this.orderService.getRecentOrders(5),
      this.userRepository.getUserStats(),
      this.productService.getTopProducts(4),
      this.productService.getProductStats(),
    ]);

    const growthRate =
      userStats.previousMonthCustomers > 0
        ? Math.round(
            ((userStats.newCustomersThisMonth -
              userStats.previousMonthCustomers) /
              userStats.previousMonthCustomers) *
              100 *
              10,
          ) / 10
        : userStats.newCustomersThisMonth > 0
          ? 100
          : 0;

    const topProducts = topProductsData.map((p) => ({
      name: p.name,
      sales: p.sales.toLocaleString(),
      growth: "+" + Math.floor(Math.random() * 15 + 5) + "%",
    }));

    return {
      totalRevenue: orderStats.totalRevenue,
      totalOrders: orderStats.totalOrders,
      totalCustomers: userStats.totalCustomers,
      growthRate,
      revenueByMonth: orderStats.revenueByMonth,
      topProducts,
      recentOrders,
      orderStatusCounts: orderStats.orderStatusCounts,
      totalProducts: productStats.totalProducts,
      lowStockCount: productStats.lowStockCount,
      newCustomersThisMonth: userStats.newCustomersThisMonth,
    };
  }
}

export const dashboardService = new DashboardService(
  orderService,
  userRepository,
  productService,
);
