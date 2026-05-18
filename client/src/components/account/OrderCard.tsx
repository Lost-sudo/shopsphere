"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Package, Truck, ChevronRight, ShoppingBag, Eye, Loader2, CreditCard, Check, X, Clock } from "lucide-react";
import { Order } from "@/features/order/order.types";
import { useUpdateOrderStatusMutation } from "@/features/order/order.api";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { format } from "date-fns";

interface OrderCardProps {
    order: Order;
}

function getStatusLabel(status: string) {
    switch (status.toUpperCase()) {
        case "PENDING": return "To Pay";
        case "PROCESSING": return "To Ship";
        case "SHIPPED": return "To Receive";
        case "DELIVERED": return "Completed";
        case "CANCELLED": return "Cancelled";
        default: return status;
    }
}

function getStatusColor(status: string) {
    switch (status.toUpperCase()) {
        case "DELIVERED": return "bg-emerald-50 text-emerald-600 border-emerald-200";
        case "SHIPPED": return "bg-purple-50 text-purple-600 border-purple-200";
        case "PROCESSING": return "bg-blue-50 text-blue-600 border-blue-200";
        case "PENDING": return "bg-amber-50 text-amber-600 border-amber-200";
        case "CANCELLED": return "bg-rose-50 text-rose-600 border-rose-200";
        default: return "bg-slate-50 text-slate-600 border-slate-200";
    }
}

