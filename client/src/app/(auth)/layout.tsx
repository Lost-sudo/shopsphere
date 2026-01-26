"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen bg-zinc-50">
            {/* Auth Header */}
            <header className="bg-white py-6 shadow-sm border-b border-gray-100">
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="flex items-center gap-4 group transition-transform active:scale-95"
                        >
                            <div className="flex items-center gap-2">
                                <div className="bg-shopee p-1.5 rounded-sm shadow-sm ring-1 ring-black/5">
                                    <ShoppingCart
                                        className="text-white"
                                        size={24}
                                    />
                                </div>
                                <span className="text-2xl font-bold tracking-tight text-shopee">
                                    ShopSphere
                                </span>
                            </div>
                            <div className="h-6 w-px bg-gray-200 hidden md:block" />
                            <h1 className="text-xl font-semibold text-gray-800 hidden md:block">
                                Authentication
                            </h1>
                        </Link>
                    </div>
                    <Link
                        href="/help"
                        className="text-sm text-gray-600 hover:text-shopee transition-colors font-medium border-b border-transparent hover:border-shopee"
                    >
                        Need help?
                    </Link>
                </div>
            </header>

            {/* Auth Content - Neutral background for better focus */}
            <main className="grow flex items-center justify-center py-16 px-4">
                <div className="container mx-auto">{children}</div>
            </main>

            {/* Minimal Footer for Auth */}
            <footer className="bg-white py-12 border-t border-gray-200">
                <div className="container mx-auto px-4 text-center text-[13px] text-gray-700">
                    <p className="font-medium">
                        © 2024 ShopSphere. All Rights Reserved.
                    </p>
                    <div className="mt-4 flex justify-center gap-8">
                        <Link
                            href="/privacy"
                            className="hover:text-shopee transition-colors font-medium"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms"
                            className="hover:text-shopee transition-colors font-medium"
                        >
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
