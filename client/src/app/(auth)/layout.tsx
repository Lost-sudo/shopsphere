"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen bg-neutral-50 relative selection:bg-luxury-gold/20">
            {/* Soft Ambient Background Elements for full layout */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-luxury-gold/5 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-neutral-200/50 blur-[100px]" />
            </div>

            {/* Auth Header - Glass Floating Bar */}
            <header className="fixed top-0 w-full z-50 bg-white/40 backdrop-blur-xl border-b border-white/20 transition-all duration-300">
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="flex items-center gap-3 group transition-opacity hover:opacity-80"
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-extrabold tracking-tight text-luxury-charcoal">
                                    ShopSphere
                                </span>
                            </div>
                            <div className="h-5 w-px bg-neutral-300 hidden md:block" />
                            <h1 className="text-sm font-medium tracking-wide uppercase text-neutral-500 hidden md:block">
                                Authentication
                            </h1>
                        </Link>
                    </div>
                    <Link
                        href="/help"
                        className="text-xs uppercase tracking-widest text-neutral-500 hover:text-luxury-charcoal transition-colors font-medium"
                    >
                        Need help?
                    </Link>
                </div>
            </header>

            {/* Auth Content - Elevated Z-index to sit above ambient bg */}
            <main className="grow flex items-center justify-center pt-28 pb-16 px-4 relative z-10">
                <div className="container mx-auto w-full max-w-[1200px]">{children}</div>
            </main>

            {/* Minimal Footer for Auth */}
            <footer className="relative z-10 py-8 border-t border-black/5 backdrop-blur-sm bg-white/30">
                <div className="container mx-auto px-4 text-center text-xs tracking-wide text-neutral-500">
                    <p className="font-medium">
                        © 2026 ShopSphere. All Rights Reserved.
                    </p>
                    <div className="mt-3 flex justify-center gap-6">
                        <Link
                            href="/privacy"
                            className="hover:text-luxury-charcoal transition-colors font-medium uppercase"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms"
                            className="hover:text-luxury-charcoal transition-colors font-medium uppercase"
                        >
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