export function OrderCard({ order }: OrderCardProps) {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [updateStatus, { isLoading: isUpdating }] = useUpdateOrderStatusMutation();

    const statusLabel = getStatusLabel(order.status);
    const isShipped = order.status?.toUpperCase() === "SHIPPED";
    const isPending = order.status?.toUpperCase() === "PENDING";

    const handleMarkDelivered = async () => {
        try {
            await updateStatus({ orderId: order.id, status: "DELIVERED" }).unwrap();
            toast.success("Order marked as delivered");
            setIsDetailsOpen(false);
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to mark as delivered");
        }
    };

    const handleCancelOrder = async () => {
        try {
            await updateStatus({ orderId: order.id, status: "CANCELLED" }).unwrap();
            toast.success("Order cancelled");
            setIsDetailsOpen(false);
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to cancel order");
        }
    };

    return (
        <>
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
                                <Badge className={cn("border-none shadow-none font-black px-3 py-1 rounded-full text-[9px] uppercase tracking-wider", getStatusColor(order.status))}>
                                    {statusLabel}
                                </Badge>
                            </div>
                            <div className="w-10 h-10 bg-luxury-gold/10 text-luxury-gold rounded-xl flex items-center justify-center">
                                <Truck size={18} />
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="p-6 sm:p-8 space-y-6">
                        {order.items.map((item) => (
                            <Link
                                key={item.id}
                                href={`/product/${item.productId}`}
                                className="flex gap-6 group/item cursor-pointer"
                            >
                                <div className="w-24 h-24 bg-white/80 border border-white/60 rounded-2xl overflow-hidden shrink-0 shadow-inner transition-transform group-hover/item:scale-105 duration-300">
                                {item.product?.images?.[0] ? (
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
                                    <h3 className="text-base font-medium text-luxury-charcoal truncate pr-4 group-hover/item:text-luxury-gold transition-colors">{item.product?.name}</h3>
                                        <span className="text-sm font-semibold text-luxury-charcoal">{formatPrice(item.price)}</span>
                                    </div>
                                    <p className="text-xs text-neutral-400 font-light italic">Variation: Default</p>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-xs text-neutral-500 bg-black/5 px-2 py-0.5 rounded-md">Qty: {item.quantity}</span>
                                        <ChevronRight size={16} className="text-neutral-300 group-hover/item:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
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
                                onClick={() => setIsDetailsOpen(true)}
                            >
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                            </Button>
                            {order.status?.toUpperCase() === "DELIVERED" && (
                                <Button 
                                    className="flex-1 sm:flex-none bg-luxury-charcoal hover:bg-luxury-charcoal-light text-white h-12 px-8 rounded-xl shadow-lg shadow-black/5 uppercase tracking-widest text-xs font-bold transition-all active:scale-95"
                                >
                                    Buy Again
                                </Button>
                            )}
                            {isPending && (
                                <>
                                    <Button 
                                        className="flex-1 sm:flex-none bg-luxury-gold hover:bg-luxury-gold-light text-white h-12 px-8 rounded-xl shadow-lg shadow-luxury-gold/20 uppercase tracking-widest text-xs font-bold transition-all active:scale-95"
                                    >
                                        Pay Now
                                    </Button>
                                    <Button 
                                        variant="outline"
                                        className="flex-1 sm:flex-none h-12 px-8 rounded-xl text-xs font-bold uppercase tracking-widest text-rose-600 border-rose-200 hover:bg-rose-50 transition-colors"
                                        onClick={handleCancelOrder}
                                        disabled={isUpdating}
                                    >
                                        {isUpdating ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <X className="w-4 h-4" />
                                        )}
                                        Cancel
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Order Details Modal */}
            <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <DialogContent className="max-w-2xl bg-white/95 backdrop-blur-xl border-none shadow-2xl rounded-[2rem]">
                    <DialogHeader className="space-y-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <DialogTitle className="text-3xl font-serif italic text-luxury-charcoal">Order Details</DialogTitle>
                                <DialogDescription className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mt-1">
                                    Order #{order.id.slice(-8).toUpperCase()} • {format(new Date(order.createdAt), "MMM d, yyyy")}
                                </DialogDescription>
                            </div>
                            <Badge className={cn("border-none shadow-none font-black px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest", getStatusColor(order.status))}>
                                {statusLabel}
                            </Badge>
                        </div>
                    </DialogHeader>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Shipping Address</h4>
                                <p className="text-xs text-luxury-charcoal leading-relaxed">{order.shippingAddress}</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Logistics</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Truck size={14} className="text-luxury-gold" />
                                        <p className="text-xs font-bold text-luxury-charcoal uppercase tracking-tighter">{order.shippingMethod} Delivery</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CreditCard size={14} className="text-luxury-gold" />
                                        <p className="text-xs font-bold text-luxury-charcoal uppercase tracking-tighter">{order.paymentMethod}</p>
                                    </div>
                                    {order.shipment && (
                                        <div className="flex flex-col gap-1 p-3 bg-neutral-50 rounded-xl border border-black/5">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Tracking Number</p>
                                            <div className="flex items-center gap-2">
                                                <Truck size={14} className="text-primary" />
                                                <p className="text-xs font-black text-primary italic uppercase">{order.shipment.trackingNumber}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Timeline</h4>
                                <div className="flex items-center gap-2 text-xs text-neutral-500">
                                    <Clock size={12} />
                                    Ordered on {format(new Date(order.createdAt), "MMM d, yyyy 'at' h:mm a")}
                                </div>
                            </div>
                        </div>

                        <div className="bg-neutral-50 rounded-[1.5rem] p-6 space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Order Items</h4>
                            <div className="space-y-4 max-h-[240px] overflow-y-auto pr-2 custom-scrollbar">
                                {order.items.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={`/product/${item.productId}`}
                                        className="flex gap-4 items-center group/item"
                                    >
                                        <div className="relative w-14 h-18 rounded-lg overflow-hidden bg-white shadow-sm shrink-0">
                                            <img 
                                                src={item.product?.images?.[0] || "/images/placeholder.png"} 
                                                alt={item.product?.name || "Product"}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-bold text-luxury-charcoal truncate group-hover/item:text-luxury-gold transition-colors">{item.product?.name}</p>
                                            <p className="text-[10px] text-neutral-500">Qty: {item.quantity} × {formatPrice(item.price)}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <div className="pt-4 border-t border-neutral-200 flex justify-between items-end">
                                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Total Amount</span>
                                <span className="text-xl font-serif italic text-luxury-charcoal">{formatPrice(order.totalAmount)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4 justify-end">
                        <Button variant="outline" className="rounded-xl text-[10px] font-black uppercase tracking-widest" onClick={() => setIsDetailsOpen(false)}>
                            <X className="w-3.5 h-3.5 mr-1.5" />
                            Close
                        </Button>

                        {isShipped && (
                            <Button 
                                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest gap-2"
                                onClick={handleMarkDelivered}
                                disabled={isUpdating}
                            >
                                {isUpdating ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Check className="w-4 h-4" />
                                )}
                                Mark as Delivered
                            </Button>
                        )}

                        {isPending && (
                            <Button 
                                variant="outline"
                                className="rounded-xl text-[10px] font-black uppercase tracking-widest gap-2 text-rose-600 border-rose-200 hover:bg-rose-50"
                                onClick={handleCancelOrder}
                                disabled={isUpdating}
                            >
                                {isUpdating ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <X className="w-4 h-4" />
                                )}
                                Cancel Order
                            </Button>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}



