"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
}: ProductCardProps) {
    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat("en-SG", {
            style: "currency",
            currency: "SGD",
        }).format(amount);
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
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {isFlashSale && (
                        <div className="absolute bottom-0 left-0 w-full bg-shopee/90 text-white text-[10px] font-bold py-1 px-2 flex items-center gap-1">
                            <span className="animate-pulse">🔥</span> FLASH SALE
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
                            className="h-7 w-7 rounded-full text-shopee hover:bg-shopee/10 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                                e.preventDefault();
                                // Add to cart logic
                            }}
                        >
                            <ShoppingCart size={14} />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
