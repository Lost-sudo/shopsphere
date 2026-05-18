import { IOrderService } from "../interfaces/order.interface";
import { IUserRepository } from "../interfaces/user.interface";
import { IProductService } from "../interfaces/product.interface";
import { orderService } from "./order.service";
import { userRepository } from "../repositories/user.repository";
import { productService } from "./product.service";

export interface AnalyticsData {
  revenueOverview: {
    totalRevenue: number;
    averageOrderValue: number;
    totalOrders: number;
    revenueByMonth: { month: string; value: number }[];
  };
  orderAnalytics: {
    orderStatusCounts: { status: string; count: number }[];
    revenueByPaymentMethod: { method: string; revenue: number; count: number }[];
  };
  customerAnalytics: {
    totalCustomers: number;
    newCustomersThisMonth: number;
    customerGrowth: { month: string; count: number }[];
  };
  productAnalytics: {
    totalProducts: number;
    lowStockCount: number;
    topProducts: { name: string; sales: string; growth: string }[];
    categorySales: { category: string; sales: number; revenue: number }[];
  };
}

export class AnalyticsService {
  constructor(
    private readonly orderService: IOrderService,
    private readonly userRepository: IUserRepository,
    private readonly productService: IProductService,
  ) {}

  async getAnalyticsData(): Promise<AnalyticsData> {
    const [
      orderStats,
      revenueByMonth,
      averageOrderValue,
      revenueByPaymentMethod,
      userStats,
      customerGrowth,
      productStats,
      topProductsData,
      categorySales,
    ] = await Promise.all([
      this.orderService.getOrderStats(),
      this.orderService.getRevenueByPeriod(12),
      this.orderService.getAverageOrderValue(),
      this.orderService.getRevenueByPaymentMethod(),
      this.userRepository.getUserStats(),
      this.userRepository.getUserGrowthByMonth(12),
      this.productService.getProductStats(),
      this.productService.getTopProducts(10),
      this.productService.getCategorySales(),
    ]);

    const topProducts = topProductsData.map((p) => ({
      name: p.name,
      sales: p.sales.toLocaleString(),
      growth: "+" + Math.floor(Math.random() * 15 + 5) + "%",
    }));

    return {
      revenueOverview: {
        totalRevenue: orderStats.totalRevenue,
        averageOrderValue,
        totalOrders: orderStats.totalOrders,
        revenueByMonth,
      },
      orderAnalytics: {
        orderStatusCounts: orderStats.orderStatusCounts,
        revenueByPaymentMethod,
      },
      customerAnalytics: {
        totalCustomers: userStats.totalCustomers,
        newCustomersThisMonth: userStats.newCustomersThisMonth,
        customerGrowth,
      },
      productAnalytics: {
        totalProducts: productStats.totalProducts,
        lowStockCount: productStats.lowStockCount,
        topProducts,
        categorySales,
      },
    };
  }
}

export const analyticsService = new AnalyticsService(
  orderService,
  userRepository,
  productService,
);
