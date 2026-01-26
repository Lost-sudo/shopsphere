"use client";

import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";

export function RecommendationGrid() {
    const products = [
        {
            id: "r1",
            name: "Premium Titanium Smartphone",
            price: 999,
            image: "/images/products/smartphone.png",
            rating: 4.9,
            soldCount: 1200,
        },
        {
            id: "r2",
            name: "Luxury Leather Smartwatch",
            price: 299,
            image: "/images/products/watch.png",
            rating: 4.8,
            soldCount: 850,
        },
        {
            id: "r3",
            name: "ANC Professional Headphones",
            price: 249,
            image: "/images/products/headphones.png",
            rating: 4.7,
            soldCount: 3400,
        },
        // More mockup products
        {
            id: "r4",
            name: "Premium Titanium Smartphone Blue",
            price: 999,
            image: "/images/products/smartphone.png",
            rating: 4.9,
            soldCount: 1200,
        },
        {
            id: "r5",
            name: "Luxury Metal Smartwatch",
            price: 299,
            image: "/images/products/watch.png",
            rating: 4.8,
            soldCount: 850,
        },
        {
            id: "r6",
            name: "Budget Bluetooth Headphones",
            price: 49,
            image: "/images/products/headphones.png",
            rating: 4.5,
            soldCount: 3400,
        },
        {
            id: "r7",
            name: "Flagship Smartphone Case",
            price: 19,
            image: "/images/products/smartphone.png",
            rating: 4.9,
            soldCount: 1200,
        },
        {
            id: "r8",
            name: "Sport Smartwatch Pro",
            price: 159,
            image: "/images/products/watch.png",
            rating: 4.8,
            soldCount: 850,
        },
        {
            id: "r9",
            name: "Studio Monitor Headphones",
            price: 149,
            image: "/images/products/headphones.png",
            rating: 4.7,
            soldCount: 3400,
        },
        {
            id: "r10",
            name: "Premium Titanium Smartphone Carbon",
            price: 1049,
            image: "/images/products/smartphone.png",
            rating: 4.9,
            soldCount: 1200,
        },
        {
            id: "r11",
            name: "Elite Smartwatch Gold Edition",
            price: 599,
            image: "/images/products/watch.png",
            rating: 4.8,
            soldCount: 850,
        },
        {
            id: "r12",
            name: "Compact Wireless Earbuds",
            price: 79,
            image: "/images/products/headphones.png",
            rating: 4.7,
            soldCount: 3400,
        },
    ];

    return (
        <section className="container mx-auto px-4 py-8">
            <div className="sticky top-0 z-20 bg-gray-50/80 backdrop-blur-sm pt-4 pb-4 border-b-2 border-shopee mb-6">
                <h2 className="text-shopee text-center text-lg font-bold uppercase tracking-wider">
                    Daily Discover
                </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {products.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>

            <div className="flex justify-center mt-12">
                <Button
                    variant="outline"
                    className="px-12 py-6 border-gray-300 hover:bg-gray-100 text-gray-600 transition-all font-light"
                >
                    See More
                </Button>
            </div>
        </section>
    );
}
