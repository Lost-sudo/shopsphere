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
    X,
    Store
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const sidebarLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside 
            className={cn(
                "sticky top-0 h-screen transition-all duration-300 ease-in-out border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 z-50",
                collapsed ? "w-20" : "w-64"
            )}
        >
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 h-16 border-b border-slate-200 dark:border-slate-800">
                    {!collapsed && (
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-indigo-600 dark:text-indigo-400">
                            <Store className="w-8 h-8" />
                            <span>ShopSphere</span>
                        </Link>
                    )}
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => setCollapsed(!collapsed)}
                        className="ml-auto"
                    >
                        {collapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
                    </Button>
                </div>

                {/* Links */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {sidebarLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group",
                                    isActive 
                                        ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400" 
                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                                )}
                            >
                                <Icon className={cn(
                                    "w-5 h-5 shrink-0 transition-transform group-hover:scale-110",
                                    isActive && "text-indigo-600 dark:text-indigo-400"
                                )} />
                                {!collapsed && <span className="font-medium">{link.name}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-800 gap-2 flex flex-col">
                    <button 
                        className={cn(
                            "flex items-center gap-3 px-3 py-2 w-full text-slate-600 dark:text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors group"
                        )}
                    >
                        <LogOut className="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" />
                        {!collapsed && <span className="font-medium">Logout</span>}
                    </button>
                    {/* Removed Upgrade to Pro section */}
                </div>
            </div>
        </aside>
    );
}
