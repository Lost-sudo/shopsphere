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
        color: "text-luxury-gold",
        bgColor: "bg-luxury-gold/10",
    },
    {
        title: "Total Orders",
        value: "2,350",
        diff: "+180.1%",
        trend: "up",
        icon: ShoppingCart,
        color: "text-luxury-charcoal",
        bgColor: "bg-luxury-charcoal/10",
    },
    {
        title: "Total Customers",
        value: "12,234",
        diff: "+19%",
        trend: "up",
        icon: Users,
        color: "text-luxury-gold",
        bgColor: "bg-luxury-gold/10",
    },
    {
        title: "Growth Rate",
        value: "+12.2%",
        diff: "-2.4%",
        trend: "down",
        icon: TrendingUp,
        color: "text-luxury-charcoal",
        bgColor: "bg-luxury-charcoal/10",
    },
];

export function AdminStats() {
    return (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                    <Card key={i} className="border-white/40 bg-white/60 backdrop-blur-2xl shadow-xl shadow-black/5 rounded-3xl overflow-hidden group hover:scale-[1.02] transition-all duration-300">
                        <CardContent className="p-8">
                            <div className="flex items-center justify-between mb-6">
                                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300 shadow-lg shadow-black/5", stat.bgColor)}>
                                    <Icon className={cn("w-6 h-6", stat.color)} />
                                </div>
                                <div className={cn(
                                    "flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm",
                                    stat.trend === "up" 
                                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                                        : "bg-red-50 text-red-600 border border-red-100"
                                )}>
                                    {stat.diff}
                                    {stat.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-[10px] font-bold uppercase text-neutral-400 tracking-[0.2em]">{stat.title}</h3>
                                <p className="text-3xl font-serif italic text-luxury-charcoal mt-2 tracking-tight">{stat.value}</p>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}

