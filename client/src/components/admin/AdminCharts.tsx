"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const chartData = [
    { name: "Jan", value: 3400, color: "bg-primary" },
    { name: "Feb", value: 2800, color: "bg-primary" },
    { name: "Mar", value: 4500, color: "bg-primary shadow-lg shadow-primary/20 dark:shadow-none" },
    { name: "Apr", value: 3900, color: "bg-primary" },
    { name: "May", value: 5200, color: "bg-primary" },
    { name: "Jun", value: 4800, color: "bg-primary" },
    { name: "Jul", value: 6100, color: "bg-primary" },
];

const topProducts = [
    { name: "Wireless Headphones", sales: "1,200", growth: "+12%", color: "bg-primary" },
    { name: "Mechanical Keyboard", sales: "850", growth: "+8%", color: "bg-purple-600" },
    { name: "Gaming Mouse", sales: "640", growth: "+15%", color: "bg-blue-600" },
    { name: "Monitor Stand", sales: "420", growth: "+5%", color: "bg-emerald-600" },
];

export function AdminCharts() {
    const maxValue = Math.max(...chartData.map(d => d.value));

    return (
        <div className="grid gap-6 lg:grid-cols-3 mb-8">
            {/* Revenue Chart Mock */}
            <Card className="lg:col-span-2 border-none shadow-md bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-lg font-bold">Revenue Overview</CardTitle>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                            <TrendingUp className="w-4 h-4 text-emerald-500" />
                            <span>+12.5% increase from last month</span>
                        </p>
                    </div>
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-800 flex items-center gap-2 text-sm font-medium">
                        <Filter className="w-4 h-4" />
                        <span>Filter</span>
                    </button>
                </CardHeader>
                <CardContent>
                    <div className="h-[250px] flex items-end justify-between gap-4 mt-8 px-4">
                        {chartData.map((data, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                                <div 
                                    className={cn(
                                        "w-full rounded-t-lg transition-all duration-500 group-hover:opacity-80 relative",
                                        data.color
                                    )}
                                    style={{ height: `${(data.value / maxValue) * 100}%` }}
                                >
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] px-2 py-1 rounded-md font-bold z-10 whitespace-nowrap">
                                        ${data.value.toLocaleString()}
                                    </div>
                                </div>
                                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{data.name}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Top Products Mock */}
            <Card className="border-none shadow-md bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm overflow-hidden">
                <CardHeader>
                    <CardTitle className="text-lg font-bold">Top Selling Products</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {topProducts.map((product, i) => (
                        <div key={i} className="flex flex-col gap-2 relative">
                            <div className="flex items-center justify-between text-sm font-medium">
                                <span className="text-slate-900 dark:text-white truncate max-w-[150px]">{product.name}</span>
                                <span className="text-slate-500 dark:text-slate-400">{product.sales} sales</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div 
                                    className={cn("h-full rounded-full transition-all duration-1000", product.color)} 
                                    style={{ width: `${60 - (i * 10)}%` }}
                                />
                            </div>
                            <span className="text-[10px] absolute -right-2 -bottom-4 text-emerald-500 font-bold">{product.growth}</span>
                        </div>
                    ))}
                    
                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-4 justify-around">
                            <div className="text-center">
                                <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">New</p>
                                <p className="text-xl font-bold">124</p>
                            </div>
                            <div className="w-[1px] h-8 bg-slate-200 dark:bg-slate-800" />
                            <div className="text-center">
                                <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Stock</p>
                                <p className="text-xl font-bold text-primary tracking-tight">85%</p>
                            </div>
                            <div className="w-[1px] h-8 bg-slate-200 dark:bg-slate-800" />
                            <div className="text-center">
                                <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Active</p>
                                <p className="text-xl font-bold text-emerald-600 tracking-tight">92%</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
