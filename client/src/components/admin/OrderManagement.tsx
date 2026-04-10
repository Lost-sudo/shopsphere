"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
    Search, 
    Filter,
    ShoppingCart,
    MoreHorizontal,
    Eye,
    CheckCircle
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

const mockOrders = [
    {
        id: "ORD-7234",
        customer: "James Wilson",
        email: "james.wilson@mail.com",
        product: "Wireless Headphones",
        amount: 129.00,
        status: "Delivered",
        date: "2024-03-15",
        image: "https://images.unsplash.com/photo-1546435770-a3e426ff4737?auto=format&fit=crop&w=100&q=80",
    },
    {
        id: "ORD-9281",
        customer: "Sarah Chen",
        email: "sarah.chen@mail.com",
        product: "Mechanical Keyboard",
        amount: 189.99,
        status: "Processing",
        date: "2024-03-14",
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=100&q=80",
    },
    {
        id: "ORD-1234",
        customer: "Michael Brown",
        email: "michael.brown@mail.com",
        product: "Gaming Mouse",
        amount: 59.50,
        status: "Shipped",
        date: "2024-03-14",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=100&q=80",
    },
    {
        id: "ORD-5542",
        customer: "Emily Davis",
        email: "emily.davis@mail.com",
        product: "UltraWide Monitor",
        amount: 499.00,
        status: "On Hold",
        date: "2024-03-12",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=100&q=80",
    },
    {
        id: "ORD-3321",
        customer: "Alex Johnson",
        email: "alex.johnson@mail.com",
        product: "Bluetooth Smart Speaker",
        amount: 79.99,
        status: "Processing",
        date: "2024-03-11",
        image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=100&q=80",
    },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case "Delivered": return "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400";
        case "Processing": return "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400";
        case "Shipped": return "bg-primary/10 dark:bg-primary/20 text-primary";
        case "On Hold": return "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400";
        default: return "bg-slate-50 text-slate-600";
    }
};

export function OrderManagement() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input 
                        placeholder="Search orders..." 
                        className="pl-10 h-10 border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-10 border-slate-200 dark:border-slate-800 flex items-center gap-2 font-semibold">
                        <Filter className="w-4 h-4" />
                        Filters
                    </Button>
                </div>
            </div>

            <Card className="border-none shadow-md bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm overflow-hidden">
                <CardHeader className="border-b border-slate-100 dark:border-slate-800">
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5 text-primary" />
                        All Orders
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs uppercase text-slate-500 font-semibold border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                                <tr>
                                    <th className="px-6 py-4">Order ID</th>
                                    <th className="px-6 py-4">Customer</th>
                                    <th className="px-6 py-4">Product Snapshot</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4 text-right">Total</th>
                                    <th className="px-6 py-4 text-center">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {mockOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap font-bold text-slate-900 dark:text-white">
                                            {order.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-900 dark:text-white">{order.customer}</span>
                                                <span className="text-xs text-slate-500">{order.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                                                    <Image 
                                                        src={order.image} 
                                                        alt={order.product}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 max-w-[150px] truncate">{order.product}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-400">
                                            {order.date}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right font-bold text-slate-900 dark:text-white">
                                            ${order.amount.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <Badge className={cn("border-none shadow-none font-bold px-2.5 py-1 rounded-full", getStatusColor(order.status))}>
                                                {order.status}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors group" title="View Details">
                                                    <Eye className="w-4 h-4 text-slate-500 group-hover:text-primary" />
                                                </button>
                                                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors group" title="Mark as Delivered">
                                                    <CheckCircle className="w-4 h-4 text-slate-500 group-hover:text-emerald-500" />
                                                </button>
                                                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                                                    <MoreHorizontal className="w-4 h-4 text-slate-500" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
