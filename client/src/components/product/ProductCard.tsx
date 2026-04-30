"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAddItemMutation } from "@/features/cart/cart.api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating: number;
    soldCount: number;
    discount?: number;
    isFlashSale?: boolean;
    stock: number;
    hasVariants?: boolean;
}

export function ProductCard({
    id,
    name,
    price,
    originalPrice,
    image,
    rating,
    soldCount,
    discount,
    isFlashSale,
    stock,
    hasVariants = false,
}: ProductCardProps) {
    const router = useRouter();
    const [addItem, { isLoading: isAdding }] = useAddItemMutation();

    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat("en-PH", {
            style: "currency",
            currency: "PHP",
        }).format(amount);
    };

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (hasVariants) {
            router.push(`/product/${id}`);
            return;
        }
        
        try {
            await addItem({ productId: id, quantity: 1 }).unwrap();
            toast.success("Added to cart!", {
                description: `${name} has been added to your cart.`,
            });
        } catch (err: unknown) {
            const error = err as { status?: number; data?: { message?: string } };
            if (error.status === 401) {
                toast.error("Please login first");
                router.push("/login");
            } else {
                toast.error("Failed to add to cart", {
                    description: error?.data?.message || "Insufficient stock"
                });
            }
        }
    };

    return (
        <Link href={`/product/${id}`} className="block group">
            <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 bg-white relative">
                {discount && (
                    <div className="absolute top-0 right-0 z-10 bg-yellow-300 text-shopee text-[10px] font-bold px-1.5 py-1 rounded-bl-sm">
                        {discount}% <br /> OFF
                    </div>
                )}

                <div className="aspect-square relative overflow-hidden bg-gray-100">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        unoptimized
                        className={cn(
                            "object-cover group-hover:scale-105 transition-transform duration-500",
                            stock <= 0 && "grayscale opacity-60"
                        )}
                    />
                    {isFlashSale && stock > 0 && (
                        <div className="absolute bottom-0 left-0 w-full bg-shopee/90 text-white text-[10px] font-bold py-1 px-2 flex items-center gap-1">
                            <span className="animate-pulse">🔥</span> FLASH SALE
                        </div>
                    )}
                    {stock <= 0 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
                            <div className="bg-white/90 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-neutral-500 border border-black/5 shadow-xl">
                                Sold Out
                            </div>
                        </div>
                    )}
                </div>

                <CardContent className="p-2.5">
                    <h3 className="text-xs text-gray-800 line-clamp-2 min-h-[32px] mb-2 group-hover:text-shopee transition-colors">
                        {name}
                    </h3>

                    <div className="flex items-baseline gap-1.5 mb-2">
                        <span className="text-shopee font-medium text-base">
                            {formatPrice(price)}
                        </span>
                        {originalPrice && (
                            <span className="text-[10px] text-gray-400 line-through">
                                {formatPrice(originalPrice)}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-1">
                            <div className="flex items-center text-yellow-400">
                                <Star size={10} fill="currentColor" />
                                <span className="text-[10px] text-gray-600 ml-0.5">
                                    {rating}
                                </span>
                            </div>
                            <div className="w-px h-2 bg-gray-200" />
                            <span className="text-[10px] text-gray-500">
                                {soldCount} sold
                            </span>
                        </div>

                        <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 rounded-full text-shopee hover:bg-shopee/10 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                            onClick={handleAddToCart}
                            disabled={isAdding || stock <= 0}
                            title={hasVariants ? "Select options" : stock <= 0 ? "Out of stock" : "Add to cart"}
                        >
                            <ShoppingCart size={14} />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
