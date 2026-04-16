"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { User, Package, MapPin, UserCircle } from "lucide-react";
import { RootState } from "@/lib/store";
import { cn } from "@/lib/utils";

const sidebarLinks = [
    {
        title: "My Account",
        href: "/user/profile",
        icon: UserCircle,
    },
    {
        title: "My Purchase",
        href: "/user/purchase",
        icon: Package,
    },
    {
        title: "Addresses",
        href: "/user/address",
        icon: MapPin,
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
        <div className="bg-[#f5f5f5] min-h-screen pt-5 pb-10">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Sidebar */}
                    <aside className="w-full md:w-48 shrink-0">
                        <div className="flex items-center gap-3 mb-6 px-1">
                            <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                                <User className="text-gray-400" size={24} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-semibold truncate leading-tight">
                                    {displayName}
                                </p>
                                <Link 
                                    href="/user/profile" 
                                    className="text-xs text-gray-500 hover:text-shopee flex items-center gap-1 mt-1"
                                >
                                    <UserCircle size={12} />
                                    Edit Profile
                                </Link>
                            </div>
                        </div>

                        <nav className="flex flex-col gap-1">
                            {sidebarLinks.map((link) => {
                                const Icon = link.icon;
                                const isActive = pathname === link.href;
                                
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm transition-colors",
                                            isActive 
                                                ? "text-shopee font-medium" 
                                                : "text-gray-700 hover:text-shopee"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-5 h-5 flex items-center justify-center",
                                            isActive ? "text-shopee" : "text-blue-600"
                                        )}>
                                            <Icon size={18} />
                                        </div>
                                        <span>{link.title}</span>
                                    </Link>
                                );
                            })}
                        </nav>
                    </aside>

                    {/* Main Content Area */}
                    <main className="flex-1 bg-white rounded-sm shadow-sm border border-gray-100 min-h-[500px]">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
