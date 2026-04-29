"use client";

import { useGetCartQuery } from "@/features/cart/cart.api";
import { useGetAddressesQuery } from "@/features/address/address.api";
import { useCreateOrderMutation } from "@/features/order/order.api";
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
    AlertCircle,
    CreditCard,
    Wallet,
    Banknote,
    Check,
    PackageCheck,
    Loader2
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useMemo, useCallback } from "react";
import { AddressSelectionDialog } from "./AddressSelectionDialog";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { toast } from "sonner";

const CARRIERS = [
    { id: "STANDARD", name: "Standard Delivery", eta: "3-5 Business Days", price: 50 },
    { id: "EXPRESS", name: "Premium Express", eta: "1-2 Business Days", price: 150 },
];

const PAYMENT_METHODS = [
    { id: "CARD", name: "Credit / Debit Card", icon: CreditCard, description: "Visa, Mastercard, Amex" },
    { id: "GCASH", name: "GCash", icon: Wallet, description: "Pay securely via GCash App" },
    { id: "COD", name: "Cash on Delivery", icon: Banknote, description: "Pay when you receive" },
];

const STEPS = [
    { id: 1, title: "Address" },
    { id: 2, title: "Shipping" },
    { id: 3, title: "Payment" },
    { id: 4, title: "Review" },
];

