export interface RevenueOverview {
    totalRevenue: number;
    averageOrderValue: number;
    totalOrders: number;
    revenueByMonth: { month: string; value: number }[];
}

export interface OrderAnalytics {
    orderStatusCounts: { status: string; count: number }[];
    revenueByPaymentMethod: { method: string; revenue: number; count: number }[];
}

export interface CustomerAnalytics {
    totalCustomers: number;
    newCustomersThisMonth: number;
    customerGrowth: { month: string; count: number }[];
}

export interface ProductAnalytics {
    totalProducts: number;
    lowStockCount: number;
    topProducts: { name: string; sales: string; growth: string }[];
    categorySales: { category: string; sales: number; revenue: number }[];
}

export interface AnalyticsData {
    revenueOverview: RevenueOverview;
    orderAnalytics: OrderAnalytics;
    customerAnalytics: CustomerAnalytics;
    productAnalytics: ProductAnalytics;
}

export interface GetAnalyticsResponse {
    success: boolean;
    message: string;
    data: AnalyticsData;
}
