"use client";

import { useState } from "react";
import { useGetCartQuery, useUpdateItemMutation, useRemoveItemMutation } from "@/features/cart/cart.api";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingBag, Plus, Minus, ArrowRight, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

export default function CartClient() {
    const { data: cartData, isLoading, isError } = useGetCartQuery();
    const [updateItem, { isLoading: isUpdating }] = useUpdateItemMutation();
    const [removeItem, { isLoading: isRemoving }] = useRemoveItemMutation();
    
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

    const handleUpdateQuantity = async (itemId: string, currentQuantity: number, delta: number) => {
        const newQuantity = currentQuantity + delta;
        if (newQuantity < 1) return;
        
        try {
            await updateItem({ itemId, quantity: newQuantity }).unwrap();
            toast.success("Quantity updated");
        } catch {
            toast.error("Failed to update quantity");
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
        return acc + (item.product?.price || 0) * item.quantity;
    }, 0);

    const shippingFee = selectedCartItems.length > 0 ? 50 : 0;
    const total = subtotal + shippingFee;

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
        <div className="bg-gray-50/50 min-h-screen py-10 transition-all duration-300">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                    Your Cart
                    <span className="text-sm font-normal text-gray-400 bg-white border border-gray-100 px-3 py-1 rounded-full shadow-sm">
                        {items.length} {items.length === 1 ? 'item' : 'items'}
                    </span>
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Items List */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Select All Header */}
                        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-center gap-4 animate-in slide-in-from-left duration-300">
                            <Checkbox 
                                id="select-all" 
                                checked={isAllSelected} 
                                onCheckedChange={toggleSelectAll}
                                className="border-gray-300 data-[state=checked]:bg-shopee data-[state=checked]:border-shopee"
                            />
                            <label htmlFor="select-all" className="text-sm font-medium text-gray-700 cursor-pointer select-none">
                                Select All ({items.length} items)
                            </label>
                        </div>

                        {items.map((item, index) => (
                            <div 
                                key={item.id} 
                                style={{ animationDelay: `${index * 50}ms` }}
                                className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all group relative overflow-hidden flex items-start gap-4 animate-in slide-in-from-left duration-500"
                            >
                                <div className="pt-10 sm:pt-14">
                                    <Checkbox 
                                        checked={!excludedItems.includes(item.id)} 
                                        onCheckedChange={() => toggleSelectItem(item.id)}
                                        className="border-gray-300 data-[state=checked]:bg-shopee data-[state=checked]:border-shopee"
                                    />
                                </div>

                                <div className="flex-1 flex flex-col sm:flex-row gap-6">
                                    {/* Product Image */}
                                    <div className="relative w-full sm:w-32 aspect-square rounded-xl overflow-hidden bg-gray-50 shrink-0 border border-gray-50">
                                        <Image
                                            src={item.product?.images[0] || "/images/placeholder.png"}
                                            alt={item.product?.name || "Product"}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            unoptimized
                                        />
                                    </div>

                                    {/* Product Info */}
                                    <div className="flex-1 flex flex-col justify-between py-1">
                                        <div className="space-y-1">
                                            <div className="flex justify-between items-start">
                                                <Link 
                                                    href={`/product/${item.productId}`}
                                                    className="text-lg font-bold text-gray-900 hover:text-shopee transition-colors line-clamp-1 pr-8 text-balance"
                                                >
                                                    {item.product?.name}
                                                </Link>
                                                <button 
                                                    onClick={() => handleRemoveItem(item.id)}
                                                    disabled={isRemoving}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                            <p className="text-sm text-gray-500 flex items-center gap-1.5">
                                                <ShieldCheck size={14} className="text-green-500" />
                                                Original Product
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between mt-4 sm:mt-0">
                                            <div className="flex flex-col">
                                                <span className="text-xl font-bold text-shopee">
                                                    {formatPrice(item.product?.price || 0)}
                                                </span>
                                                <span className="text-sm text-gray-400 line-through">
                                                    {formatPrice((item.product?.price || 0) * 1.2)}
                                                </span>
                                            </div>

                                            {/* Quantity Selector */}
                                            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden h-10 shadow-sm bg-white">
                                                <button 
                                                    onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                                                    disabled={isUpdating || item.quantity <= 1}
                                                    className="px-3 hover:bg-gray-50 disabled:opacity-30 transition-colors text-gray-500 border-r border-gray-200"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="w-10 text-center font-bold text-gray-900 text-sm">{item.quantity}</span>
                                                <button 
                                                    onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                                                    disabled={isUpdating}
                                                    className="px-3 hover:bg-gray-50 disabled:opacity-30 transition-colors text-gray-500 border-l border-gray-200"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary Sidebar */}
                    <div className="lg:col-span-1 animate-in slide-in-from-right duration-500">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6 sticky top-24">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
                                {selectedCartItems.length > 0 && (
                                    <span className="text-[10px] font-bold text-shopee bg-shopee/5 px-2 py-0.5 rounded-full uppercase">
                                        {selectedCartItems.length} selected
                                    </span>
                                )}
                            </div>
                            
                            <div className="space-y-4">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-gray-900">{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping Fee</span>
                                    <div className="text-right">
                                        <span className="font-medium text-gray-900">{formatPrice(shippingFee)}</span>
                                        <p className="text-[10px] text-green-500 font-medium lowercase italic">Free for orders above ₱1,000</p>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-gray-100 flex justify-between items-end">
                                    <span className="text-gray-900 font-bold">Total</span>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-shopee">{formatPrice(total)}</p>
                                        <p className="text-xs text-gray-400">VAT included</p>
                                    </div>
                                </div>
                            </div>

                            <Button 
                                disabled={selectedCartItems.length === 0}
                                className="w-full h-14 bg-shopee hover:bg-shopee-dark text-lg font-bold shadow-lg shadow-shopee/20 transition-all group disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none"
                            >
                                Checkout ({selectedCartItems.length})
                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                            </Button>

                            {/* Extra Perks */}
                            <div className="pt-4 border-t border-gray-100">
                                <p className="text-[11px] text-gray-500 text-center leading-relaxed font-light">
                                    By clicking Checkout, you agree to our Terms of Service and acknowledge our privacy policy.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
