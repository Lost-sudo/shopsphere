import type { Order } from "@/features/order/order.types";

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

export interface GetDashboardResponse {
    success: boolean;
    message: string;
    data: DashboardData;
}
