"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoveRight, MoreHorizontal } from "lucide-react";
import Image from "next/image";

const orders = [
    {
        id: "ORD-7234",
        customer: "James Wilson",
        email: "james.wilson@mail.com",
        product: "Wireless Headphones",
        amount: "$129.00",
        status: "Delivered",
        date: "2024-03-15",
        image: "https://images.unsplash.com/photo-1546435770-a3e426ff4737?auto=format&fit=crop&w=100&q=80",
    },
    {
        id: "ORD-9281",
        customer: "Sarah Chen",
        email: "sarah.chen@mail.com",
        product: "Mechanical Keyboard",
        amount: "$189.99",
        status: "Processing",
        date: "2024-03-14",
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=100&q=80",
    },
    {
        id: "ORD-1234",
        customer: "Michael Brown",
        email: "michael.brown@mail.com",
        product: "Gaming Mouse",
        amount: "$59.50",
        status: "Shipped",
        date: "2024-03-14",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=100&q=80",
    },
    {
        id: "ORD-5542",
        customer: "Emily Davis",
        email: "emily.davis@mail.com",
        product: "UltraWide Monitor",
        amount: "$499.00",
        status: "On Hold",
        date: "2024-03-12",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=100&q=80",
    },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case "Delivered": return "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400";
        case "Processing": return "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400";
        case "Shipped": return "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400";
        case "On Hold": return "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400";
        default: return "bg-slate-50 text-slate-600";
    }
};

export function RecentOrders() {
    return (
        <Card className="col-span-1 lg:col-span-2 border-none shadow-md bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-lg font-bold">Recent Orders</CardTitle>
                <button className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 group">
                    View all <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto -mx-6 px-6">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs uppercase text-slate-500 font-semibold border-b border-slate-100 dark:border-slate-800">
                            <tr>
                                <th className="px-4 py-3">Order</th>
                                <th className="px-4 py-3">Customer</th>
                                <th className="px-4 py-3">Date</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3 text-right">Amount</th>
                                <th className="px-4 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                                    <td className="px-4 py-4 whitespace-nowrap font-bold text-slate-900 dark:text-white">{order.id}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                                                <Image 
                                                    src={order.image} 
                                                    alt={order.product}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-slate-900 dark:text-white">{order.customer}</span>
                                                <span className="text-xs text-slate-500 truncate max-w-[120px]">{order.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-slate-600 dark:text-slate-400 truncate">{order.date}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <Badge className={`border-none shadow-none font-medium px-2 py-0.5 rounded-full ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-right font-bold text-slate-900 dark:text-white">{order.amount}</td>
                                    <td className="px-4 py-4 text-right">
                                        <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors">
                                            <MoreHorizontal className="w-4 h-4 text-slate-500" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}
