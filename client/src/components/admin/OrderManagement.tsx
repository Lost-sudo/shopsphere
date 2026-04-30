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
    Truck,
    Loader2,
    Clock,
    AlertCircle,
    XCircle,
    PackageCheck,
    CreditCard,
    ClipboardList,
    Copy,
    Ban
} from "lucide-react";
import Image from "next/image";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { 
    useGetAllOrdersQuery, 
    useProcessShipmentMutation,
    useUpdateOrderStatusMutation 
} from "@/features/order/order.api";
import { toast } from "sonner";
import { format } from "date-fns";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
        case "DELIVERED": return "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400";
        case "PAID": return "bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400";
        case "PROCESSING": return "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400";
        case "SHIPPED": return "bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400";
        case "PENDING": return "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400";
        case "CANCELLED": return "bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400";
        default: return "bg-slate-50 text-slate-600";
    }
};

export function OrderManagement() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    
    const { data: orderData, isLoading, isError } = useGetAllOrdersQuery();
    const [processShipment, { isLoading: isProcessingShipment }] = useProcessShipmentMutation();
    const [updateStatus, { isLoading: isUpdatingStatus }] = useUpdateOrderStatusMutation();

    const orders = orderData?.orders || [];

    const filteredOrders = useMemo(() => {
        return orders.filter(order => 
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.user?.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [orders, searchTerm]);

    const handleProcessShipment = async (orderId: string) => {
        try {
            await processShipment({ orderId }).unwrap();
            toast.success("Shipment processed successfully");
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to process shipment");
        }
    };

    const handleUpdateStatus = async (orderId: string, status: string) => {
        try {
            await updateStatus({ orderId, status }).unwrap();
            toast.success(`Order marked as ${status.toLowerCase()}`);
        } catch (err: any) {
            toast.error(err?.data?.message || `Failed to update status to ${status}`);
        }
    };

    const openDetails = (order: any) => {
        setSelectedOrder(order);
        setIsDetailsOpen(true);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Order ID copied to clipboard");
    };

    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat("en-PH", {
            style: "currency",
            currency: "PHP",
        }).format(amount);
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                <p className="text-slate-500 font-medium">Loading orders...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center text-rose-500">
                    <AlertCircle size={32} />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-900">Failed to load orders</h3>
                    <p className="text-slate-500">Please try again later or contact support.</p>
                </div>
                <Button variant="outline" onClick={() => window.location.reload()}>Retry</Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input 
                        placeholder="Search by ID, name or email..." 
                        className="pl-10 h-10 border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-10 border-slate-200 dark:border-slate-800 flex items-center gap-2 font-semibold text-xs uppercase tracking-widest text-slate-500 hover:text-slate-900">
                        <Filter className="w-3 h-3" />
                        Filters
                    </Button>
                </div>
            </div>

            <Card className="border-none shadow-md bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm overflow-hidden">
                <CardHeader className="border-b border-slate-100 dark:border-slate-800 px-6 py-4">
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5 text-primary" />
                        All Orders
                        <Badge variant="outline" className="ml-2 bg-slate-100 dark:bg-slate-800 border-none font-bold">
                            {filteredOrders.length}
                        </Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs uppercase text-slate-500 font-black tracking-widest border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                                <tr>
                                    <th className="px-6 py-4">Order Details</th>
                                    <th className="px-6 py-4">Customer</th>
                                    <th className="px-6 py-4">Shipping Status</th>
                                    <th className="px-6 py-4 text-right">Total</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {filteredOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-20 text-center text-slate-400 font-medium italic">
                                            No orders found matching your search.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredOrders.map((order) => (
                                        <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-col gap-1">
                                                    <span className="font-black text-slate-900 dark:text-white flex items-center gap-2">
                                                        #{order.id.split('-')[0].toUpperCase()}
                                                    </span>
                                                    <span className="text-[10px] text-slate-500 flex items-center gap-1 uppercase tracking-wider font-bold">
                                                        <Clock size={10} />
                                                        {format(new Date(order.createdAt), "MMM d, yyyy • HH:mm")}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-slate-900 dark:text-white">{order.user?.name || "Guest Customer"}</span>
                                                    <span className="text-xs text-slate-500">{order.user?.email || "No email"}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-col gap-2">
                                                    <Badge className={cn("border-none shadow-none font-black px-3 py-1 rounded-full text-[9px] uppercase tracking-wider w-fit", getStatusColor(order.status))}>
                                                        {order.status}
                                                    </Badge>
                                                    {order.shipment ? (
                                                        <div className="flex flex-col gap-1">
                                                            <div className="flex items-center gap-1.5 text-[9px] text-primary font-black uppercase tracking-widest italic">
                                                                <Truck size={10} />
                                                                {order.shipment.trackingNumber}
                                                            </div>
                                                            <span className="text-[8px] text-slate-400 uppercase font-bold">{order.shipment.shippingMethod} Delivery</span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col gap-1">
                                                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tight flex items-center gap-1.5">
                                                                <Truck size={10} className="text-slate-400" />
                                                                {order.shippingMethod}
                                                            </span>
                                                            <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-medium">
                                                                {order.paymentMethod === "COD" ? (
                                                                    <span className="flex items-center gap-1">
                                                                        <CreditCard size={10} className="text-amber-500/50" />
                                                                        COD
                                                                    </span>
                                                                ) : (
                                                                    <span className="flex items-center gap-1">
                                                                        <CreditCard size={10} className="text-blue-500/50" />
                                                                        Prepaid
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right font-black text-slate-900 dark:text-white">
                                                {formatPrice(order.totalAmount)}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {/* Mark as Processing */}
                                                    {order.status.toUpperCase() === "PENDING" && (
                                                        <Button 
                                                            variant="ghost" 
                                                            size="icon" 
                                                            className="h-8 w-8 hover:bg-blue-100 text-blue-600"
                                                            onClick={() => handleUpdateStatus(order.id, "PROCESSING")}
                                                            disabled={isUpdatingStatus}
                                                            title="Mark as Processing"
                                                        >
                                                            {isUpdatingStatus ? (
                                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                            ) : (
                                                                <ClipboardList className="w-4 h-4" />
                                                            )}
                                                        </Button>
                                                    )}

                                                    {/* Process Shipment */}
                                                    {(order.status.toUpperCase() === "PAID" || order.status.toUpperCase() === "PROCESSING" || (order.status.toUpperCase() === "PENDING" && order.paymentMethod === "COD")) && !order.shipment && (
                                                        <Button 
                                                            variant="ghost" 
                                                            size="icon" 
                                                            className="h-8 w-8 hover:bg-primary/10 text-primary"
                                                            onClick={() => handleProcessShipment(order.id)}
                                                            disabled={isProcessingShipment}
                                                            title="Process Shipment"
                                                        >
                                                            {isProcessingShipment ? (
                                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                            ) : (
                                                                <Truck className="w-4 h-4" />
                                                            )}
                                                        </Button>
                                                    )}

                                                    {/* Mark as Delivered */}
                                                    {order.status.toUpperCase() === "SHIPPED" && (
                                                        <Button 
                                                            variant="ghost" 
                                                            size="icon" 
                                                            className="h-8 w-8 hover:bg-emerald-100 text-emerald-600"
                                                            onClick={() => handleUpdateStatus(order.id, "DELIVERED")}
                                                            disabled={isUpdatingStatus}
                                                            title="Mark as Delivered"
                                                        >
                                                            {isUpdatingStatus ? (
                                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                            ) : (
                                                                <PackageCheck className="w-4 h-4" />
                                                            )}
                                                        </Button>
                                                    )}

                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-100 dark:hover:bg-slate-800">
                                                                <MoreHorizontal className="w-4 h-4 text-slate-500" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="bg-white border-none shadow-xl rounded-2xl p-2 min-w-[180px]">
                                                            <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-neutral-400 px-3 py-2">Quick Actions</DropdownMenuLabel>
                                                            <DropdownMenuItem className="rounded-xl font-bold text-xs gap-3 px-3 py-2.5 cursor-pointer hover:bg-slate-50" onClick={() => copyToClipboard(order.id)}>
                                                                <Copy size={14} className="text-slate-400" />
                                                                Copy Order ID
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="rounded-xl font-bold text-xs gap-3 px-3 py-2.5 cursor-pointer hover:bg-slate-50" onClick={() => openDetails(order)}>
                                                                <Eye size={14} className="text-slate-400" />
                                                                View Full Details
                                                            </DropdownMenuItem>
                                                            
                                                            {(order.status.toUpperCase() === "PENDING" || order.status.toUpperCase() === "PROCESSING") && (
                                                                <>
                                                                    <DropdownMenuSeparator className="bg-slate-100 my-1 mx-2" />
                                                                    <DropdownMenuItem 
                                                                        className="rounded-xl font-bold text-xs gap-3 px-3 py-2.5 cursor-pointer hover:bg-rose-50 text-rose-600"
                                                                        onClick={() => handleUpdateStatus(order.id, "CANCELLED")}
                                                                        disabled={isUpdatingStatus}
                                                                    >
                                                                        <Ban size={14} />
                                                                        Cancel Order
                                                                    </DropdownMenuItem>
                                                                </>
                                                            )}
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
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
                                    Order #{selectedOrder?.id?.split('-')[0].toUpperCase()} • {selectedOrder && format(new Date(selectedOrder.createdAt), "MMM d, yyyy")}
                                </DialogDescription>
                            </div>
                            <Badge className={cn("border-none shadow-none font-black px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest", selectedOrder ? getStatusColor(selectedOrder.status) : "")}>
                                {selectedOrder?.status}
                            </Badge>
                        </div>
                    </DialogHeader>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Customer</h4>
                                <div className="space-y-1">
                                    <p className="text-base font-bold text-luxury-charcoal">{selectedOrder?.user?.name || "Guest"}</p>
                                    <p className="text-xs text-neutral-500">{selectedOrder?.user?.email}</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Shipping Address</h4>
                                <p className="text-xs text-luxury-charcoal leading-relaxed">{selectedOrder?.shippingAddress}</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Logistics</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Truck size={14} className="text-luxury-gold" />
                                        <p className="text-xs font-bold text-luxury-charcoal uppercase tracking-tighter">{selectedOrder?.shippingMethod} Delivery</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CreditCard size={14} className="text-luxury-gold" />
                                        <p className="text-xs font-bold text-luxury-charcoal uppercase tracking-tighter">{selectedOrder?.paymentMethod}</p>
                                    </div>
                                    {selectedOrder?.shipment && (
                                        <div className="flex flex-col gap-1 p-3 bg-neutral-50 rounded-xl border border-black/5">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Tracking Number</p>
                                            <div className="flex items-center gap-2">
                                                <Truck size={14} className="text-primary" />
                                                <p className="text-xs font-black text-primary italic uppercase">{selectedOrder.shipment.trackingNumber}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="bg-neutral-50 rounded-[1.5rem] p-6 space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Order Items</h4>
                            <div className="space-y-4 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                                {selectedOrder?.items.map((item: any) => (
                                    <div key={item.id} className="flex gap-4 items-center">
                                        <div className="relative w-12 h-16 rounded-lg overflow-hidden bg-white shadow-sm shrink-0">
                                            <Image 
                                                src={item.product?.images?.[0] || "/images/placeholder.png"} 
                                                alt={item.product?.name || "Product"}
                                                fill
                                                className="object-cover"
                                                unoptimized
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-bold text-luxury-charcoal truncate">{item.product?.name}</p>
                                            <p className="text-[10px] text-neutral-500">Qty: {item.quantity} × {formatPrice(item.price)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="pt-4 border-t border-neutral-200 flex justify-between items-end">
                                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Total Amount</span>
                                <span className="text-xl font-serif italic text-luxury-charcoal">{selectedOrder ? formatPrice(selectedOrder.totalAmount) : ""}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4 justify-end">
                        <Button variant="outline" className="rounded-xl text-[10px] font-black uppercase tracking-widest" onClick={() => setIsDetailsOpen(false)}>Close</Button>
                        
                        {(selectedOrder?.status.toUpperCase() === "PAID" || (selectedOrder?.status.toUpperCase() === "PENDING" && selectedOrder?.paymentMethod === "COD") || selectedOrder?.status.toUpperCase() === "PROCESSING") && !selectedOrder?.shipment && (
                            <Button 
                                className="bg-luxury-charcoal hover:bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest gap-2"
                                onClick={() => {
                                    handleProcessShipment(selectedOrder.id);
                                    setIsDetailsOpen(false);
                                }}
                                disabled={isProcessingShipment}
                            >
                                <Truck size={14} />
                                Process Shipment
                            </Button>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