export default function CheckoutClient() {
    const { data: cartData, isLoading: isCartLoading, isError: isCartError } = useGetCartQuery();
    const { data: addressData, isLoading: isAddressLoading } = useGetAddressesQuery();
    const [createOrder, { isLoading: isPlacingOrder }] = useCreateOrderMutation();
    const user = useSelector((state: RootState) => state.auth.user);
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedCarrier, setSelectedCarrier] = useState(CARRIERS[0].id);
    const [selectedPayment, setSelectedPayment] = useState(PAYMENT_METHODS[0].id);
    const [overrideAddressId, setOverrideAddressId] = useState<string | null>(null);
    const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);

    const addresses = addressData?.addresses || [];
    
    const defaultAddress = addresses.find((a: any) => a.isDefault) || addresses[0];
    const selectedAddressId = overrideAddressId ?? defaultAddress?.id;
    const selectedAddress = addresses.find((a: any) => a.id === selectedAddressId);
    
    const cart = cartData?.data?.cart;
    const allItems = cart?.items || [];

    // Filter items to only selected ones from cart page
    const selectedItemIds = useMemo(() => {
        const param = searchParams.get("items");
        return param ? param.split(",") : [];
    }, [searchParams]);

    const items = useMemo(() => {
        if (selectedItemIds.length === 0) return allItems;
        return allItems.filter(item => selectedItemIds.includes(item.id));
    }, [allItems, selectedItemIds]);

    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat("en-PH", {
            style: "currency",
            currency: "PHP",
        }).format(amount);
    };

    const subtotal = items.reduce((acc: number, item: CartItem) => {
        const price = item.variant?.price ?? item.product?.price ?? 0;
        return acc + price * item.quantity;
    }, 0);

    const currentCarrier = CARRIERS.find(c => c.id === selectedCarrier) || CARRIERS[0];
    const shippingFee = items.length > 0 ? currentCarrier.price : 0;
    const total = subtotal + shippingFee;

    const handlePlaceOrder = useCallback(async () => {
        if (!user || !selectedAddress || items.length === 0) return;

        const shippingAddr = `${selectedAddress.street}, ${selectedAddress.barangay}, ${selectedAddress.city}, ${selectedAddress.province} ${selectedAddress.postalCode}, ${selectedAddress.country}`;
        const idempotencyKey = `order-${user.id}-${Date.now()}`;

        try {
            const result = await createOrder({
                userId: user.id,
                items: items.map(item => ({
                    productId: item.productId,
                    variantId: item.variantId,
                    quantity: item.quantity,
                    price: item.variant?.price ?? item.product?.price ?? 0,
                })),
                totalAmount: total,
                shippingAddress: shippingAddr,
                paymentMethod: selectedPayment,
                idempotencyKey,
            }).unwrap();

            setPlacedOrderId(result.order.id);
            setOrderSuccess(true);
            toast.success("Order placed successfully!");
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to place order. Please try again.");
        }
    }, [user, selectedAddress, items, total, selectedPayment, createOrder]);

    const isLoading = isCartLoading || isAddressLoading;

    if (orderSuccess) {
        return (
            <div className="container mx-auto px-4 py-32 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-lg mx-auto space-y-8"
                >
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-green-100">
                        <PackageCheck size={44} className="text-green-500" strokeWidth={1.5} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-light text-[#1a1a1a] font-serif mb-3">Order Confirmed</h2>
                        <p className="text-gray-500 font-light">Your order has been placed successfully.<br/>Payment will be collected upon delivery.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild className="bg-[#1a1a1a] hover:bg-[#2c2c2c] text-white rounded-full px-8 h-12">
                            <Link href="/shop">Continue Shopping</Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        );
    }

    const nextStep = () => setCurrentStep((p) => Math.min(p + 1, 4));
    const prevStep = () => setCurrentStep((p) => Math.max(p - 1, 1));

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8 space-y-8 max-w-6xl">
                <Skeleton className="h-10 w-48" />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {[1, 2, 3].map((i) => (
                            <Skeleton key={i} className="h-40 w-full rounded-2xl" />
                        ))}
                    </div>
                    <Skeleton className="h-[400px] w-full rounded-2xl" />
                </div>
            </div>
        );
    }

    if (isCartError || items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-32 text-center">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md mx-auto space-y-8"
                >
                    <div className="w-24 h-24 bg-white/50 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto text-gray-400 border border-white/20 shadow-xl">
                        <ShoppingBag size={40} strokeWidth={1.5} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-light text-gray-900 mb-2 font-serif">Your Bag is Empty</h2>
                        <p className="text-gray-500 font-light">Add some beautiful pieces to continue checkout.</p>
                    </div>
                    <Button asChild className="bg-[#1a1a1a] hover:bg-[#2c2c2c] text-white rounded-full h-12 px-8 shadow-xl transition-all duration-300 w-full md:w-auto">
                        <Link href="/shop">Explore Collections</Link>
                    </Button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 max-w-6xl pb-24">
            {/* Header & Progress Indicator */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-gray-200/50 pb-8">
                <div className="space-y-4">
                    <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-black/5 -ml-2 transition-colors">
                        <Link href="/cart">
                            <ArrowLeft size={20} className="text-gray-600" />
                        </Link>
                    </Button>
                    <h1 className="text-4xl font-light text-[#1a1a1a] tracking-tight font-serif">Checkout</h1>
                </div>

                <div className="flex items-center gap-4 md:gap-8">
                    {STEPS.map((step, idx) => {
                        const isActive = currentStep === step.id;
                        const isCompleted = currentStep > step.id;
                        return (
                            <div key={step.id} className="flex items-center gap-4">
                                <div className="flex flex-col items-center gap-2">
                                    <div 
                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-500 ${
                                            isActive 
                                                ? "bg-[#1a1a1a] text-white shadow-lg" 
                                                : isCompleted 
                                                    ? "bg-[#c5a059] text-white" 
                                                    : "bg-gray-100 text-gray-400"
                                        }`}
                                    >
                                        {isCompleted ? <Check size={16} /> : step.id}
                                    </div>
                                    <span className={`text-xs font-medium uppercase tracking-wider hidden md:block transition-colors duration-300 ${
                                        isActive ? "text-[#1a1a1a]" : isCompleted ? "text-[#c5a059]" : "text-gray-400"
                                    }`}>
                                        {step.title}
                                    </span>
                                </div>
                                {idx < STEPS.length - 1 && (
                                    <div className={`w-8 md:w-16 h-px mb-6 md:mb-0 ${isCompleted ? 'bg-[#c5a059]' : 'bg-gray-200'}`} />
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Main Content Area */}
                <div className="lg:col-span-8 space-y-6">
                    <AnimatePresence mode="wait">
                        {currentStep === 1 && (
                            <motion.div 
                                key="step1"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="glass-panel p-8 rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] space-y-8"
                            >
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-light text-[#1a1a1a] font-serif">Delivery Address</h2>
                                    {selectedAddress && (
                                        <button 
                                            onClick={() => setIsAddressDialogOpen(true)}
                                            className="text-[#c5a059] hover:text-[#dfb974] text-sm font-medium transition-colors"
                                        >
                                            Change
                                        </button>
                                    )}
                                </div>

                                {selectedAddress ? (
                                    <div className="p-6 rounded-2xl bg-white/50 border border-white shadow-sm space-y-3">
                                        <div className="flex items-center gap-3">
                                            <span className="font-medium text-[#1a1a1a] text-lg">
                                                {selectedAddress.firstName} {selectedAddress.lastName}
                                            </span>
                                            {selectedAddress.isDefault && (
                                                <span className="text-[10px] uppercase tracking-widest bg-[#1a1a1a] text-white px-2 py-1 rounded-full">
                                                    Default
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-gray-500 font-light text-sm">{selectedAddress.phoneNumber}</p>
                                        <p className="text-gray-600 font-light leading-relaxed">
                                            {selectedAddress.street}, {selectedAddress.barangay}<br/>
                                            {selectedAddress.city}, {selectedAddress.province} {selectedAddress.postalCode}<br/>
                                            {selectedAddress.country}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12 text-center rounded-2xl bg-white/30 border border-dashed border-gray-300">
                                        <MapPin size={32} className="text-gray-300 mb-4" strokeWidth={1} />
                                        <p className="text-gray-500 font-light mb-6">No shipping address selected.</p>
                                        <Button asChild className="bg-[#1a1a1a] hover:bg-[#2c2c2c] rounded-full px-8">
                                            <Link href="/user/address">Add New Address</Link>
                                        </Button>
                                    </div>
                                )}

                                <div className="flex justify-end pt-4">
                                    <Button 
                                        onClick={nextStep} 
                                        disabled={!selectedAddress}
                                        className="bg-[#1a1a1a] hover:bg-[#2c2c2c] text-white rounded-full px-8 h-12"
                                    >
                                        Continue to Shipping
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {currentStep === 2 && (
                            <motion.div 
                                key="step2"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="glass-panel p-8 rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] space-y-8"
                            >
                                <h2 className="text-2xl font-light text-[#1a1a1a] font-serif">Shipping Method</h2>
                                
                                <div className="space-y-4">
                                    {CARRIERS.map((carrier) => (
                                        <div
                                            key={carrier.id}
                                            onClick={() => setSelectedCarrier(carrier.id)}
                                            className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 flex items-center justify-between ${
                                                selectedCarrier === carrier.id
                                                    ? "bg-white/80 border-[#c5a059] shadow-md ring-1 ring-[#c5a059]/20"
                                                    : "bg-white/40 border-white hover:bg-white/60 hover:border-gray-200"
                                            }`}
                                        >
                                            <div className="flex items-center gap-6">
                                                <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                                                    selectedCarrier === carrier.id ? "border-[#c5a059]" : "border-gray-300"
                                                }`}>
                                                    {selectedCarrier === carrier.id && (
                                                        <div className="w-3 h-3 rounded-full bg-[#c5a059]" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-[#1a1a1a]">{carrier.name}</p>
                                                    <p className="text-sm text-gray-500 font-light mt-1 flex items-center gap-2">
                                                        <Clock size={14} className="text-gray-400" />
                                                        {carrier.eta}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className="font-medium text-[#1a1a1a]">{formatPrice(carrier.price)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-between pt-4">
                                    <Button variant="ghost" onClick={prevStep} className="rounded-full px-6 font-medium">Back</Button>
                                    <Button onClick={nextStep} className="bg-[#1a1a1a] hover:bg-[#2c2c2c] text-white rounded-full px-8 h-12">Continue to Payment</Button>
                                </div>
                            </motion.div>
                        )}

                        {currentStep === 3 && (
                            <motion.div 
                                key="step3"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="glass-panel p-8 rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] space-y-8"
                            >
                                <h2 className="text-2xl font-light text-[#1a1a1a] font-serif">Payment Method</h2>
                                
                                <div className="space-y-4">
                                    {PAYMENT_METHODS.map((method) => (
                                        <div
                                            key={method.id}
                                            onClick={() => setSelectedPayment(method.id)}
                                            className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 flex items-center gap-6 ${
                                                selectedPayment === method.id
                                                    ? "bg-white/80 border-[#c5a059] shadow-md ring-1 ring-[#c5a059]/20"
                                                    : "bg-white/40 border-white hover:bg-white/60 hover:border-gray-200"
                                            }`}
                                        >
                                            <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                                                selectedPayment === method.id ? "border-[#c5a059]" : "border-gray-300"
                                            }`}>
                                                {selectedPayment === method.id && (
                                                    <div className="w-3 h-3 rounded-full bg-[#c5a059]" />
                                                )}
                                            </div>
                                            <div className="flex-1 flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-500">
                                                    <method.icon size={20} strokeWidth={1.5} />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-[#1a1a1a]">{method.name}</p>
                                                    <p className="text-sm text-gray-500 font-light mt-0.5">{method.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-between pt-4">
                                    <Button variant="ghost" onClick={prevStep} className="rounded-full px-6 font-medium">Back</Button>
                                    <Button onClick={nextStep} className="bg-[#1a1a1a] hover:bg-[#2c2c2c] text-white rounded-full px-8 h-12">Review Order</Button>
                                </div>
                            </motion.div>
                        )}

                        {currentStep === 4 && (
                            <motion.div 
                                key="step4"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="glass-panel p-8 rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] space-y-8"
                            >
                                <h2 className="text-2xl font-light text-[#1a1a1a] font-serif">Review Your Order</h2>
                                
                                <div className="space-y-6">
                                    {items.map((item, index) => (
                                        <div key={item.id} className="flex gap-6 items-center">
                                            <div className="relative w-24 h-32 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                                                <Image
                                                    src={item.product?.images[0] || "/images/placeholder.png"}
                                                    alt={item.product?.name || "Product"}
                                                    fill
                                                    className="object-cover"
                                                    unoptimized
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-medium text-[#1a1a1a] text-lg mb-1">{item.product?.name}</h3>
                                                {item.variant && (
                                                    <p className="text-xs text-[#c5a059] uppercase tracking-widest font-medium mb-1">
                                                        {item.variant.name}: {item.variant.value}
                                                    </p>
                                                )}
                                                <p className="text-sm text-gray-500 font-light mb-3">Qty: {item.quantity}</p>
                                                <p className="font-medium text-[#1a1a1a]">{formatPrice(item.variant?.price ?? item.product?.price ?? 0)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-gray-100">
                                    <div className="bg-gray-50/50 rounded-2xl p-6">
                                        <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-4 font-medium">Shipping to</h4>
                                        <p className="text-sm text-[#1a1a1a] font-medium">{selectedAddress?.firstName} {selectedAddress?.lastName}</p>
                                        <p className="text-sm text-gray-500 font-light mt-1">{selectedAddress?.street}, {selectedAddress?.city}</p>
                                    </div>
                                    <div className="bg-gray-50/50 rounded-2xl p-6">
                                        <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-4 font-medium">Payment & Delivery</h4>
                                        <p className="text-sm text-[#1a1a1a] font-medium">{PAYMENT_METHODS.find(m => m.id === selectedPayment)?.name}</p>
                                        <p className="text-sm text-gray-500 font-light mt-1">{currentCarrier.name}</p>
                                    </div>
                                </div>

                                <div className="flex justify-between pt-4">
                                    <Button variant="ghost" onClick={prevStep} className="rounded-full px-6 font-medium" disabled={isPlacingOrder}>Back</Button>
                                    <Button 
                                        onClick={handlePlaceOrder}
                                        disabled={isPlacingOrder || !selectedAddress}
                                        className="bg-[#1a1a1a] hover:bg-[#2c2c2c] text-[#c5a059] rounded-full px-12 h-12 text-lg transition-transform hover:scale-105 duration-300 shadow-xl disabled:opacity-50"
                                    >
                                        {isPlacingOrder ? (
                                            <span className="flex items-center gap-2"><Loader2 className="animate-spin" size={18} /> Placing Order...</span>
                                        ) : (
                                            "Place Order"
                                        )}
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Summary Sidebar */}
                <div className="lg:col-span-4 relative">
                    <div className="sticky top-24 bg-white/60 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] rounded-3xl p-8 space-y-8">
                        <h2 className="text-xl font-light text-[#1a1a1a] font-serif">Order Summary</h2>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between text-gray-600 font-light">
                                <span>Subtotal</span>
                                <span>{formatPrice(subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600 font-light">
                                <span>Shipping</span>
                                <span>{formatPrice(shippingFee)}</span>
                            </div>
                            
                            <div className="pt-6 border-t border-gray-200/50">
                                <div className="flex justify-between items-end">
                                    <span className="text-[#1a1a1a] font-medium">Total</span>
                                    <div className="text-right">
                                        <p className="text-2xl font-light text-[#1a1a1a] tracking-tight">{formatPrice(total)}</p>
                                        <p className="text-xs text-gray-400 font-light mt-1">VAT included</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {currentStep < 4 && (
                            <Button 
                                onClick={nextStep}
                                disabled={!selectedAddress}
                                className="w-full bg-[#1a1a1a] hover:bg-[#2c2c2c] text-white rounded-full h-14 text-lg transition-all shadow-lg"
                            >
                                Continue
                            </Button>
                        )}

                        <div className="flex items-center gap-3 pt-6 border-t border-gray-200/50 text-gray-500 justify-center">
                            <ShieldCheck size={16} className="text-[#c5a059]" />
                            <p className="text-xs font-light tracking-wide uppercase">Secure Checkout</p>
                        </div>
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
