"use client";

import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, Clock } from "lucide-react";

const contactMethods = [
    {
        icon: Mail,
        title: "Email",
        details: "support@shopsphere.com",
        description: "We respond within 24 hours",
    },
    {
        icon: Phone,
        title: "Phone",
        details: "+1 (800) 555-SHOP",
        description: "Mon-Fri 9AM-6PM EST",
    },
    {
        icon: MapPin,
        title: "Visit Us",
        details: "123 Luxury Lane, Suite 200",
        description: "New York, NY 10001",
    },
    {
        icon: Clock,
        title: "Hours",
        details: "Monday - Friday",
        description: "9:00 AM - 6:00 PM EST",
    },
];

export default function ContactUsPage() {
    return (
        <div className="min-h-screen bg-[#fafafa]">
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-luxury-gold/5 blur-[120px]" />
                <div className="absolute bottom-[10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-neutral-200/50 blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-luxury-charcoal transition-colors group mb-12"
                >
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                <div className="text-center mb-16">
                    <span className="text-luxury-gold uppercase tracking-[0.3em] text-xs font-semibold mb-4 block">
                        Get in Touch
                    </span>
                    <h1 className="text-4xl md:text-5xl font-light text-luxury-charcoal tracking-tight mb-6">
                        We&apos;d Love to Hear <span className="font-serif italic text-luxury-gold">From You</span>
                    </h1>
                    <p className="text-neutral-500 text-lg max-w-2xl mx-auto leading-relaxed">
                        Have a question, feedback, or just want to say hello? Our team is here to help.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div className="space-y-8">
                        {contactMethods.map((method) => {
                            const Icon = method.icon;
                            return (
                                <div key={method.title} className="flex items-start gap-5">
                                    <div className="w-12 h-12 bg-luxury-gold/10 rounded-xl flex items-center justify-center shrink-0">
                                        <Icon size={20} className="text-luxury-gold" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-luxury-charcoal uppercase tracking-widest mb-1">
                                            {method.title}
                                        </h3>
                                        <p className="text-base text-luxury-charcoal font-medium">{method.details}</p>
                                        <p className="text-sm text-neutral-500">{method.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <form className="bg-white/60 backdrop-blur-2xl border border-white/40 rounded-3xl p-8 shadow-xl shadow-black/5 space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full h-12 px-4 bg-white/80 border border-black/10 rounded-xl text-sm text-luxury-charcoal focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 focus:border-luxury-gold/50 transition-all placeholder:text-neutral-400"
                                    placeholder="John"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full h-12 px-4 bg-white/80 border border-black/10 rounded-xl text-sm text-luxury-charcoal focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 focus:border-luxury-gold/50 transition-all placeholder:text-neutral-400"
                                    placeholder="Doe"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                                Email
                            </label>
                            <input
                                type="email"
                                className="w-full h-12 px-4 bg-white/80 border border-black/10 rounded-xl text-sm text-luxury-charcoal focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 focus:border-luxury-gold/50 transition-all placeholder:text-neutral-400"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                                Subject
                            </label>
                            <select className="w-full h-12 px-4 bg-white/80 border border-black/10 rounded-xl text-sm text-luxury-charcoal focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 focus:border-luxury-gold/50 transition-all">
                                <option>General Inquiry</option>
                                <option>Order Support</option>
                                <option>Returns & Exchanges</option>
                                <option>Wholesale Inquiry</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                                Message
                            </label>
                            <textarea
                                rows={5}
                                className="w-full px-4 py-3 bg-white/80 border border-black/10 rounded-xl text-sm text-luxury-charcoal focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 focus:border-luxury-gold/50 transition-all placeholder:text-neutral-400 resize-none"
                                placeholder="How can we help you?"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full h-14 bg-luxury-charcoal text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-luxury-charcoal-light transition-all active:scale-[0.98]"
                            onClick={(e) => e.preventDefault()}
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
