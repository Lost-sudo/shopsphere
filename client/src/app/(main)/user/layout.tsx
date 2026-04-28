"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { User, Package, MapPin, UserCircle, Settings, ChevronRight } from "lucide-react";
import { RootState } from "@/lib/store";
import { cn } from "@/lib/utils";

const sidebarLinks = [
    {
        title: "My Profile",
        href: "/user/profile",
        icon: UserCircle,
        description: "Personal Information"
    },
    {
        title: "My Purchase",
        href: "/user/purchase",
        icon: Package,
        description: "Order History"
    },
    {
        title: "Addresses",
        href: "/user/address",
        icon: MapPin,
        description: "Shipping Details"
    },
];

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const user = useSelector((state: RootState) => state.auth.user);

    const displayName = user?.name || user?.email?.split("@")[0] || "User";

    return (
        <div className="relative min-h-screen py-10">
            {/* Global Background Animated Blobs */}
            <div className="fixed top-0 -left-4 w-96 h-96 bg-luxury-gold/10 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob pointer-events-none" />
            <div className="fixed top-20 -right-4 w-96 h-96 bg-neutral-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob [animation-delay:2000ms] pointer-events-none" />
            <div className="fixed bottom-20 left-20 w-96 h-96 bg-stone-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob [animation-delay:4000ms] pointer-events-none" />

            <div className="relative z-10 container mx-auto px-4 max-w-6xl">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-72 shrink-0 animate-fade-up">
                        <div className="bg-white/60 backdrop-blur-2xl border border-white/40 p-6 rounded-3xl shadow-xl shadow-black/5 mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-luxury-charcoal flex items-center justify-center overflow-hidden shrink-0 shadow-lg shadow-black/10 transition-transform hover:scale-105 duration-300">
                                    <User className="text-white" size={28} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">Welcome back,</p>
                                    <p className="text-lg font-serif italic text-luxury-charcoal truncate leading-tight">
                                        {displayName}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <nav className="space-y-3">
                            {sidebarLinks.map((link, index) => {
                                const Icon = link.icon;
                                const isActive = pathname === link.href;
                                
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={cn(
                                            "group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 border animate-fade-up",
                                            isActive 
                                                ? "bg-luxury-charcoal text-white border-luxury-charcoal shadow-xl shadow-black/10 translate-x-2" 
                                                : "bg-white/40 border-white/60 text-neutral-600 hover:bg-white/80 hover:translate-x-1"
                                        )}
                                        style={{ animationDelay: `${(index + 1) * 100}ms` }}
                                    >
                                        <div className={cn(
                                            "w-10 h-10 flex items-center justify-center rounded-xl transition-colors",
                                            isActive ? "bg-white/10 text-luxury-gold" : "bg-white/50 text-luxury-gold group-hover:bg-white/80"
                                        )}>
                                            <Icon size={20} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={cn(
                                                "text-xs font-bold uppercase tracking-widest",
                                                isActive ? "text-white" : "text-luxury-charcoal"
                                            )}>
                                                {link.title}
                                            </p>
                                            <p className={cn(
                                                "text-[10px] font-light mt-0.5",
                                                isActive ? "text-white/60" : "text-neutral-400"
                                            )}>
                                                {link.description}
                                            </p>
                                        </div>
                                        <ChevronRight size={14} className={cn(
                                            "transition-transform",
                                            isActive ? "text-luxury-gold" : "text-neutral-300 group-hover:translate-x-1"
                                        )} />
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="mt-12 p-6 rounded-3xl bg-luxury-gold/5 border border-luxury-gold/10 animate-fade-up [animation-delay:400ms]">
                            <div className="flex items-center gap-2 mb-2">
                                <Settings size={14} className="text-luxury-gold" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-luxury-gold">Preference</span>
                            </div>
                            <p className="text-[10px] text-neutral-500 font-light leading-relaxed">
                                Customize your premium shopping experience in the settings menu.
                            </p>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <main className="flex-1 bg-white/60 backdrop-blur-2xl border border-white/40 rounded-[2.5rem] shadow-2xl shadow-black/5 min-h-[600px] overflow-hidden animate-fade-up [animation-delay:200ms]">
                        <div className="h-full">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

