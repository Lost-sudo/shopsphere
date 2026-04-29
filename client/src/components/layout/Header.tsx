"use client";

import Link from "next/link";
import {
    Search,
    ShoppingCart,
    User,
    LogOut,
    UserCircle,
    LayoutDashboard,
    Package,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { useLogoutMutation } from "@/features/auth/auth.api";
import { clearUser } from "@/features/auth/auth.slice";
import { useRouter } from "next/navigation";
import { useGetCartQuery } from "@/features/cart/cart.api";
import { useEffect, useState } from "react";

export function Header() {
    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector((state: RootState) => state.auth.user);
    const [logout] = useLogoutMutation();
    const { data: cartData } = useGetCartQuery(undefined, {
        skip: !user,
    });

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = async () => {
        try {
            await logout().unwrap();
            dispatch(clearUser());
            router.push("/");
        } catch (error) {
            console.error("Failed to logout:", error);
        }
    };

    const displayName = user?.name || user?.email?.split("@")[0] || "User";

    return (
        <header className={`sticky top-0 w-full z-50 transition-all duration-500 bg-white/80 backdrop-blur-2xl border-b border-black/5 ${scrolled ? "py-3 shadow-sm" : "py-5"}`}>
            <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between gap-8">

                {/* Left: Logo */}
                <Link href="/" className="flex items-center shrink-0">
                    <span className="text-2xl font-light tracking-widest uppercase text-luxury-charcoal font-serif italic hover:opacity-80 transition-opacity">
                        ShopSphere
                    </span>
                </Link>

                {/* Center: Search */}
                <div className="hidden md:flex flex-1 max-w-lg mx-auto relative group">
                    <div className="flex items-center w-full rounded-full overflow-hidden border bg-white/50 border-black/10 focus-within:bg-white focus-within:border-luxury-gold/50 focus-within:shadow-sm transition-all duration-300">
                        <div className="pl-5 pr-2 text-neutral-400 group-focus-within:text-luxury-gold transition-colors">
                            <Search size={16} />
                        </div>
                        <Input
                            placeholder="Discover the collection..."
                            className="flex-1 border-none focus-visible:ring-0 h-11 bg-transparent text-sm font-medium text-luxury-charcoal placeholder:text-neutral-400"
                        />
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-6 shrink-0 text-luxury-charcoal">
                    {user ? (
                        <div className="relative group">
                            <button className="flex items-center gap-2 hover:text-luxury-gold transition-colors cursor-pointer">
                                <span className="text-xs font-semibold tracking-widest uppercase hidden sm:block">
                                    {displayName}
                                </span>
                                <User size={20} strokeWidth={1.5} />
                            </button>

                            {/* Dropdown Menu */}
                            <div className="absolute right-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 translate-y-2 group-hover:translate-y-0">
                                <div className="bg-white/95 backdrop-blur-xl text-luxury-charcoal rounded-xl shadow-xl border border-black/5 py-2 min-w-[200px] overflow-hidden">
                                    <Link href="/user/profile" className="flex items-center gap-3 px-5 py-3 hover:bg-neutral-50 transition-colors text-xs font-semibold uppercase tracking-wider">
                                        <UserCircle size={16} /> My Account
                                    </Link>
                                    {(user.role === "ADMIN" || user.role === "SUPER_ADMIN") && (
                                        <Link href="/admin" className="flex items-center gap-3 px-5 py-3 hover:bg-neutral-50 transition-colors text-xs font-semibold uppercase tracking-wider">
                                            <LayoutDashboard size={16} /> Admin Dashboard
                                        </Link>
                                    )}
                                    <Link href="/user/purchase" className="flex items-center gap-3 px-5 py-3 hover:bg-neutral-50 transition-colors text-xs font-semibold uppercase tracking-wider">
                                        <Package size={16} /> My Purchases
                                    </Link>
                                    <div className="h-px bg-black/5 my-1" />
                                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-5 py-3 hover:bg-neutral-50 transition-colors text-xs font-semibold uppercase tracking-wider text-left">
                                        <LogOut size={16} /> Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-widest">
                            <Link href="/login" className="hover:text-luxury-gold transition-colors">
                                Sign In
                            </Link>
                        </div>
                    )}

                    <Link href="/cart" className="relative group hover:text-luxury-gold transition-colors flex items-center">
                        <ShoppingCart size={20} strokeWidth={1.5} />
                        {(cartData?.data?.cart?.items?.length || 0) > 0 && (
                            <span className="absolute -top-2 -right-2.5 bg-luxury-gold text-white text-[9px] font-bold w-[18px] h-[18px] flex items-center justify-center rounded-full shadow-sm">
                                {cartData?.data?.cart?.items?.length}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
}
