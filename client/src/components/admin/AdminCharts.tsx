"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const chartData = [
    { name: "Jan", value: 3400, color: "bg-luxury-charcoal" },
    { name: "Feb", value: 2800, color: "bg-luxury-charcoal" },
    { name: "Mar", value: 4500, color: "bg-luxury-gold shadow-lg shadow-luxury-gold/20" },
    { name: "Apr", value: 3900, color: "bg-luxury-charcoal" },
    { name: "May", value: 5200, color: "bg-luxury-charcoal" },
    { name: "Jun", value: 4800, color: "bg-luxury-charcoal" },
    { name: "Jul", value: 6100, color: "bg-luxury-charcoal" },
];

const topProducts = [
    { name: "Wireless Headphones", sales: "1,200", growth: "+12%", color: "bg-luxury-charcoal" },
    { name: "Mechanical Keyboard", sales: "850", growth: "+8%", color: "bg-luxury-gold" },
    { name: "Gaming Mouse", sales: "640", growth: "+15%", color: "bg-luxury-charcoal/60" },
    { name: "Monitor Stand", sales: "420", growth: "+5%", color: "bg-luxury-gold/60" },
];

export function AdminCharts() {
    const maxValue = Math.max(...chartData.map(d => d.value));

    return (
        <div className="grid gap-8 lg:grid-cols-3">
            {/* Revenue Chart Mock */}
            <Card className="lg:col-span-2 border-white/40 bg-white/60 backdrop-blur-2xl shadow-xl shadow-black/5 rounded-[2.5rem] overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between p-8 pb-0">
                    <div>
                        <CardTitle className="text-xl font-light tracking-tight text-luxury-charcoal">
                            Revenue <span className="font-serif italic text-luxury-gold">Overview</span>
                        </CardTitle>
                        <p className="text-sm text-neutral-500 mt-2 font-light flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-emerald-500" />
                            <span>+12.5% increase from last month</span>
                        </p>
                    </div>
                    <button className="h-10 px-4 bg-white/40 backdrop-blur-xl border border-white/60 rounded-xl flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-luxury-charcoal hover:bg-white/80 transition-all">
                        <Filter className="w-4 h-4 text-luxury-gold" />
                        <span>Filter</span>
                    </button>
                </CardHeader>
                <CardContent className="p-8">
                    <div className="h-[280px] flex items-end justify-between gap-6 mt-4 px-2">
                        {chartData.map((data, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-4 group h-full justify-end">
                                <div 
                                    className={cn(
                                        "w-full rounded-2xl transition-all duration-500 group-hover:scale-x-110 relative shadow-inner",
                                        data.color
                                    )}
                                    style={{ height: `${(data.value / maxValue) * 100}%` }}
                                >
                                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-luxury-charcoal text-white text-[10px] px-3 py-1.5 rounded-lg font-bold z-10 whitespace-nowrap shadow-xl">
                                        ${data.value.toLocaleString()}
                                    </div>
                                </div>
                                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{data.name}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Top Products Mock */}
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
                                    className={cn("h-full rounded-full transition-all duration-1000 shadow-sm", product.color)} 
                                    style={{ width: `${60 - (i * 10)}%` }}
                                />
                            </div>
                            <span className="text-[10px] absolute -right-1 -bottom-5 text-emerald-500 font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">{product.growth}</span>
                        </div>
                    ))}
                    
                    <div className="mt-8 pt-8 border-t border-black/5">
                        <div className="flex items-center gap-4 justify-around">
                            <div className="text-center">
                                <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest mb-2">New</p>
                                <p className="text-xl font-serif italic text-luxury-charcoal">124</p>
                            </div>
                            <div className="w-[1px] h-10 bg-black/5" />
                            <div className="text-center">
                                <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest mb-2">Stock</p>
                                <p className="text-xl font-serif italic text-luxury-gold">85%</p>
                            </div>
                            <div className="w-[1px] h-10 bg-black/5" />
                            <div className="text-center">
                                <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest mb-2">Active</p>
                                <p className="text-xl font-serif italic text-emerald-600">92%</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

