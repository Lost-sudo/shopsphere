"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoveRight, MoreHorizontal, ShoppingBag } from "lucide-react";

const orders = [
    {
        id: "ORD-7234",
        customer: "James Wilson",
        email: "james.wilson@mail.com",
        product: "Wireless Headphones",
        amount: "$129.00",
        status: "Delivered",
        date: "2024-03-15",
        initials: "JW",
    },
    {
        id: "ORD-9281",
        customer: "Sarah Chen",
        email: "sarah.chen@mail.com",
        product: "Mechanical Keyboard",
        amount: "$189.99",
        status: "Processing",
        date: "2024-03-14",
        initials: "SC",
    },
    {
        id: "ORD-1234",
        customer: "Michael Brown",
        email: "michael.brown@mail.com",
        product: "Gaming Mouse",
        amount: "$59.50",
        status: "Shipped",
        date: "2024-03-14",
        initials: "MB",
    },
    {
        id: "ORD-5542",
        customer: "Emily Davis",
        email: "emily.davis@mail.com",
        product: "UltraWide Monitor",
        amount: "$499.00",
        status: "On Hold",
        date: "2024-03-12",
        initials: "ED",
    },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case "Delivered": return "bg-emerald-50 text-emerald-600 border-emerald-100";
        case "Processing": return "bg-blue-50 text-blue-600 border-blue-100";
        case "Shipped": return "bg-luxury-gold/10 text-luxury-gold border-luxury-gold/20";
        case "On Hold": return "bg-amber-50 text-amber-600 border-amber-100";
        default: return "bg-neutral-50 text-neutral-500 border-neutral-100";
    }
};

export function RecentOrders() {
    return (
        <Card className="col-span-1 lg:col-span-2 border-white/40 bg-white/60 backdrop-blur-2xl shadow-xl shadow-black/5 rounded-[2.5rem] overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between p-8 pb-4">
                <CardTitle className="text-xl font-light tracking-tight text-luxury-charcoal">
                    Recent <span className="font-serif italic text-luxury-gold">Orders</span>
                </CardTitle>
                <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 hover:text-luxury-charcoal flex items-center gap-2 transition-colors group">
                    View all <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-black/5">
                                <th className="px-8 py-4 text-[10px] font-bold uppercase text-neutral-400 tracking-widest">Order</th>
                                <th className="px-8 py-4 text-[10px] font-bold uppercase text-neutral-400 tracking-widest">Customer</th>
                                <th className="px-8 py-4 text-[10px] font-bold uppercase text-neutral-400 tracking-widest">Status</th>
                                <th className="px-8 py-4 text-[10px] font-bold uppercase text-neutral-400 tracking-widest text-right">Amount</th>
                                <th className="px-8 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black/5">
                            {orders.map((order) => (
                                <tr key={order.id} className="group hover:bg-white/40 transition-colors">
                                    <td className="px-8 py-6 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-luxury-charcoal rounded-lg flex items-center justify-center text-white text-[10px] font-bold">
                                                <ShoppingBag size={14} />
                                            </div>
                                            <span className="text-sm font-medium text-luxury-charcoal">#{order.id.split("-")[1]}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-luxury-gold/10 border border-luxury-gold/20 flex items-center justify-center text-luxury-gold font-serif italic text-sm">
                                                {order.initials}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-luxury-charcoal">{order.customer}</span>
                                                <span className="text-[10px] text-neutral-400 font-light">{order.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 whitespace-nowrap">
                                        <Badge className={`border shadow-none font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </Badge>
                                    </td>
                                    <td className="px-8 py-6 whitespace-nowrap text-right">
                                        <span className="text-sm font-serif italic text-luxury-gold">{order.amount}</span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="p-2 hover:bg-white/60 rounded-xl transition-colors">
                                            <MoreHorizontal className="w-4 h-4 text-neutral-300 group-hover:text-luxury-charcoal" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-6 bg-black/[0.02] text-center">
                    <p className="text-[10px] text-neutral-400 font-light uppercase tracking-widest">
                        Showing last {orders.length} transactions from today
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

