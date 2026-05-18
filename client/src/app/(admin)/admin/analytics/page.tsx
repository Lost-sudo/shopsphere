"use client";

import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetAnalyticsDataQuery } from "@/features/analytics/analytics.api";
import { RevenueAnalytics } from "@/components/admin/analytics/RevenueAnalytics";
import { OrderAnalytics } from "@/components/admin/analytics/OrderAnalytics";
import { CustomerAnalytics } from "@/components/admin/analytics/CustomerAnalytics";
import { ProductAnalytics } from "@/components/admin/analytics/ProductAnalytics";

export default function AnalyticsPage() {
    const { data, isLoading, isError, refetch } = useGetAnalyticsDataQuery();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="flex items-center gap-3 text-neutral-400">
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span className="text-sm font-light">Loading analytics data...</span>
                </div>
            </div>
        );
    }

    if (isError || !data?.data) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <p className="text-neutral-500 font-light">Failed to load analytics data.</p>
                <Button onClick={refetch} variant="ghost" className="h-10 px-4 rounded-xl text-xs font-bold uppercase tracking-widest">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Retry
                </Button>
            </div>
        );
    }

    const { revenueOverview, orderAnalytics, customerAnalytics, productAnalytics } = data.data;

    return (
        <div className="space-y-12 animate-fade-up">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-light tracking-tight text-luxury-charcoal">
                        Analytics <span className="font-serif italic text-luxury-gold">Overview</span>
                    </h1>
                    <p className="mt-2 text-neutral-500 font-light">
                        Deep dive into your business performance metrics.
                    </p>
                </div>
                <Button
                    onClick={refetch}
                    variant="ghost"
                    className="h-10 px-6 rounded-xl text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-luxury-charcoal border border-white/60 bg-white/40 backdrop-blur-xl"
                >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                </Button>
            </div>

            {/* Revenue Analytics */}
            <div className="animate-fade-up [animation-delay:100ms]">
                <RevenueAnalytics data={revenueOverview} />
            </div>

            {/* Order Analytics */}
            <div className="animate-fade-up [animation-delay:200ms]">
                <OrderAnalytics data={orderAnalytics} />
            </div>

            {/* Customer Analytics */}
            <div className="animate-fade-up [animation-delay:300ms]">
                <CustomerAnalytics data={customerAnalytics} />
            </div>

            {/* Product Analytics */}
            <div className="animate-fade-up [animation-delay:400ms]">
                <ProductAnalytics data={productAnalytics} />
            </div>
        </div>
    );
}
