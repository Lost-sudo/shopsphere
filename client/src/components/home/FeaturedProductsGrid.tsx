"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Loader2 } from "lucide-react";
import { useGetProductsQuery } from "@/features/product/product.api";
import type { Product } from "@/features/product/product.types";

const aspectRatios = ["aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[3/4]"];

function formatPrice(price: number): string {
    return new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
    }).format(price);
}

function ProductCard({ product, index }: { product: Product; index: number }) {
    const image = product.images?.[0] || "/images/placeholder.png";
    const aspectRatio = aspectRatios[index % aspectRatios.length];

    return (
        <div className="break-inside-avoid">
            <div className="group relative overflow-hidden rounded-2xl bg-neutral-100">
                <div className={`relative w-full ${aspectRatio}`}>
                    <Image
                        src={image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>

                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link
                        href={`/product/${product.id}`}
                        className="bg-white/90 text-luxury-charcoal px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest hover:bg-luxury-charcoal hover:text-white transition-colors"
                    >
                        Quick View
                    </Link>
                </div>

                <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/50 backdrop-blur-md flex items-center justify-center text-luxury-charcoal hover:bg-white hover:text-luxury-gold transition-colors opacity-0 group-hover:opacity-100 shadow-sm">
                    <Heart className="w-5 h-5" />
                </button>
            </div>

            <div className="mt-4 px-2">
                <h3 className="text-sm font-medium text-luxury-charcoal">{product.name}</h3>
                <p className="text-sm text-neutral-500 mt-1">{formatPrice(product.price)}</p>
            </div>
        </div>
    );
}

export function FeaturedProductsGrid() {
    const { data, isLoading, isError } = useGetProductsQuery({ limit: 8, isActive: true });

    const products = data?.data?.products ?? [];

    return (
        <section className="py-24 px-4 container mx-auto max-w-7xl">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-light text-luxury-charcoal tracking-tight">
                    Featured <span className="font-serif italic text-luxury-gold">Pieces</span>
                </h2>
                <p className="text-neutral-500 mt-4 font-medium tracking-wide max-w-xl mx-auto">
                    Explore our latest arrivals, crafted with precision and designed to elevate your personal style.
                </p>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-luxury-gold" />
                </div>
            ) : isError ? (
                <div className="text-center py-20 text-neutral-500">
                    <p>Unable to load products. Please try again later.</p>
                </div>
            ) : products.length === 0 ? (
                <div className="text-center py-20 text-neutral-500">
                    <p>No products available yet. Check back soon!</p>
                </div>
            ) : (
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                    {products.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                    ))}
                </div>
            )}

            <div className="mt-16 text-center">
                <Link
                    href="/shop"
                    className="inline-block border border-luxury-charcoal text-luxury-charcoal px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-widest hover:bg-luxury-charcoal hover:text-white transition-colors"
                >
                    View All Products
                </Link>
            </div>
        </section>
    );
}
