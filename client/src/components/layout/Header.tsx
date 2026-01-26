"use client";

import Link from "next/link";
import { Search, ShoppingCart, Bell, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Header() {
    return (
        <header className="w-full bg-shopee text-white">
            {/* Top Bar */}
            <div className="container mx-auto px-4 py-1.5 flex justify-between items-center text-xs font-medium">
                <div className="flex gap-4">
                    <Link
                        href="/seller"
                        className="hover:text-white/80 transition-colors"
                    >
                        Seller Centre
                    </Link>
                    <Link
                        href="/download"
                        className="hover:text-white/80 transition-colors"
                    >
                        Download
                    </Link>
                    <div className="flex gap-2 items-center">
                        <span>Follow us on</span>
                        {/* Social Icons would go here */}
                    </div>
                </div>
                <div className="flex gap-4 items-center">
                    <Link
                        href="/notifications"
                        className="flex items-center gap-1 hover:text-white/80 transition-colors"
                    >
                        <Bell size={14} />
                        Notifications
                    </Link>
                    <Link
                        href="/help"
                        className="flex items-center gap-1 hover:text-white/80 transition-colors"
                    >
                        <HelpCircle size={14} />
                        Help
                    </Link>
                    <div className="flex gap-3 font-medium">
                        <Link
                            href="/register"
                            className="hover:text-white/80 transition-colors border-r border-white/20 pr-3"
                        >
                            Sign Up
                        </Link>
                        <Link
                            href="/login"
                            className="hover:text-white/80 transition-colors"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="container mx-auto px-4 pt-4 pb-7 flex items-center justify-between gap-4 md:gap-8">
                {/* Logo - Stable sizing */}
                <Link
                    href="/"
                    className="flex items-center gap-2 shrink-0 min-w-[120px] md:min-w-[150px]"
                >
                    <div className="bg-white p-1 rounded-sm shadow-sm ring-1 ring-black/5">
                        <ShoppingCart className="text-shopee" size={24} />
                    </div>
                    <span className="text-xl md:text-2xl font-bold tracking-tight">
                        ShopSphere
                    </span>
                </Link>

                {/* Search Bar - Flexible and Centered */}
                <div className="flex-1 max-w-2xl relative">
                    <div className="flex bg-white rounded-sm overflow-hidden p-1 shadow-md ring-1 ring-black/5">
                        <Input
                            placeholder="Search for products, brands and shops"
                            className="flex-1 border-none focus-visible:ring-0 text-gray-900 h-10 placeholder:text-gray-400 placeholder:text-sm bg-transparent"
                        />
                        <Button className="bg-shopee hover:bg-shopee-dark h-10 px-6 rounded-sm shrink-0">
                            <Search size={18} />
                        </Button>
                    </div>
                    {/* Popular Search Terms */}
                    <div className="absolute -bottom-6 left-1 flex gap-3 text-xs font-light opacity-90 overflow-hidden whitespace-nowrap">
                        <span className="hover:text-white/80 cursor-pointer">
                            Powerbank
                        </span>
                        <span className="hover:text-white/80 cursor-pointer">
                            Wireless Earbuds
                        </span>
                        <span className="hover:text-white/80 cursor-pointer">
                            Gaming Mouse
                        </span>
                        <span className="hover:text-white/80 cursor-pointer">
                            iPhone 15 Case
                        </span>
                    </div>
                </div>

                {/* Cart Area - Right Aligned */}
                <div className="flex items-center justify-end shrink-0 min-w-[60px]">
                    <Link
                        href="/cart"
                        className="relative p-2 group transition-transform active:scale-95"
                    >
                        <ShoppingCart size={28} />
                        <span className="absolute -top-0.5 -right-0.5 bg-white text-shopee text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-shopee shadow-sm">
                            0
                        </span>
                    </Link>
                </div>
            </div>
        </header>
    );
}
