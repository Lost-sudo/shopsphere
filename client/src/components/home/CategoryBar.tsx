"use client";

import Link from "next/link";
import {
    Smartphone,
    Tv,
    Watch,
    Camera,
    Headphones,
    Laptop,
    Shirt,
    Home,
    Zap,
    Heart,
} from "lucide-react";

export function CategoryBar() {
    const categories = [
        { name: "Electronics", icon: Smartphone, color: "bg-blue-50" },
        { name: "Computers", icon: Laptop, color: "bg-indigo-50" },
        { name: "Fashion", icon: Shirt, color: "bg-pink-50" },
        { name: "Home & Living", icon: Home, color: "bg-green-50" },
        { name: "Smartphones", icon: Zap, color: "bg-orange-50" },
        { name: "Accessories", icon: Watch, color: "bg-purple-50" },
        { name: "Audio", icon: Headphones, color: "bg-cyan-50" },
        { name: "Cameras", icon: Camera, color: "bg-red-50" },
        { name: "Appliances", icon: Tv, color: "bg-yellow-50" },
        { name: "Beauty", icon: Heart, color: "bg-rose-50" },
    ];

    return (
        <section className="bg-white border-b border-gray-100">
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-gray-500 text-sm font-semibold mb-6 uppercase tracking-wider">
                    Categories
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-4">
                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            href={`/category/${category.name.toLowerCase()}`}
                            className="flex flex-col items-center gap-3 group"
                        >
                            <div
                                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg ${category.color}`}
                            >
                                <category.icon
                                    className="text-gray-700 group-hover:text-shopee transition-colors"
                                    size={24}
                                />
                            </div>
                            <span className="text-[11px] font-medium text-gray-600 group-hover:text-shopee text-center leading-tight">
                                {category.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
