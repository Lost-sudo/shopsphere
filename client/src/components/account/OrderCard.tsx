"use client";

import React from "react";
import { Package, Truck, ChevronRight } from "lucide-react";
import { Order } from "@/features/order/order.types";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface OrderCardProps {
    order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
    // Standardize status for display
    const getStatusLabel = (status: string) => {
        switch (status.toUpperCase()) {
            case "PENDING": return "TO PAY";
            case "PROCESSING": return "TO SHIP";
            case "SHIPPED": return "TO RECEIVE";
            case "DELIVERED": return "COMPLETED";
            case "CANCELLED": return "CANCELLED";
            default: return status;
        }
    };

    const statusLabel = getStatusLabel(order.status);

    return (
        <div className="bg-white p-4 md:p-6 mb-4 rounded-sm shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            {/* Order Header */}
            <div className="flex justify-between items-center border-b border-gray-50 pb-4 mb-4">
                <div className="flex items-center gap-2">
                    <div className="bg-shopee/10 text-shopee p-1 rounded-sm">
                        <Package size={14} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Order ID: {order.id.slice(-8).toUpperCase()}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-shopee font-semibold uppercase">{statusLabel}</span>
                    <div className="w-[1px] h-3 bg-gray-200 mx-1"></div>
                    <Truck size={14} className="text-shopee" />
                </div>
            </div>

            {/* Order Items */}
            <div className="space-y-4">
                {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                        <div className="w-20 h-20 bg-gray-50 border border-gray-100 rounded-sm overflow-hidden shrink-0">
                            {item.product.images?.[0] ? (
                                <img 
                                    src={item.product.images[0]} 
                                    alt={item.product.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                    <Package size={32} />
                                </div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 truncate">{item.product.name}</h3>
                                <p className="text-xs text-gray-500 mt-1 truncate">Variation: Default</p>
                                <p className="text-xs text-gray-900 mt-1">x{item.quantity}</p>
                            </div>
                            <div className="flex justify-end">
                                <span className="text-sm text-shopee font-medium">{formatPrice(item.price)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Order Footer */}
            <div className="mt-6 pt-6 border-t border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-baseline gap-2">
                    <span className="text-sm text-gray-600">Order Total:</span>
                    <span className="text-xl font-semibold text-shopee">{formatPrice(order.totalAmount)}</span>
                </div>
                <div className="flex gap-2">
                    <Button 
                        variant="outline" 
                        size="sm"
                        className="h-9 px-6 rounded-sm text-xs font-medium border-gray-200 text-gray-700"
                    >
                        View Details
                    </Button>
                    {order.status === "DELIVERED" && (
                        <Button 
                            size="sm"
                            className="h-9 px-6 rounded-sm text-xs font-medium bg-shopee hover:bg-shopee/90 text-white"
                        >
                            Buy Again
                        </Button>
                    )}
                    {order.status === "PENDING" && (
                        <Button 
                            size="sm"
                            className="h-9 px-6 rounded-sm text-xs font-medium bg-shopee hover:bg-shopee/90 text-white"
                        >
                            Pay Now
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
