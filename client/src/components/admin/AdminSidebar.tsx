"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
    LayoutDashboard, 
    ShoppingBag, 
    Users, 
    Settings, 
    BarChart3, 
    Package, 
    LogOut,
    Menu,
    ChevronLeft,
    Store
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLogoutMutation } from "@/features/auth/auth.api";
import { useDispatch } from "react-redux";
import { clearUser } from "@/features/auth/auth.slice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const sidebarLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);
    const [logout] = useLogoutMutation();
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logout().unwrap();
            dispatch(clearUser());
            toast.success("Successfully logged out");
            router.push("/login");
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Logout failed. Please try again.");
        }
    };

    return (
        <aside 
            className={cn(
                "sticky top-0 h-screen transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] z-50",
                collapsed ? "w-24" : "w-72"
            )}
        >
            <div className="relative flex flex-col h-full m-4 bg-white/60 backdrop-blur-2xl border border-white/40 rounded-[2.5rem] shadow-2xl shadow-black/5">
                {/* Header */}
                <div className="flex items-center justify-center p-6 h-24 border-b border-black/5">
                    <Link href="/" className={cn(
                        "flex items-center gap-3 group transition-all duration-500",
                        collapsed ? "justify-center" : "justify-start w-full"
                    )}>
                        <div className="w-10 h-10 bg-luxury-charcoal rounded-xl flex items-center justify-center shadow-lg shadow-black/10 transition-transform group-hover:scale-110 shrink-0">
                            <Store className="w-6 h-6 text-white" />
                        </div>
                        {!collapsed && (
                            <span className="font-serif italic text-xl text-luxury-charcoal tracking-tight whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-500">
                                Shop<span className="text-luxury-gold">Sphere</span>
                            </span>
                        )}
                    </Link>
                </div>

                {/* Collapse Toggle */}
                <button 
                    onClick={() => setCollapsed(!collapsed)}
                    className="absolute -right-3 top-20 w-8 h-8 bg-luxury-charcoal text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all z-50 border-4 border-white/40"
                >
                    {collapsed ? <Menu size={14} /> : <ChevronLeft size={14} />}
                </button>

                {/* Links */}
                <nav className="flex-1 p-3 space-y-3 overflow-y-auto scrollbar-hide mt-4">
                    {sidebarLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                title={collapsed ? link.name : ""}
                                className={cn(
                                    "flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group relative",
                                    collapsed ? "justify-center" : "justify-start",
                                    isActive 
                                        ? "bg-luxury-charcoal text-white shadow-xl shadow-black/10" 
                                        : "text-neutral-500 hover:text-luxury-charcoal hover:bg-white/40"
                                )}
                            >
                                <Icon className={cn(
                                    "w-5 h-5 shrink-0 transition-all duration-300",
                                    isActive ? "text-luxury-gold scale-110" : "group-hover:text-luxury-gold group-hover:scale-110"
                                )} />
                                {!collapsed && (
                                    <span className={cn(
                                        "text-[10px] font-bold uppercase tracking-widest transition-all",
                                        isActive ? "translate-x-1" : "group-hover:translate-x-1"
                                    )}>
                                        {link.name}
                                    </span>
                                )}
                                {isActive && !collapsed && (
                                    <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-luxury-gold animate-pulse" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="p-3 border-t border-black/5">
                    <button 
                        onClick={handleLogout}
                        className={cn(
                            "flex items-center gap-4 p-4 w-full rounded-2xl transition-all duration-300 group text-neutral-500 hover:text-red-500 hover:bg-red-50/50",
                            collapsed ? "justify-center" : "justify-start"
                        )}
                    >
                        <LogOut className="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" />
                        {!collapsed && <span className="text-[10px] font-bold uppercase tracking-widest">Logout</span>}
                    </button>
                </div>
            </div>
        </aside>
    );
}


