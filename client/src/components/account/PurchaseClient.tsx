"use client";

import React, { useState } from "react";
import { Search, ShoppingBag } from "lucide-react";
import { useGetUserOrdersQuery } from "@/features/order/order.api";
import { OrderCard } from "@/components/account/OrderCard";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const tabs = [
    { label: "All", value: "ALL" },
    { label: "To Pay", value: "PENDING" },
    { label: "To Ship", value: "PROCESSING" },
    { label: "To Receive", value: "SHIPPED" },
    { label: "Completed", value: "DELIVERED" },
    { label: "Cancelled", value: "CANCELLED" },
];

export function PurchaseClient() {
    const [activeTab, setActiveTab] = useState("ALL");
    const [searchTerm, setSearchTerm] = useState("");
    const { data, isLoading } = useGetUserOrdersQuery();

    const orders = data?.orders || [];
    
    const statusFiltered = activeTab === "ALL" 
        ? orders 
        : orders.filter(order => order.status.toUpperCase() === activeTab);

    const filteredOrders = statusFiltered.filter(order => {
        if (!searchTerm.trim()) return true;
        const q = searchTerm.toLowerCase();
        return (
            order.id.toLowerCase().includes(q) ||
            order.items.some(item =>
                item.product?.name?.toLowerCase().includes(q)
            )
        );
    });

    return (
        <div className="p-8 sm:p-12 space-y-10">
            {/* Header Section */}
            <div className="animate-fade-up">
                    <h1 className="text-4xl font-light tracking-tight text-luxury-charcoal">
                        My <span className="font-serif italic text-luxury-gold">Purchases</span>
                    </h1>
                    <p className="text-neutral-500 mt-2 font-light">
                        Track your orders and view your shopping history
                    </p>
                </div>

                {/* Tabs Navigation */}
                <div className="animate-fade-up [animation-delay:100ms]">
                    <div className="bg-white/40 backdrop-blur-xl border border-white/60 p-2 rounded-2xl flex overflow-x-auto scrollbar-hide gap-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.value}
                                onClick={() => setActiveTab(tab.value)}
                                className={cn(
                                    "flex-1 min-w-[100px] py-3 px-4 text-xs font-bold uppercase tracking-widest transition-all rounded-xl relative whitespace-nowrap",
                                    activeTab === tab.value 
                                        ? "bg-luxury-charcoal text-white shadow-lg" 
                                        : "text-neutral-500 hover:text-luxury-charcoal hover:bg-white/40"
                                )}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Search Bar */}
                <div className="animate-fade-up [animation-delay:200ms]">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-luxury-gold transition-colors" size={18} />
                        <Input 
                            placeholder="Search by Order ID or Product Name..." 
                            className="pl-12 h-14 bg-white/60 backdrop-blur-xl border-white/60 focus-visible:ring-luxury-gold focus-visible:bg-white/80 transition-all rounded-2xl text-sm shadow-xl shadow-black/5"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Orders List */}
                <div className="space-y-6 animate-fade-up [animation-delay:300ms]">
                    {isLoading ? (
                        <div className="space-y-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-64 bg-white/40 backdrop-blur-xl border border-white/60 animate-pulse rounded-3xl" />
                            ))}
                        </div>
                    ) : filteredOrders.length > 0 ? (
                        <div className="space-y-6">
                            {filteredOrders.map((order) => (
                                <OrderCard key={order.id} order={order} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-24 px-4 bg-white/60 backdrop-blur-2xl border border-white/40 rounded-3xl shadow-xl shadow-black/5">
                            <div className="w-20 h-20 bg-luxury-gold/10 rounded-full flex items-center justify-center mb-6">
                                <ShoppingBag className="text-luxury-gold" size={32} />
                            </div>
                            <p className="text-luxury-charcoal font-medium">No orders found</p>
                            <p className="text-neutral-500 text-sm mt-1 text-center max-w-xs">
                                It looks like you haven&apos;t placed any orders in this category yet.
                            </p>
                            <button className="mt-6 px-8 py-3 bg-luxury-charcoal text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-luxury-charcoal-light transition-all active:scale-95">
                                Start Shopping
                            </button>
                        </div>
                    )}
            </div>
        </div>
    );
}

