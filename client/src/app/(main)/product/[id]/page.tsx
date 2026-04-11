"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, ShieldCheck, Truck, RefreshCcw, Minus, Plus } from "lucide-react";
import { useGetProductQuery } from "@/features/product/product.api";
import { useAddItemMutation } from "@/features/cart/cart.api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ProductPageProps {
    params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
    const { id } = use(params);
    const router = useRouter();
    const { data, isLoading, isError } = useGetProductQuery(id);
    const [addItem, { isLoading: isAdding }] = useAddItemMutation();
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);

    const product = data?.data?.product;
    const images = product?.images || [];
    const mainImage = images[selectedImage] || "/images/placeholder.png";

    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat("en-PH", {
            style: "currency",
            currency: "PHP",
        }).format(amount);
    };

    const handleAddToCart = async () => {
        if (!product) return;
        try {
            await addItem({ productId: product.id, quantity }).unwrap();
            toast.success("Added to cart!", {
                description: `${quantity}x ${product.name} added to your cart.`,
            });
        } catch (err: unknown) {
            const error = err as { status?: number; data?: { message?: string } };
            if (error.status === 401) {
                toast.error("Please login first", {
                    description: "You need to be logged in to add items to your cart.",
                });
                router.push("/login");
            } else {
                toast.error("Failed to add to cart", {
                    description: error?.data?.message || "Something went wrong. Please try again.",
                });
            }
        }
    };

    const handleBuyNow = async () => {
        if (!product) return;
        try {
            await addItem({ productId: product.id, quantity }).unwrap();
            router.push("/cart");
        } catch {
            handleAddToCart();
        }
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <Skeleton className="aspect-square w-full rounded-xl" />
                    <div className="space-y-6">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-3/4" />
                        <Skeleton className="h-8 w-1/3" />
                        <Skeleton className="h-24 w-full" />
                        <div className="flex gap-4">
                            <Skeleton className="h-12 w-32" />
                            <Skeleton className="h-12 w-full" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (isError || !product) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
                <p className="text-gray-600 mb-8">The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
                <Button asChild>
                    <Link href="/">Back to Home</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            <div className="container mx-auto px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left: Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square relative rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm group">
                            <Image
                                src={mainImage}
                                alt={product.name}
                                fill
                                unoptimized
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority
                            />
                        </div>
                        
                        {images.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={cn(
                                            "relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all",
                                            selectedImage === idx ? "border-shopee shadow-sm" : "border-transparent hover:border-gray-200"
                                        )}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${product.name} view ${idx + 1}`}
                                            fill
                                            unoptimized
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Product Info */}
                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Badge variant="secondary" className="bg-shopee/10 text-shopee border-none hover:bg-shopee/15 font-semibold px-3 py-1 text-[10px] uppercase tracking-wider">
                                    {product.category?.name || "Official Store"}
                                </Badge>
                                <div className="flex items-center gap-1 text-amber-400 ml-2">
                                    <Star size={14} fill="currentColor" />
                                    <Star size={14} fill="currentColor" />
                                    <Star size={14} fill="currentColor" />
                                    <Star size={14} fill="currentColor" />
                                    <Star size={14} fill="currentColor" className="text-gray-200" />
                                    <span className="text-xs text-gray-500 font-medium ml-1">4.8 (124 reviews)</span>
                                </div>
                            </div>
                            
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                                {product.name}
                            </h1>
                            
                            <div className="flex items-center gap-4 py-4 px-6 bg-gray-50 rounded-xl my-6">
                                <span className="text-3xl font-bold text-shopee">
                                    {formatPrice(product.price)}
                                </span>
                                <span className="text-sm text-gray-400 line-through">
                                    {formatPrice(product.price * 1.2)}
                                </span>
                                <Badge className="bg-shopee text-white border-none text-[10px] font-bold">
                                    20% OFF
                                </Badge>
                            </div>

                            <p className="text-gray-600 leading-relaxed text-lg font-light">
                                {product.description}
                            </p>
                        </div>

                        {/* Quantity Selector */}
                        <div className="space-y-4 pt-6 border-t border-gray-100">
                            <span className="text-sm font-semibold text-gray-900 block uppercase tracking-wide">Quantity</span>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                                    <button 
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-3 hover:bg-gray-50 transition-colors text-gray-500"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="w-12 text-center font-semibold text-gray-900">{quantity}</span>
                                    <button 
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="p-3 hover:bg-gray-50 transition-colors text-gray-500"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                                <span className="text-sm text-gray-400">
                                    {product.stock} pieces available
                                </span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button 
                                variant="outline" 
                                size="lg" 
                                className="flex-1 h-14 border-shopee/30 text-shopee hover:bg-shopee/5 text-lg font-semibold gap-2 border-2"
                                onClick={handleAddToCart}
                                disabled={isAdding}
                            >
                                <ShoppingCart size={20} />
                                {isAdding ? "Adding..." : "Add to Cart"}
                            </Button>
                            <Button 
                                size="lg" 
                                className="flex-1 h-14 bg-shopee hover:bg-shopee/90 text-white text-lg font-semibold transition-all shadow-lg shadow-shopee/20"
                                onClick={handleBuyNow}
                                disabled={isAdding}
                            >
                                Buy Now
                            </Button>
                        </div>

                        {/* Extra Info Perks */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                    <ShieldCheck size={20} />
                                </div>
                                <div className="text-xs">
                                    <p className="font-bold text-gray-900">Shopsphere Mall</p>
                                    <p className="text-gray-500">100% Authentic</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                                    <RefreshCcw size={20} />
                                </div>
                                <div className="text-xs">
                                    <p className="font-bold text-gray-900">15 Days Return</p>
                                    <p className="text-gray-500">Change of mind</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                    <Truck size={20} />
                                </div>
                                <div className="text-xs">
                                    <p className="font-bold text-gray-900">Free Shipping</p>
                                    <p className="text-gray-500">Special voucher</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
