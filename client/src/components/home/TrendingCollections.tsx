"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { useGetCategoriesQuery } from "@/features/category/category.api";

const collectionConfig = [
    {
        name: "Summer Drop",
        image: "/images/home/trending_summer.png",
        span: "md:col-span-2 md:row-span-2",
    },
    {
        name: "Streetwear",
        image: "/images/home/trending_streetwear.png",
        span: "md:col-span-1 md:row-span-1",
    },
    {
        name: "Minimal Luxe",
        image: "/images/home/trending_minimal.png",
        span: "md:col-span-1 md:row-span-1",
    },
];

export function TrendingCollections() {
    const { data: categoriesData, isLoading } = useGetCategoriesQuery();

    const collections = collectionConfig.map((config) => {
        const category = categoriesData?.data?.categories?.find(
            (c) => c.name === config.name,
        );
        return {
            ...config,
            id: category?.id,
            href: category ? `/shop?category=${category.id}` : "#",
        };
    });

    return (
        <section className="py-24 px-4 container mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                <div>
                    <h2 className="text-3xl md:text-4xl font-light text-luxury-charcoal tracking-tight">
                        Trending <span className="font-serif italic text-luxury-gold">Collections</span>
                    </h2>
                    <p className="text-neutral-500 mt-3 font-medium tracking-wide">
                        Curated selections for the season
                    </p>
                </div>
                <Link
                    href="/shop"
                    className="group flex items-center gap-2 text-sm uppercase tracking-widest font-semibold text-luxury-charcoal hover:text-luxury-gold transition-colors mt-6 md:mt-0"
                >
                    View All
                    <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-luxury-gold" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[300px]">
                    {collections.map((collection) => (
                        <Link
                            key={collection.name}
                            href={collection.href}
                            className={`group relative overflow-hidden rounded-2xl block ${collection.span}`}
                        >
                            <div className="absolute inset-0 bg-neutral-200">
                                <Image
                                    src={collection.image}
                                    alt={collection.name}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                            </div>
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="absolute bottom-0 left-0 p-8 w-full flex items-end justify-between">
                                <h3 className="text-2xl md:text-3xl font-light text-white tracking-wide">
                                    {collection.name}
                                </h3>
                                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                    <ArrowUpRight className="w-5 h-5" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
}
