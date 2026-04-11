"use client";

import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

export function HeroSection() {
    const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

    const banners = [
        {
            id: 1,
            image: "/images/banners/banner-1.png",
            title: "Premium Collection",
            subtitle: "Discover the latest in fashion and tech",
        },
        {
            id: 2,
            image: "/images/banners/banner-2.png",
            title: "Tech Revolution",
            subtitle: "Future forward gadgets at your fingertips",
        },
    ];

    return (
        <section className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 h-[400px]">
                {/* Main Carousel */}
                <div className="lg:col-span-2 h-full rounded-sm overflow-hidden shadow-sm animate-in fade-in slide-in-from-left-8 duration-1000">
                    <Carousel
                        plugins={[plugin.current]}
                        className="w-full h-full group"
                        onMouseEnter={plugin.current.stop}
                        onMouseLeave={plugin.current.reset}
                    >
                        <CarouselContent className="h-[400px]">
                            {banners.map((banner) => (
                                <CarouselItem
                                    key={banner.id}
                                    className="relative h-full"
                                >
                                    <Image
                                        src={banner.image}
                                        alt={banner.title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/20 to-transparent flex flex-col justify-center px-12 text-white">
                                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 [animation-delay:400ms]">
                                            <h2 className="text-5xl font-extrabold mb-3 tracking-tight">
                                                {banner.title}
                                            </h2>
                                            <p className="text-xl opacity-90 font-medium max-w-md">
                                                {banner.subtitle}
                                            </p>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CarouselNext className="right-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Carousel>
                </div>

                {/* Side Banners */}
                <div className="hidden lg:flex flex-col gap-2 h-full">
                    <div className="flex-1 relative rounded-sm overflow-hidden shadow-sm group animate-in fade-in slide-in-from-right-8 duration-700 [animation-delay:200ms]">
                        <Image
                            src="/images/banners/banner-1.png"
                            alt="Side Banner 1"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-white font-bold border-2 border-white px-4 py-2 uppercase tracking-wider scale-95 group-hover:scale-100 transition-transform">Shop Now</span>
                        </div>
                    </div>
                    <div className="flex-1 relative rounded-sm overflow-hidden shadow-sm group animate-in fade-in slide-in-from-right-8 duration-700 [animation-delay:400ms]">
                        <Image
                            src="/images/banners/banner-2.png"
                            alt="Side Banner 2"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-white font-bold border-2 border-white px-4 py-2 uppercase tracking-wider scale-95 group-hover:scale-100 transition-transform">Explore</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
