import Link from "next/link";
import { ArrowLeft, ShieldCheck, FileText, Scale, AlertTriangle } from "lucide-react";

const sections = [
    {
        icon: FileText,
        title: "General Terms",
        content:
            "By accessing and using ShopSphere, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you should not use our website or services. We reserve the right to update these terms at any time, and continued use constitutes acceptance of any changes.",
    },
    {
        icon: Scale,
        title: "Account & Registration",
        content:
            "You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You must provide accurate, current, and complete information during registration. We reserve the right to suspend or terminate accounts that violate these terms.",
    },
    {
        icon: ShieldCheck,
        title: "Orders & Payments",
        content:
            "All prices are listed in USD and are subject to change without notice. We reserve the right to refuse or cancel any order. Payment must be received in full before orders are processed. In the event of a pricing error, we will notify you and offer the option to confirm the order at the correct price or cancel it.",
    },
    {
        icon: AlertTriangle,
        title: "Intellectual Property",
        content:
            "All content on ShopSphere — including text, images, logos, design elements, and software — is the property of ShopSphere or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without express written permission.",
    },
];

export default function TermsConditionsPage() {
    return (
        <div className="min-h-screen bg-[#fafafa]">
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-luxury-gold/5 blur-[120px]" />
                <div className="absolute bottom-[10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-neutral-200/50 blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 py-16">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-luxury-charcoal transition-colors group mb-12"
                >
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                <div className="text-center mb-16">
                    <span className="text-luxury-gold uppercase tracking-[0.3em] text-xs font-semibold mb-4 block">
                        Legal
                    </span>
                    <h1 className="text-4xl md:text-5xl font-light text-luxury-charcoal tracking-tight mb-6">
                        Terms & <span className="font-serif italic text-luxury-gold">Conditions</span>
                    </h1>
                    <p className="text-neutral-500 text-lg max-w-2xl mx-auto leading-relaxed">
                        Last updated: January 1, 2026. Please read these terms carefully before using our website or services.
                    </p>
                </div>

                <div className="space-y-8 mb-16">
                    {sections.map((section) => {
                        const Icon = section.icon;
                        return (
                            <div
                                key={section.title}
                                className="bg-white/60 backdrop-blur-2xl border border-white/40 rounded-3xl p-8 shadow-xl shadow-black/5"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 bg-luxury-gold/10 rounded-xl flex items-center justify-center">
                                        <Icon size={18} className="text-luxury-gold" />
                                    </div>
                                    <h2 className="text-lg font-bold text-luxury-charcoal uppercase tracking-widest">
                                        {section.title}
                                    </h2>
                                </div>
                                <p className="text-neutral-500 leading-relaxed text-sm">
                                    {section.content}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div className="bg-white/60 backdrop-blur-2xl border border-white/40 rounded-3xl p-8 shadow-xl shadow-black/5 space-y-4">
                    <h2 className="text-base font-bold text-luxury-charcoal uppercase tracking-widest">
                        Limitation of Liability
                    </h2>
                    <p className="text-neutral-500 text-sm leading-relaxed">
                        ShopSphere shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of our services. Our total liability for any claim shall not exceed the amount paid by you for the product or service giving rise to the claim.
                    </p>
                    <div className="h-px bg-black/5 my-4" />
                    <h2 className="text-base font-bold text-luxury-charcoal uppercase tracking-widest">
                        Governing Law
                    </h2>
                    <p className="text-neutral-500 text-sm leading-relaxed">
                        These terms shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law provisions. Any disputes arising from these terms shall be resolved in the courts of New York County.
                    </p>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-medium">
                        ShopSphere Inc. &middot; 123 Luxury Lane, Suite 200 &middot; New York, NY 10001
                    </p>
                </div>
            </div>
        </div>
    );
}
