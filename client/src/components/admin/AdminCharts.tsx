"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Filter, Package, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminChartsProps {
    revenueByMonth: { month: string; value: number }[];
    topProducts: { name: string; sales: string; growth: string }[];
    totalProducts: number;
    lowStockCount: number;
    newCustomersThisMonth: number;
}

const barColors = [
    "bg-luxury-charcoal",
    "bg-luxury-charcoal",
    "bg-luxury-gold shadow-lg shadow-luxury-gold/20",
    "bg-luxury-charcoal",
    "bg-luxury-charcoal",
    "bg-luxury-charcoal",
    "bg-luxury-charcoal",
];

const productColors = [
    "bg-luxury-charcoal",
    "bg-luxury-gold",
    "bg-luxury-charcoal/60",
    "bg-luxury-gold/60",
];

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

export function AdminCharts({ revenueByMonth, topProducts, totalProducts, lowStockCount, newCustomersThisMonth }: AdminChartsProps) {
    const maxValue = Math.max(...revenueByMonth.map(d => d.value), 1);

    return (
        <div className="grid gap-8 lg:grid-cols-3">
            {/* Revenue Chart */}
            <Card className="lg:col-span-2 border-white/40 bg-white/60 backdrop-blur-2xl shadow-xl shadow-black/5 rounded-[2.5rem] overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between p-8 pb-0">
                    <div>
                        <CardTitle className="text-xl font-light tracking-tight text-luxury-charcoal">
                            Revenue <span className="font-serif italic text-luxury-gold">Overview</span>
                        </CardTitle>
                        <p className="text-sm text-neutral-500 mt-2 font-light flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-emerald-500" />
                            <span>Monthly revenue for the last {revenueByMonth.length} months</span>
                        </p>
                    </div>
                </CardHeader>
                <CardContent className="p-8">
                    <div className="h-[280px] flex items-end justify-between gap-6 mt-4 px-2">
                        {revenueByMonth.map((data, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-4 group h-full justify-end">
                                <div 
                                    className={cn(
                                        "w-full rounded-2xl transition-all duration-500 group-hover:scale-x-110 relative shadow-inner",
                                        barColors[i % barColors.length]
                                    )}
                                    style={{ height: `${(data.value / maxValue) * 100}%` }}
                                >
                                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-luxury-charcoal text-white text-[10px] px-3 py-1.5 rounded-lg font-bold z-10 whitespace-nowrap shadow-xl">
                                        {formatCurrency(data.value)}
                                    </div>
                                </div>
                                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{data.month}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Top Products */}
            <Card className="border-white/40 bg-white/60 backdrop-blur-2xl shadow-xl shadow-black/5 rounded-[2.5rem] overflow-hidden">
                <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-xl font-light tracking-tight text-luxury-charcoal">
                        Top <span className="font-serif italic text-luxury-gold">Selling</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                    {topProducts.map((product, i) => (
                        <div key={i} className="flex flex-col gap-3 relative group">
                            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest">
                                <span className="text-luxury-charcoal truncate max-w-[150px]">{product.name}</span>
                                <span className="text-neutral-400">{product.sales} sales</span>
                            </div>
                            <div className="h-3 w-full bg-white/40 border border-white/60 rounded-full overflow-hidden shadow-inner p-0.5">
                                <div 
                                    className={cn("h-full rounded-full transition-all duration-1000 shadow-sm", productColors[i % productColors.length])} 
                                    style={{ width: `${Math.max(10, 60 - (i * 10))}%` }}
                                />
                            </div>
                            <span className="text-[10px] absolute -right-1 -bottom-5 text-emerald-500 font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">{product.growth}</span>
                        </div>
                    ))}
                    
                    <div className="mt-8 pt-8 border-t border-black/5">
                        <div className="flex items-center gap-4 justify-around">
                            <div className="text-center">
                                <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest mb-2">Products</p>
                                <p className="text-xl font-serif italic text-luxury-charcoal">{totalProducts}</p>
                            </div>
                            <div className="w-[1px] h-10 bg-black/5" />
                            <div className="text-center">
                                <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest mb-2">Low Stock</p>
                                <p className="text-xl font-serif italic text-luxury-gold">{lowStockCount}</p>
                            </div>
                            <div className="w-[1px] h-10 bg-black/5" />
                            <div className="text-center">
                                <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest mb-2">New</p>
                                <p className="text-xl font-serif italic text-emerald-600">{newCustomersThisMonth}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

