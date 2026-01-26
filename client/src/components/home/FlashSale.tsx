"use client";

import Link from "next/link";
import { ChevronRight, Zap } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { useEffect, useState } from "react";

export function FlashSale() {
    const [timeLeft, setTimeLeft] = useState({
        hours: 2,
        minutes: 45,
        seconds: 30,
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev.seconds > 0)
                    return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0)
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0)
                    return {
                        ...prev,
                        hours: prev.hours - 1,
                        minutes: 59,
                        seconds: 59,
                    };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const flashSaleProducts = [
        {
            id: "1",
            name: "Premium Titanium Smartphone - Latest Model",
            price: 899,
            originalPrice: 1299,
            image: "/images/products/smartphone.png",
            rating: 4.9,
            soldCount: 156,
            discount: 30,
            isFlashSale: true,
        },
        {
            id: "2",
            name: "Luxury Smartwatch with Leather Strap",
            price: 249,
            originalPrice: 499,
            image: "/images/products/watch.png",
            rating: 4.8,
            soldCount: 89,
            discount: 50,
            isFlashSale: true,
        },
        {
            id: "3",
            name: "Wireless Noise-Canceling Headphones",
            price: 199,
            originalPrice: 349,
            image: "/images/products/headphones.png",
            rating: 4.7,
            soldCount: 234,
            discount: 43,
            isFlashSale: true,
        },
        // Repeat for grid
        {
            id: "4",
            name: "Premium Titanium Smartphone - Latest Model",
            price: 899,
            originalPrice: 1299,
            image: "/images/products/smartphone.png",
            rating: 4.9,
            soldCount: 156,
            discount: 30,
            isFlashSale: true,
        },
        {
            id: "5",
            name: "Luxury Smartwatch with Leather Strap",
            price: 249,
            originalPrice: 499,
            image: "/images/products/watch.png",
            rating: 4.8,
            soldCount: 89,
            discount: 50,
            isFlashSale: true,
        },
        {
            id: "6",
            name: "Wireless Noise-Canceling Headphones",
            price: 199,
            originalPrice: 349,
            image: "/images/products/headphones.png",
            rating: 4.7,
            soldCount: 234,
            discount: 43,
            isFlashSale: true,
        },
    ];

    return (
        <section className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-sm shadow-sm overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Zap
                                className="text-shopee fill-shopee"
                                size={24}
                            />
                            <h2 className="text-shopee text-xl font-bold italic tracking-tight uppercase">
                                Flash Sale
                            </h2>
                        </div>
                        <div className="flex items-center gap-1.5 ml-4">
                            <span className="bg-black text-white text-sm font-bold px-1.5 py-0.5 rounded-sm w-7 text-center">
                                {timeLeft.hours.toString().padStart(2, "0")}
                            </span>
                            <span className="font-bold">:</span>
                            <span className="bg-black text-white text-sm font-bold px-1.5 py-0.5 rounded-sm w-7 text-center">
                                {timeLeft.minutes.toString().padStart(2, "0")}
                            </span>
                            <span className="font-bold">:</span>
                            <span className="bg-black text-white text-sm font-bold px-1.5 py-0.5 rounded-sm w-7 text-center">
                                {timeLeft.seconds.toString().padStart(2, "0")}
                            </span>
                        </div>
                    </div>
                    <Link
                        href="/flash-sale"
                        className="text-shopee text-sm flex items-center gap-1 hover:underline"
                    >
                        See All <ChevronRight size={16} />
                    </Link>
                </div>

                {/* Products Grid */}
                <div className="p-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {flashSaleProducts.map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
