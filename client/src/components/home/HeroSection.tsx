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
                <div className="lg:col-span-2 h-full rounded-sm overflow-hidden shadow-sm">
                    <Carousel
                        plugins={[plugin.current]}
                        className="w-full h-full"
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
                                    <div className="absolute inset-0 bg-linear-to-r from-black/40 to-transparent flex flex-col justify-center px-12 text-white">
                                        <h2 className="text-4xl font-bold mb-2">
                                            {banner.title}
                                        </h2>
                                        <p className="text-lg opacity-90">
                                            {banner.subtitle}
                                        </p>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-4 hidden group-hover:flex" />
                        <CarouselNext className="right-4 hidden group-hover:flex" />
                    </Carousel>
                </div>

                {/* Side Banners */}
                <div className="hidden lg:flex flex-col gap-2 h-full">
                    <div className="flex-1 relative rounded-sm overflow-hidden shadow-sm group">
                        <Image
                            src="/images/banners/banner-1.png"
                            alt="Side Banner 1"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                    </div>
                    <div className="flex-1 relative rounded-sm overflow-hidden shadow-sm group">
                        <Image
                            src="/images/banners/banner-2.png"
                            alt="Side Banner 2"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                    </div>
                </div>
            </div>
        </section>
    );
}
