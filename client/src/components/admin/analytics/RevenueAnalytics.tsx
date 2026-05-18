"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, ShoppingCart, Receipt } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RevenueOverview } from "@/features/analytics/analytics.types";

interface RevenueAnalyticsProps {
    data: RevenueOverview;
}

const barColors = [
    "bg-luxury-charcoal",
    "bg-luxury-charcoal",
    "bg-luxury-gold",
    "bg-luxury-charcoal",
    "bg-luxury-charcoal",
    "bg-luxury-charcoal",
    "bg-luxury-gold",
    "bg-luxury-charcoal",
    "bg-luxury-charcoal",
    "bg-luxury-charcoal",
    "bg-luxury-gold",
    "bg-luxury-charcoal",
];

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}

function formatCompact(amount: number): string {
    if (amount >= 1_000_000) return "₱" + (amount / 1_000_000).toFixed(1) + "M";
    if (amount >= 1_000) return "₱" + (amount / 1_000).toFixed(1) + "K";
    return formatCurrency(amount);
}

export function RevenueAnalytics({ data }: RevenueAnalyticsProps) {
    const maxValue = Math.max(...data.revenueByMonth.map(d => d.value), 1);

    return (
        <div className="grid gap-8 lg:grid-cols-3">
            <Card className="lg:col-span-2 border-white/40 bg-white/60 backdrop-blur-2xl shadow-xl shadow-black/5 rounded-[2.5rem] overflow-hidden">
                <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-xl font-light tracking-tight text-luxury-charcoal">
                        Revenue <span className="font-serif italic text-luxury-gold">Trend</span>
                    </CardTitle>
                    <p className="text-sm text-neutral-500 font-light flex items-center gap-2 mt-2">
                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                        <span>12-month revenue breakdown</span>
                    </p>
                </CardHeader>
                <CardContent className="p-8 pt-2">
                    <div className="h-[300px] flex items-end justify-between gap-3 px-2">
                        {data.revenueByMonth.map((month, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-3 group h-full justify-end">
                                <div
                                    className={cn(
                                        "w-full rounded-2xl transition-all duration-500 group-hover:scale-x-110 relative shadow-inner",
                                        barColors[i % barColors.length]
                                    )}
                                    style={{ height: `${(month.value / maxValue) * 100}%` }}
                                >
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-luxury-charcoal text-white text-[10px] px-2 py-1.5 rounded-lg font-bold z-10 whitespace-nowrap shadow-xl">
                                        {formatCompact(month.value)}
                                    </div>
                                </div>
                                <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">{month.month.split(" ")[0]}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="border-white/40 bg-white/60 backdrop-blur-2xl shadow-xl shadow-black/5 rounded-[2.5rem] overflow-hidden">
                    <CardContent className="p-8">
                        <div className="w-12 h-12 rounded-2xl bg-luxury-gold/10 flex items-center justify-center mb-4">
                            <DollarSign className="w-6 h-6 text-luxury-gold" />
                        </div>
                        <p className="text-[10px] font-bold uppercase text-neutral-400 tracking-[0.2em]">Total Revenue</p>
                        <p className="text-3xl font-serif italic text-luxury-charcoal mt-2 tracking-tight">{formatCurrency(data.totalRevenue)}</p>
                    </CardContent>
                </Card>

                <Card className="border-white/40 bg-white/60 backdrop-blur-2xl shadow-xl shadow-black/5 rounded-[2.5rem] overflow-hidden">
                    <CardContent className="p-8">
                        <div className="w-12 h-12 rounded-2xl bg-luxury-charcoal/10 flex items-center justify-center mb-4">
                            <Receipt className="w-6 h-6 text-luxury-charcoal" />
                        </div>
                        <p className="text-[10px] font-bold uppercase text-neutral-400 tracking-[0.2em]">Average Order Value</p>
                        <p className="text-3xl font-serif italic text-luxury-charcoal mt-2 tracking-tight">{formatCurrency(data.averageOrderValue)}</p>
                    </CardContent>
                </Card>

                <Card className="border-white/40 bg-white/60 backdrop-blur-2xl shadow-xl shadow-black/5 rounded-[2.5rem] overflow-hidden">
                    <CardContent className="p-8">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center mb-4">
                            <ShoppingCart className="w-6 h-6 text-emerald-600" />
                        </div>
                        <p className="text-[10px] font-bold uppercase text-neutral-400 tracking-[0.2em]">Total Orders</p>
                        <p className="text-3xl font-serif italic text-luxury-charcoal mt-2 tracking-tight">{data.totalOrders.toLocaleString()}</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
