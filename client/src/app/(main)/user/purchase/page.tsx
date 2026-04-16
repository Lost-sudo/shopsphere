"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { useGetUserOrdersQuery } from "@/features/order/order.api";
import { OrderCard } from "@/components/account/OrderCard";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const tabs = [
    { label: "All", value: "ALL" },
    { label: "To Pay", value: "PENDING" },
    { label: "To Ship", value: "PROCESSING" },
    { label: "To Receive", value: "SHIPPED" },
    { label: "Completed", value: "DELIVERED" },
    { label: "Cancelled", value: "CANCELLED" },
];

export default function PurchasePage() {
    const [activeTab, setActiveTab] = useState("ALL");
    const { data, isLoading } = useGetUserOrdersQuery();

    const orders = data?.orders || [];
    
    // Filter orders based on status
    const filteredOrders = activeTab === "ALL" 
        ? orders 
        : orders.filter(order => order.status.toUpperCase() === activeTab);

    return (
        <div className="flex flex-col min-h-full">
            {/* Tabs */}
            <div className="bg-white sticky top-0 z-10 border-b border-gray-100 flex overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => setActiveTab(tab.value)}
                        className={cn(
                            "flex-1 min-w-[100px] py-4 text-sm transition-colors relative whitespace-nowrap",
                            activeTab === tab.value 
                                ? "text-shopee font-medium" 
                                : "text-gray-700 hover:text-shopee"
                        )}
                    >
                        {tab.label}
                        {activeTab === tab.value && (
                            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-shopee" />
                        )}
                    </button>
                ))}
            </div>

            {/* Search */}
            <div className="p-4 bg-gray-50/50">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <Input 
                        placeholder="You can search by Order ID or Product Name" 
                        className="pl-10 h-10 bg-white border-gray-200 focus-visible:ring-shopee"
                    />
                </div>
            </div>

            {/* Orders List */}
            <div className="p-4 flex-1">
                {isLoading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <Skeleton key={i} className="h-48 w-full rounded-sm" />
                        ))}
                    </div>
                ) : filteredOrders.length > 0 ? (
                    <div className="space-y-0">
                        {filteredOrders.map((order) => (
                            <OrderCard key={order.id} order={order} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 px-4">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <Search className="text-gray-300" size={40} />
                        </div>
                        <p className="text-gray-600">No orders found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
