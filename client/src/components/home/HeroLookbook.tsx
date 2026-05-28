"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { useGetCategoriesQuery } from "@/features/category/category.api";

export function HeroLookbook() {
    const { data: categoriesData, isLoading } = useGetCategoriesQuery();

    const newArrivalsCategory = categoriesData?.data?.categories?.find(
        (c) => c.name === "New Arrivals",
    );

    return (
        <section className="relative h-[85vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/home/hero_lookbook.png"
                    alt="Luxury Fashion Lookbook"
                    fill
                    className="object-cover object-top scale-105 animate-tilt"
                    priority
                />
                {/* Soft Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/40 mix-blend-multiply" />
            </div>

            {/* Content overlay */}
            <div className="relative z-10 text-center flex flex-col items-center px-4 max-w-4xl mx-auto mt-20">
                <span className="text-white/80 uppercase tracking-[0.3em] text-xs font-semibold mb-6 animate-fade-up">
                    Autumn / Winter Collection
                </span>
                <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight mb-8 animate-fade-up [animation-delay:200ms]">
                    Elevate Your <span className="font-serif italic text-luxury-gold-light">Everyday</span>
                </h1>
                <p className="text-lg text-white/90 font-medium max-w-xl mx-auto mb-10 leading-relaxed animate-fade-up [animation-delay:400ms]">
                    Discover curated pieces designed for the modern individual. A seamless blend of comfort, luxury, and timeless aesthetic.
                </p>
                {isLoading ? (
                    <div className="flex items-center justify-center animate-fade-up [animation-delay:600ms]">
                        <Loader2 className="w-6 h-6 animate-spin text-white" />
                    </div>
                ) : (
                    <Link
                        href={newArrivalsCategory ? `/shop?category=${newArrivalsCategory.id}` : "/shop"}
                        className="group inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full text-sm font-semibold tracking-widest uppercase hover:bg-white/20 transition-all duration-500 animate-fade-up [animation-delay:600ms]"
                    >
                        Explore Collection
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                )}
            </div>
            
            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-70">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white font-medium">Scroll to discover</span>
                <div className="w-[1px] h-12 bg-linear-to-b from-white/50 to-transparent" />
            </div>
        </section>
    );
}
