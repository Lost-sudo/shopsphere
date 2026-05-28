"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Footer() {
    const footerSections = [
        {
            title: "Client Services",
            links: [
                { label: "Contact Us", href: "/contact-us" },
                { label: "Track Order", href: "/track-order" },
                { label: "Returns & Exchanges", href: "/returns-exchanges" },
                { label: "Shipping Information", href: "/shipping-information" },
                { label: "Size Guide", href: "/size-guide" },
                { label: "FAQs", href: "/faqs" },
            ],
        },
        {
            title: "The Company",
            links: [
                { label: "About ShopSphere", href: "/about" },
                { label: "Careers", href: "/careers" },
                { label: "Sustainability", href: "/sustainability" },
                { label: "Investors", href: "/investors" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms & Conditions", href: "/terms-conditions" },
            ],
        },
    ];

    return (
        <footer className="bg-neutral-50 pt-20 pb-10 border-t border-black/5 mt-auto selection:bg-luxury-gold/20">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">

                    {/* Newsletter Section */}
                    <div className="lg:col-span-5 lg:pr-12">
                        <h3 className="text-2xl font-light text-luxury-charcoal mb-4 font-serif italic">
                            Stay Inspired
                        </h3>
                        <p className="text-sm text-neutral-500 mb-6 leading-relaxed">
                            Sign up for emails to receive updates on the latest collections, editorial stories, and exclusive invitations.
                        </p>
                        <form className="relative max-w-sm" onSubmit={(e) => e.preventDefault()}>
                            <Input
                                type="email"
                                placeholder="Email Address"
                                className="w-full bg-transparent border-0 border-b border-black/20 rounded-none px-0 py-2 h-auto text-sm focus-visible:ring-0 focus-visible:border-luxury-charcoal placeholder:text-neutral-400 transition-colors"
                            />
                            <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-luxury-charcoal hover:text-luxury-gold transition-colors">
                                <ArrowRight size={18} strokeWidth={1.5} />
                            </button>
                        </form>
                    </div>

                    {/* Links Sections */}
                    <div className="lg:col-span-4 grid grid-cols-2 gap-8">
                        {footerSections.map((section) => (
                            <div key={section.title}>
                                <h4 className="text-[10px] font-bold text-luxury-charcoal mb-6 uppercase tracking-[0.2em]">
                                    {section.title}
                                </h4>
                                <ul className="space-y-4">
                                    {section.links.map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                href={link.href}
                                                className="text-xs text-neutral-500 hover:text-luxury-gold transition-colors font-medium"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Social Section */}
                    <div className="lg:col-span-3">
                        <h4 className="text-[10px] font-bold text-luxury-charcoal mb-6 uppercase tracking-[0.2em]">
                            Follow Us
                        </h4>
                        <div className="flex gap-6">
                            <Link href="#" className="text-luxury-charcoal hover:text-luxury-gold transition-colors">
                                <Instagram size={20} strokeWidth={1.5} />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link href="#" className="text-luxury-charcoal hover:text-luxury-gold transition-colors">
                                <Facebook size={20} strokeWidth={1.5} />
                                <span className="sr-only">Facebook</span>
                            </Link>
                            <Link href="#" className="text-luxury-charcoal hover:text-luxury-gold transition-colors">
                                <Twitter size={20} strokeWidth={1.5} />
                                <span className="sr-only">Twitter</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <Link href="/" className="text-xl font-light text-luxury-charcoal font-serif italic">
                        ShopSphere
                    </Link>
                    <div className="text-[10px] text-neutral-400 font-medium tracking-wide uppercase">
                        © 2026 ShopSphere. All Rights Reserved.
                    </div>
                    <div className="flex gap-4 text-[10px] text-neutral-400 font-medium tracking-wide uppercase">
                        <Link href="#" className="hover:text-luxury-charcoal transition-colors">Privacy</Link>
                        <Link href="#" className="hover:text-luxury-charcoal transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

