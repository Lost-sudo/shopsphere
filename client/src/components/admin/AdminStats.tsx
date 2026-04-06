"use client";

import { 
    DollarSign, 
    ShoppingCart, 
    ArrowUpRight, 
    ArrowDownRight, 
    Users, 
    TrendingUp 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const stats = [
    {
        title: "Total Revenue",
        value: "$45,231.89",
        diff: "+20.1%",
        trend: "up",
        icon: DollarSign,
        color: "text-emerald-600 dark:text-emerald-400",
        bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    },
    {
        title: "Total Orders",
        value: "2,350",
        diff: "+180.1%",
        trend: "up",
        icon: ShoppingCart,
        color: "text-blue-600 dark:text-blue-400",
        bgColor: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
        title: "Total Customers",
        value: "12,234",
        diff: "+19%",
        trend: "up",
        icon: Users,
        color: "text-primary",
        bgColor: "bg-primary/10 dark:bg-primary/20",
    },
    {
        title: "Growth",
        value: "+12.2%",
        diff: "-2.4%",
        trend: "down",
        icon: TrendingUp,
        color: "text-purple-600 dark:text-purple-400",
        bgColor: "bg-purple-50 dark:bg-purple-950/30",
    },
];

export function AdminStats() {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                    <Card key={i} className="border-none shadow-md bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm overflow-hidden group">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-2">
                                <div className={cn("p-2 rounded-lg transition-transform group-hover:scale-110", stat.bgColor)}>
                                    <Icon className={cn("w-5 h-5", stat.color)} />
                                </div>
                                <div className={cn(
                                    "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold",
                                    stat.trend === "up" 
                                        ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400" 
                                        : "bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400"
                                )}>
                                    {stat.diff}
                                    {stat.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.title}</h3>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1 uppercase tracking-tight">{stat.value}</p>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
