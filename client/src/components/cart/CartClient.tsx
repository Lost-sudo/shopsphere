"use client";

import { useState } from "react";
import { useGetCartQuery, useUpdateItemMutation, useRemoveItemMutation } from "@/features/cart/cart.api";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingBag, Plus, Minus, ArrowRight, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

export default function CartClient() {
    const { data: cartData, isLoading, isError } = useGetCartQuery();
    const [updateItem, { isLoading: isUpdating }] = useUpdateItemMutation();
    const [removeItem, { isLoading: isRemoving }] = useRemoveItemMutation();
    const router = useRouter();
    
    // We track items the user UNCHECKED (excluded)
    const [excludedItems, setExcludedItems] = useState<string[]>([]);

    const cart = cartData?.data?.cart;
    const items = cart?.items || [];

    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat("en-PH", {
            style: "currency",
            currency: "PHP",
        }).format(amount);
    };

    const cn = (...classes: (string | boolean | undefined)[]) => {
        return classes.filter(Boolean).join(" ");
    };

    const handleUpdateQuantity = async (itemId: string, currentQuantity: number, delta: number) => {
        const item = items.find(i => i.id === itemId);
        if (!item) return;

        const newQuantity = currentQuantity + delta;
        if (newQuantity < 1) return;

        // Check stock
        const availableStock = item.variant?.stock ?? item.product?.stock ?? 0;
        if (delta > 0 && newQuantity > availableStock) {
            toast.error("Insufficient stock", {
                description: `Only ${availableStock} items available.`
            });
            return;
        }
        
        try {
            await updateItem({ itemId, quantity: newQuantity }).unwrap();
            toast.success("Quantity updated");
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to update quantity");
        }
    };

    const handleRemoveItem = async (itemId: string) => {
        try {
            await removeItem(itemId).unwrap();
            setExcludedItems(prev => prev.filter(id => id !== itemId));
            toast.success("Item removed from cart");
        } catch {
            toast.error("Failed to remove item");
        }
    };

    const toggleSelectItem = (itemId: string) => {
        setExcludedItems(prev => 
            prev.includes(itemId) 
                ? prev.filter(id => id !== itemId) 
                : [...prev, itemId]
        );
    };

    const isAllSelected = items.length > 0 && excludedItems.length === 0;

    const toggleSelectAll = () => {
        if (isAllSelected) {
            setExcludedItems(items.map(item => item.id));
        } else {
            setExcludedItems([]);
        }
    };

    const selectedCartItems = items.filter(item => !excludedItems.includes(item.id));
    
    const subtotal = selectedCartItems.reduce((acc, item) => {
        const itemPrice = item.variant?.price ?? item.product?.price ?? 0;
        return acc + itemPrice * item.quantity;
    }, 0);

    const totalWeight = selectedCartItems.reduce((acc, item) => {
        return acc + (item.product?.weight || 0) * item.quantity;
    }, 0);

    const shippingFee = selectedCartItems.length > 0 ? Math.ceil(totalWeight / 500) * 50 : 0;
    const total = subtotal + shippingFee;

    const handleCheckout = () => {
        if (selectedCartItems.length === 0) return;
        const selectedIds = selectedCartItems.map(item => item.id).join(",");
        router.push(`/checkout?items=${encodeURIComponent(selectedIds)}`);
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-500">
                <Skeleton className="h-10 w-48" />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {[1, 2, 3].map((i) => (
                            <Skeleton key={i} className="h-32 w-full rounded-xl" />
                        ))}
                    </div>
                    <Skeleton className="h-64 w-full rounded-xl" />
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="container mx-auto px-4 py-20 text-center animate-in zoom-in duration-300">
                <div className="max-w-md mx-auto space-y-4">
                    <h2 className="text-2xl font-bold text-gray-900">Failed to load cart</h2>
                    <p className="text-gray-500">We couldn&apos;t retrieve your cart. Please ensure you are logged in.</p>
                    <Button onClick={() => window.location.reload()} variant="outline">Retry</Button>
                </div>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-24 text-center animate-in zoom-in duration-500">
                <div className="max-w-md mx-auto space-y-6">
                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                        <ShoppingBag size={48} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                        <p className="text-gray-500">Looks like you haven&apos;t added anything to your cart yet.</p>
                    </div>
                    <Button asChild className="bg-shopee hover:bg-shopee-dark h-12 px-8 shadow-lg shadow-shopee/10">
                        <Link href="/">Shop Now</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#FAF9F6] min-h-screen py-16 transition-all duration-500">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="mb-12 space-y-2">
                    <h1 className="text-5xl font-serif italic text-luxury-charcoal">
                        Your Bag
                    </h1>
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">
                            {items.length} {items.length === 1 ? 'Piece' : 'Pieces'} Collected
                        </span>
                        <div className="h-[1px] flex-1 bg-black/5" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Items List */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Select All Header */}
                        <div className="bg-white/40 backdrop-blur-xl rounded-[2rem] border border-black/5 p-6 flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center gap-4">
                                <Checkbox 
                                    id="select-all" 
                                    checked={isAllSelected} 
                                    onCheckedChange={toggleSelectAll}
                                    className="border-black/10 rounded-full h-5 w-5 data-[state=checked]:bg-luxury-charcoal data-[state=checked]:border-luxury-charcoal"
                                />
                                <label htmlFor="select-all" className="text-xs font-black uppercase tracking-widest text-luxury-charcoal cursor-pointer select-none">
                                    Select All Items
                                </label>
                            </div>
                            {excludedItems.length > 0 && (
                                <button 
                                    onClick={() => setExcludedItems([])}
                                    className="text-[9px] font-black uppercase tracking-widest text-luxury-gold hover:underline underline-offset-4"
                                >
                                    Restore Selection
                                </button>
                            )}
                        </div>

                        <div className="space-y-6">
                            {items.map((item, index) => {
                                const itemPrice = item.variant?.price ?? item.product?.price ?? 0;
                                return (
                                    <div 
                                        key={item.id} 
                                        style={{ animationDelay: `${index * 100}ms` }}
                                        className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-black/5 p-8 shadow-sm hover:shadow-xl hover:bg-white/80 transition-all group relative animate-in fade-in slide-in-from-bottom-8 duration-700"
                                    >
                                        <div className="flex flex-col md:flex-row gap-8">
                                            {/* Selection & Image */}
                                            <div className="flex gap-6 items-center shrink-0">
                                                <Checkbox 
                                                    checked={!excludedItems.includes(item.id)} 
                                                    onCheckedChange={() => toggleSelectItem(item.id)}
                                                    className="border-black/10 rounded-full h-5 w-5 data-[state=checked]:bg-luxury-charcoal data-[state=checked]:border-luxury-charcoal"
                                                />
                                                <div className="relative w-32 md:w-40 aspect-[3/4] rounded-[1.5rem] overflow-hidden bg-neutral-100 shadow-inner">
                                                    <Image
                                                        src={item.product?.images[0] || "/images/placeholder.png"}
                                                        alt={item.product?.name || "Product"}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                                        unoptimized
                                                    />
                                                </div>
                                            </div>

                                            {/* Product Details */}
                                            <div className="flex-1 flex flex-col justify-between py-2">
                                                <div className="space-y-4">
                                                    <div className="flex justify-between items-start">
                                                        <div className="space-y-1">
                                                            <Link 
                                                                href={`/product/${item.productId}`}
                                                                className="text-2xl font-serif italic text-luxury-charcoal hover:text-luxury-gold transition-colors block"
                                                            >
                                                                {item.product?.name}
                                                            </Link>
                                                            <div className="flex items-center gap-3">
                                                                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Essential Piece</span>
                                                                {item.variant && (
                                                                    <div className="flex items-center gap-2">
                                                                        <div className="w-1 h-1 rounded-full bg-neutral-300" />
                                                                        <span className="text-[10px] font-black uppercase tracking-widest text-luxury-gold">
                                                                            {item.variant.name}: {item.variant.value}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <button 
                                                            onClick={() => handleRemoveItem(item.id)}
                                                            disabled={isRemoving}
                                                            className="p-3 text-neutral-300 hover:text-red-500 hover:bg-red-50/50 rounded-full transition-all"
                                                        >
                                                            <Trash2 size={20} strokeWidth={1.5} />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="flex items-end justify-between mt-8">
                                                    <div className="space-y-2">
                                                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400">Unit Price</p>
                                                        <div className="flex items-baseline gap-3">
                                                            <span className="text-xl font-serif italic text-luxury-charcoal">
                                                                {formatPrice(itemPrice)}
                                                            </span>
                                                            {itemPrice < (item.product?.price ?? 0) * 1.2 && (
                                                                <span className="text-xs text-neutral-300 line-through font-medium">
                                                                    {formatPrice(itemPrice * 1.2)}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Modern Quantity Selector */}
                                                    <div className="flex items-center bg-black/5 rounded-2xl p-1.5 gap-1 shadow-inner">
                                                        <button 
                                                            onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                                                            disabled={isUpdating || item.quantity <= 1}
                                                            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm disabled:opacity-30 transition-all text-luxury-charcoal"
                                                        >
                                                            <Minus size={14} strokeWidth={3} />
                                                        </button>
                                                        <span className="w-8 text-center font-black text-xs text-luxury-charcoal">{item.quantity}</span>
                                                        <button 
                                                            onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                                                            disabled={isUpdating || item.quantity >= (item.variant?.stock ?? item.product?.stock ?? 0)}
                                                            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm disabled:opacity-30 transition-all text-luxury-charcoal"
                                                        >
                                                            <Plus size={14} strokeWidth={3} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Summary Sidebar */}
                    <div className="lg:col-span-4 animate-in fade-in slide-in-from-right-8 duration-1000">
                        <div className="bg-luxury-charcoal rounded-[2.5rem] p-10 space-y-10 sticky top-24 shadow-2xl shadow-black/20">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-serif italic text-white">Summary</h2>
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">Checkout Selection</p>
                            </div>
                            
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Subtotal</span>
                                    <span className="font-serif italic text-xl text-white">{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Boutique Delivery</span>
                                        {totalWeight > 0 && (
                                            <p className="text-[8px] text-neutral-500 font-black uppercase tracking-widest italic opacity-60">
                                                Est. Weight: {totalWeight}g ({Math.ceil(totalWeight / 500)} units)
                                            </p>
                                        )}
                                    </div>
                                    <div className="text-right space-y-1">
                                        <span className="font-serif italic text-xl text-white">{formatPrice(shippingFee)}</span>
                                        <p className="text-[8px] text-luxury-gold font-black uppercase tracking-widest italic opacity-60">Standard Shipping Estimate</p>
                                    </div>
                                </div>
                                
                                <div className="pt-8 border-t border-white/10 space-y-4">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Grand Total</span>
                                        <div className="text-right">
                                            <p className="text-4xl font-serif italic text-luxury-gold">{formatPrice(total)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Button 
                                    onClick={handleCheckout}
                                    disabled={selectedCartItems.length === 0}
                                    className="w-full h-16 bg-white hover:bg-neutral-100 text-luxury-charcoal text-xs font-black uppercase tracking-[0.2em] rounded-2xl transition-all group disabled:bg-neutral-800 disabled:text-neutral-600"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        Begin Checkout ({selectedCartItems.length})
                                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} strokeWidth={3} />
                                    </span>
                                </Button>
                                
                                <div className="flex items-center justify-center gap-2 pt-2">
                                    <ShieldCheck size={12} className="text-luxury-gold" />
                                    <span className="text-[9px] font-black uppercase tracking-widest text-neutral-500">Secure Luxury Payment</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Extra Info */}
                        <div className="mt-8 px-6 text-center">
                            <p className="text-[9px] font-medium text-neutral-400 uppercase tracking-widest leading-relaxed">
                                Free returns within 30 days. <br /> 
                                Ships from our global luxury studios.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
