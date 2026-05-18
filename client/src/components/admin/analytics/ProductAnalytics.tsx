"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, AlertTriangle, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductAnalytics } from "@/features/analytics/analytics.types";

interface ProductAnalyticsProps {
    data: ProductAnalytics;
}

const productColors = [
    "bg-luxury-charcoal",
    "bg-luxury-gold",
    "bg-luxury-charcoal/60",
    "bg-luxury-gold/60",
    "bg-luxury-charcoal/40",
    "bg-luxury-gold/40",
    "bg-luxury-charcoal/30",
    "bg-luxury-gold/30",
    "bg-luxury-charcoal/20",
    "bg-luxury-gold/20",
];

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

export function ProductAnalytics({ data }: ProductAnalyticsProps) {
    const maxTopSales = Math.max(...data.topProducts.map(p => parseInt(p.sales.replace(/,/g, ""))), 1);
    const maxCategorySales = Math.max(...data.categorySales.map(c => c.sales), 1);

    return (
        <div className="grid gap-8 lg:grid-cols-3">
            {/* Summary Cards */}
            <div className="space-y-6">
                <Card className="border-white/40 bg-white/60 backdrop-blur-2xl shadow-xl shadow-black/5 rounded-[2.5rem] overflow-hidden">
                    <CardContent className="p-8">
                        <div className="w-12 h-12 rounded-2xl bg-luxury-charcoal/10 flex items-center justify-center mb-4">
                            <Package className="w-6 h-6 text-luxury-charcoal" />
                        </div>
                        <p className="text-[10px] font-bold uppercase text-neutral-400 tracking-[0.2em]">Active Products</p>
                        <p className="text-3xl font-serif italic text-luxury-charcoal mt-2 tracking-tight">{data.totalProducts.toLocaleString()}</p>
                    </CardContent>
                </Card>

                <Card className="border-white/40 bg-white/60 backdrop-blur-2xl shadow-xl shadow-black/5 rounded-[2.5rem] overflow-hidden">
                    <CardContent className="p-8">
                        <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
                            <AlertTriangle className="w-6 h-6 text-red-500" />
                        </div>
                        <p className="text-[10px] font-bold uppercase text-neutral-400 tracking-[0.2em]">Low Stock Items</p>
                        <p className="text-3xl font-serif italic text-luxury-charcoal mt-2 tracking-tight">{data.lowStockCount.toLocaleString()}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Top Products */}
            <Card className="border-white/40 bg-white/60 backdrop-blur-2xl shadow-xl shadow-black/5 rounded-[2.5rem] overflow-hidden">
                <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-xl font-light tracking-tight text-luxury-charcoal">
                        Top <span className="font-serif italic text-luxury-gold">Products</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-2 space-y-5">
                    {data.topProducts.map((product, i) => (
                        <div key={i} className="space-y-2 group">
                            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest">
                                <span className="text-luxury-charcoal truncate max-w-[160px]">{product.name}</span>
                                <div className="flex items-center gap-3">
                                    <span className="text-neutral-400">{product.sales} sold</span>
                                    <span className="text-[10px] text-emerald-500">{product.growth}</span>
                                </div>
                            </div>
                            <div className="h-2.5 w-full bg-white/40 border border-white/60 rounded-full overflow-hidden shadow-inner p-0.5">
                                <div
                                    className={cn("h-full rounded-full transition-all duration-1000", productColors[i % productColors.length])}
                                    style={{ width: `${Math.max(5, (parseInt(product.sales.replace(/,/g, "")) / maxTopSales) * 100)}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Category Sales */}
            <Card className="border-white/40 bg-white/60 backdrop-blur-2xl shadow-xl shadow-black/5 rounded-[2.5rem] overflow-hidden">
                <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-xl font-light tracking-tight text-luxury-charcoal">
                        Category <span className="font-serif italic text-luxury-gold">Sales</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-2 space-y-5">
                    {data.categorySales.map((cat, i) => (
                        <div key={cat.category} className="space-y-2 group">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Layers className="w-4 h-4 text-neutral-400" />
                                    <span className="text-xs font-bold uppercase tracking-widest text-luxury-charcoal">{cat.category}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-neutral-400 text-[10px]">{cat.sales} sold</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between text-[10px] text-neutral-400 uppercase tracking-widest">
                                <span>{formatCurrency(cat.revenue)} revenue</span>
                            </div>
                            <div className="h-2 w-full bg-white/40 border border-white/60 rounded-full overflow-hidden shadow-inner p-0.5">
                                <div
                                    className={cn("h-full rounded-full transition-all duration-1000", productColors[i % productColors.length])}
                                    style={{ width: `${Math.max(5, (cat.sales / maxCategorySales) * 100)}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
