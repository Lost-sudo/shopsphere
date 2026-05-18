"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import type { OrderAnalytics } from "@/features/analytics/analytics.types";

interface OrderAnalyticsProps {
    data: OrderAnalytics;
}

const statusStyles: Record<string, string> = {
    pending: "bg-amber-50 text-amber-600 border-amber-100",
    paid: "bg-emerald-50 text-emerald-600 border-emerald-100",
    processing: "bg-blue-50 text-blue-600 border-blue-100",
    shipped: "bg-luxury-gold/10 text-luxury-gold border-luxury-gold/20",
    delivered: "bg-emerald-50 text-emerald-600 border-emerald-100",
    cancelled: "bg-red-50 text-red-600 border-red-100",
    refunded: "bg-violet-50 text-violet-600 border-violet-100",
};

const statusDotColors: Record<string, string> = {
    pending: "bg-amber-500",
    paid: "bg-emerald-500",
    processing: "bg-blue-500",
    shipped: "bg-luxury-gold",
    delivered: "bg-emerald-600",
    cancelled: "bg-red-500",
    refunded: "bg-violet-500",
};

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}

export function OrderAnalytics({ data }: OrderAnalyticsProps) {
    const totalOrders = data.orderStatusCounts.reduce((sum, s) => sum + s.count, 0);
    const totalRevenue = data.revenueByPaymentMethod.reduce((sum, m) => sum + m.revenue, 0);

    return (
        <div className="grid gap-8 lg:grid-cols-2">
            {/* Order Status Distribution */}
            <Card className="border-white/40 bg-white/60 backdrop-blur-2xl shadow-xl shadow-black/5 rounded-[2.5rem] overflow-hidden">
                <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-xl font-light tracking-tight text-luxury-charcoal">
                        Order <span className="font-serif italic text-luxury-gold">Status</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-2 space-y-5">
                    {data.orderStatusCounts.map((s) => {
                        const percentage = totalOrders > 0 ? Math.round((s.count / totalOrders) * 100) : 0;
                        return (
                            <div key={s.status} className="space-y-2 group">
                                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest">
                                    <div className="flex items-center gap-2">
                                        <span className={cn("w-2 h-2 rounded-full", statusDotColors[s.status] || "bg-neutral-400")} />
                                        <span className="text-luxury-charcoal">{s.status}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-neutral-400">{s.count}</span>
                                        <span className="text-[10px] text-neutral-300 w-10 text-right">{percentage}%</span>
                                    </div>
                                </div>
                                <div className="h-2.5 w-full bg-white/40 border border-white/60 rounded-full overflow-hidden shadow-inner p-0.5">
                                    <div
                                        className="h-full rounded-full bg-luxury-charcoal transition-all duration-1000"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </CardContent>
            </Card>

            {/* Revenue by Payment Method */}
            <Card className="border-white/40 bg-white/60 backdrop-blur-2xl shadow-xl shadow-black/5 rounded-[2.5rem] overflow-hidden">
                <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-xl font-light tracking-tight text-luxury-charcoal">
                        Payment <span className="font-serif italic text-luxury-gold">Methods</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-2 space-y-5">
                    {data.revenueByPaymentMethod.map((m, i) => {
                        const percentage = totalRevenue > 0 ? Math.round((m.revenue / totalRevenue) * 100) : 0;
                        const methodColors = [
                            "bg-luxury-charcoal",
                            "bg-luxury-gold",
                            "bg-luxury-charcoal/60",
                            "bg-luxury-gold/60",
                        ];
                        return (
                            <div key={m.method} className="space-y-2 group">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <CreditCard className="w-4 h-4 text-neutral-400" />
                                        <span className="text-xs font-bold uppercase tracking-widest text-luxury-charcoal">{m.method}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-serif italic text-luxury-gold">{formatCurrency(m.revenue)}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-[10px] text-neutral-400 uppercase tracking-widest">
                                    <span>{m.count} transactions</span>
                                    <span>{percentage}%</span>
                                </div>
                                <div className="h-2 w-full bg-white/40 border border-white/60 rounded-full overflow-hidden shadow-inner p-0.5">
                                    <div
                                        className={cn("h-full rounded-full transition-all duration-1000", methodColors[i % methodColors.length])}
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </CardContent>
            </Card>
        </div>
    );
}
