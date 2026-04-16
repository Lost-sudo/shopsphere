"use client";

import { useGetCartQuery } from "@/features/cart/cart.api";
import { CartItem } from "@/features/cart/cart.types";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowLeft, ShieldCheck, Truck, Clock, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

const CARRIERS = [
    { id: "JNT", name: "J&T Express", eta: "2-3 days", price: 50, color: "text-red-600", bg: "bg-red-50" },
    { id: "LBC", name: "LBC Express", eta: "1-2 days", price: 85, color: "text-blue-600", bg: "bg-blue-50" },
    { id: "FLASH", name: "Flash Express", eta: "2-4 days", price: 45, color: "text-yellow-600", bg: "bg-yellow-50" },
    { id: "NINJAVAN", name: "NinjaVan", eta: "3-5 days", price: 40, color: "text-red-700", bg: "bg-red-50" },
];

export default function CheckoutClient() {
    const { data: cartData, isLoading, isError } = useGetCartQuery();
    const [selectedCarrier, setSelectedCarrier] = useState(CARRIERS[0].id);
    
    // In a real scenario, we might want to pass the IDs of selected items via URL or state
    // But for this "display items" phase, we'll just show all items in the cart
    // or we could filter them if we had that state. Since we are redirected from Cart
    // where the user selected items, we'll assume for now we show what's in the cart.
    // Actually, CartClient has 'excludedItems' state. We might need to handle that.
    
    const cart = cartData?.data?.cart;
    const items = cart?.items || [];

    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat("en-PH", {
            style: "currency",
            currency: "PHP",
        }).format(amount);
    };

    const subtotal = items.reduce((acc: number, item: CartItem) => {
        return acc + (item.product?.price || 0) * item.quantity;
    }, 0);

    const currentCarrier = CARRIERS.find(c => c.id === selectedCarrier) || CARRIERS[0];
    const shippingFee = items.length > 0 ? currentCarrier.price : 0;
    const total = subtotal + shippingFee;

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-500">
                <Skeleton className="h-10 w-48" />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {[1, 2].map((i) => (
                            <Skeleton key={i} className="h-32 w-full rounded-xl" />
                        ))}
                    </div>
                    <Skeleton className="h-64 w-full rounded-xl" />
                </div>
            </div>
        );
    }

    if (isError || items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-24 text-center animate-in zoom-in duration-500">
                <div className="max-w-md mx-auto space-y-6">
                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                        <ShoppingBag size={48} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">No items to checkout</h2>
                        <p className="text-gray-500">Your cart is empty or there was an error.</p>
                    </div>
                    <Button asChild className="bg-shopee hover:bg-shopee-dark h-12 px-8 shadow-lg shadow-shopee/10">
                        <Link href="/">Shop Now</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 mb-8">
                <Button variant="ghost" size="icon" asChild className="rounded-full">
                    <Link href="/cart">
                        <ArrowLeft size={20} />
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Items List */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                            <h2 className="text-lg font-bold text-gray-900">Review Items ({items.length})</h2>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {items.map((item, index) => (
                                <div 
                                    key={item.id} 
                                    className="p-6 flex items-start gap-6 animate-in slide-in-from-left duration-300"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
                                        <Image
                                            src={item.product?.images[0] || "/images/placeholder.png"}
                                            alt={item.product?.name || "Product"}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <div className="flex justify-between gap-4">
                                            <h3 className="font-bold text-gray-900 line-clamp-1">{item.product?.name}</h3>
                                            <span className="font-bold text-shopee shrink-0">{formatPrice(item.product?.price || 0)}</span>
                                        </div>
                                        <p className="text-sm text-gray-500 flex items-center gap-1.5">
                                            <ShieldCheck size={14} className="text-green-500" />
                                            Original Product
                                        </p>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-500">Quantity: <span className="font-bold text-gray-900">{item.quantity}</span></span>
                                            <span className="text-gray-400">Subtotal: {formatPrice((item.product?.price || 0) * item.quantity)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Carrier Selection */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <Truck size={20} className="text-shopee" />
                                Shipping Carrier
                            </h2>
                            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Select Partner</span>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {CARRIERS.map((carrier) => (
                                <button
                                    key={carrier.id}
                                    onClick={() => setSelectedCarrier(carrier.id)}
                                    className={`relative p-4 rounded-xl border-2 transition-all flex items-center justify-between group ${
                                        selectedCarrier === carrier.id
                                            ? "border-shopee bg-shopee/[0.02]"
                                            : "border-gray-100 hover:border-gray-200 bg-white"
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-lg ${carrier.bg} flex items-center justify-center ${carrier.color}`}>
                                            <Truck size={24} />
                                        </div>
                                        <div className="text-left">
                                            <p className="font-bold text-gray-900">{carrier.name}</p>
                                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                <Clock size={12} />
                                                {carrier.eta}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right flex flex-col items-end gap-1">
                                        <span className="font-bold text-gray-900">{formatPrice(carrier.price)}</span>
                                        {selectedCarrier === carrier.id && (
                                            <CheckCircle2 size={18} className="text-shopee animate-in zoom-in duration-300" />
                                        )}
                                    </div>
                                    
                                    {selectedCarrier === carrier.id && (
                                        <div className="absolute -top-px -right-px">
                                            <div className="bg-shopee text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg rounded-tr-lg uppercase">
                                                Selected
                                            </div>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Summary Sidebar */}
                <div className="lg:col-span-1 animate-in slide-in-from-right duration-500">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6 sticky top-24">
                        <h2 className="text-xl font-bold text-gray-900">Payment Summary</h2>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between text-gray-600">
                                <span>Merchandise Subtotal</span>
                                <span className="font-medium text-gray-900">{formatPrice(subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping Fee</span>
                                <span className="font-medium text-gray-900">{formatPrice(shippingFee)}</span>
                            </div>
                            <div className="pt-4 border-t border-gray-100 flex justify-between items-end">
                                <span className="text-gray-900 font-bold">Total Payment</span>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-shopee">{formatPrice(total)}</p>
                                    <p className="text-xs text-gray-400">VAT included</p>
                                </div>
                            </div>
                        </div>

                        <Button 
                            className="w-full h-14 bg-shopee hover:bg-shopee-dark text-lg font-bold shadow-lg shadow-shopee/20 transition-all"
                        >
                            Place Order
                        </Button>

                        <p className="text-[11px] text-gray-500 text-center leading-relaxed font-light">
                            By clicking Place Order, you agree to ShopSphere&apos;s Terms of Service.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
