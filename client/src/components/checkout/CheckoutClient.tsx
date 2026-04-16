"use client";

import { useGetCartQuery } from "@/features/cart/cart.api";
import { useGetAddressesQuery } from "@/features/address/address.api";
import { CartItem } from "@/features/cart/cart.types";
import { Button } from "@/components/ui/button";
import { 
    ShoppingBag, 
    ArrowLeft, 
    ShieldCheck, 
    Truck, 
    Clock, 
    CheckCircle2, 
    MapPin, 
    ChevronRight,
    AlertCircle
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { AddressSelectionDialog } from "./AddressSelectionDialog";

const CARRIERS = [
    { id: "JNT", name: "J&T Express", eta: "2-3 days", price: 50, color: "text-red-600", bg: "bg-red-50" },
    { id: "LBC", name: "LBC Express", eta: "1-2 days", price: 85, color: "text-blue-600", bg: "bg-blue-50" },
    { id: "FLASH", name: "Flash Express", eta: "2-4 days", price: 45, color: "text-yellow-600", bg: "bg-yellow-50" },
    { id: "NINJAVAN", name: "NinjaVan", eta: "3-5 days", price: 40, color: "text-red-700", bg: "bg-red-50" },
];

export default function CheckoutClient() {
    const { data: cartData, isLoading: isCartLoading, isError: isCartError } = useGetCartQuery();
    const { data: addressData, isLoading: isAddressLoading } = useGetAddressesQuery();
    
    const [selectedCarrier, setSelectedCarrier] = useState(CARRIERS[0].id);
    const [overrideAddressId, setOverrideAddressId] = useState<string | null>(null);
    const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);

    const addresses = addressData?.addresses || [];
    
    const defaultAddress = addresses.find(a => a.isDefault) || addresses[0];
    const selectedAddressId = overrideAddressId ?? defaultAddress?.id;
    const selectedAddress = addresses.find(a => a.id === selectedAddressId);
    
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

    const isLoading = isCartLoading || isAddressLoading;

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

    if (isCartError || items.length === 0) {
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
                <div className="lg:col-span-2 space-y-6">
                    {/* Delivery Address Section */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden relative">
                        {/* Shaded Top Accent */}
                        <div className="h-1 bg-[repeating-linear-gradient(45deg,#ee4d2d,#ee4d2d_10px,#fff_10px,#fff_20px,#2673dd_20px,#2673dd_30px,#fff_30px,#fff_40px)]" />
                        
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <MapPin size={20} className="text-shopee" />
                                    Delivery Address
                                </h2 >
                                {selectedAddress ? (
                                    <button 
                                        onClick={() => setIsAddressDialogOpen(true)}
                                        className="text-shopee hover:text-shopee-dark text-sm font-medium flex items-center gap-1 group"
                                    >
                                        Change
                                        <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                                    </button>
                                ) : (
                                    <Link 
                                        href="/user/address" 
                                        className="text-shopee hover:text-shopee-dark text-sm font-medium flex items-center gap-1 group"
                                    >
                                        Add Address
                                        <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                                    </Link>
                                )}
                            </div>

                            {selectedAddress ? (
                                <div className="animate-in fade-in slide-in-from-top-2 duration-500">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                                        <span className="font-bold text-gray-900">
                                            {selectedAddress.firstName} {selectedAddress.lastName}
                                        </span>
                                        <span className="text-gray-500 hidden sm:block">|</span>
                                        <span className="text-gray-600 font-medium">{selectedAddress.phoneNumber}</span>
                                        {selectedAddress.isDefault && (
                                            <span className="text-[10px] font-bold text-shopee bg-shopee/5 px-2 py-0.5 rounded border border-shopee/20 uppercase ml-2">
                                                Default
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        {selectedAddress.street}, {selectedAddress.barangay}, {selectedAddress.city}, {selectedAddress.province}, {selectedAddress.region}, {selectedAddress.postalCode}, {selectedAddress.country}
                                    </p>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-4 text-center">
                                    <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-3">
                                        <AlertCircle size={24} />
                                    </div>
                                    <p className="text-sm text-gray-600 mb-4">No shipping address found in your account.</p>
                                    <Button asChild size="sm" className="bg-shopee hover:bg-shopee-dark">
                                        <Link href="/user/address">Add New Address</Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Items List */}
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
                            disabled={!selectedAddress}
                            className="w-full h-14 bg-shopee hover:bg-shopee-dark text-lg font-bold shadow-lg shadow-shopee/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Place Order
                        </Button>

                        <p className="text-[11px] text-gray-500 text-center leading-relaxed font-light">
                            By clicking Place Order, you agree to ShopSphere&apos;s Terms of Service.
                        </p>
                    </div>
                </div>
            </div>

            <AddressSelectionDialog 
                open={isAddressDialogOpen}
                onOpenChange={setIsAddressDialogOpen}
                addresses={addresses}
                selectedId={selectedAddressId || null}
                onSelect={setOverrideAddressId}
            />
        </div>
    );
}
