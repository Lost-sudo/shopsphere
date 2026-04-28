"use client";

import React from "react";
import { Package, Truck, ChevronRight, ShoppingBag } from "lucide-react";
import { Order } from "@/features/order/order.types";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface OrderCardProps {
    order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
    const getStatusLabel = (status: string) => {
        switch (status.toUpperCase()) {
            case "PENDING": return "To Pay";
            case "PROCESSING": return "To Ship";
            case "SHIPPED": return "To Receive";
            case "DELIVERED": return "Completed";
            case "CANCELLED": return "Cancelled";
            default: return status;
        }
    };

    const statusLabel = getStatusLabel(order.status);
    const isDelivered = order.status === "DELIVERED";
    const isPending = order.status === "PENDING";

    return (
        <Card className="border-white/40 bg-white/60 backdrop-blur-2xl shadow-xl shadow-black/5 rounded-3xl overflow-hidden group">
            <CardContent className="p-0">
                {/* Order Header */}
                <div className="flex justify-between items-center p-6 sm:px-8 border-b border-black/5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-luxury-charcoal text-white rounded-xl flex items-center justify-center shadow-lg shadow-black/10">
                            <Package size={18} />
                        </div>
                        <div>
                            <span className="text-[10px] font-bold uppercase text-neutral-400 tracking-widest block">Order ID</span>
                            <span className="text-sm font-medium text-luxury-charcoal">#{order.id.slice(-8).toUpperCase()}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <span className="text-[10px] font-bold uppercase text-neutral-400 tracking-widest block">Status</span>
                            <span className="text-xs font-bold text-luxury-gold uppercase tracking-widest">{statusLabel}</span>
                        </div>
                        <div className="w-10 h-10 bg-luxury-gold/10 text-luxury-gold rounded-xl flex items-center justify-center">
                            <Truck size={18} />
                        </div>
                    </div>
                </div>

                {/* Order Items */}
                <div className="p-6 sm:p-8 space-y-6">
                    {order.items.map((item) => (
                        <div key={item.id} className="flex gap-6 group/item cursor-pointer">
                            <div className="w-24 h-24 bg-white/80 border border-white/60 rounded-2xl overflow-hidden shrink-0 shadow-inner transition-transform group-hover/item:scale-105 duration-300">
                                {item.product.images?.[0] ? (
                                    <img 
                                        src={item.product.images[0]} 
                                        alt={item.product.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-neutral-200">
                                        <ShoppingBag size={32} />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-base font-medium text-luxury-charcoal truncate pr-4 group-hover/item:text-luxury-gold transition-colors">{item.product.name}</h3>
                                    <span className="text-sm font-semibold text-luxury-charcoal">{formatPrice(item.price)}</span>
                                </div>
                                <p className="text-xs text-neutral-400 font-light italic">Variation: Default</p>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-xs text-neutral-500 bg-black/5 px-2 py-0.5 rounded-md">Qty: {item.quantity}</span>
                                    <ChevronRight size={16} className="text-neutral-300 group-hover/item:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Footer */}
                <div className="p-6 sm:px-8 bg-black/[0.02] border-t border-black/5 flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col items-center sm:items-start">
                        <span className="text-[10px] font-bold uppercase text-neutral-400 tracking-widest mb-1">Total Amount</span>
                        <span className="text-2xl font-serif italic text-luxury-gold">{formatPrice(order.totalAmount)}</span>
                    </div>
                    <div className="flex gap-3 w-full sm:w-auto">
                        <Button 
                            variant="ghost" 
                            className="flex-1 sm:flex-none h-12 px-8 rounded-xl text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-luxury-charcoal transition-colors"
                        >
                            View Details
                        </Button>
                        {isDelivered && (
                            <Button 
                                className="flex-1 sm:flex-none bg-luxury-charcoal hover:bg-luxury-charcoal-light text-white h-12 px-8 rounded-xl shadow-lg shadow-black/5 uppercase tracking-widest text-xs font-bold transition-all active:scale-95"
                            >
                                Buy Again
                            </Button>
                        )}
                        {isPending && (
                            <Button 
                                className="flex-1 sm:flex-none bg-luxury-gold hover:bg-luxury-gold-light text-white h-12 px-8 rounded-xl shadow-lg shadow-luxury-gold/20 uppercase tracking-widest text-xs font-bold transition-all active:scale-95"
                            >
                                Pay Now
                            </Button>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

