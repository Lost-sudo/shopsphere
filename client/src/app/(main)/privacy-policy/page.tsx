import Link from "next/link";
import { ArrowLeft, Shield, Eye, Lock, Database, Mail } from "lucide-react";

const sections = [
    {
        icon: Eye,
        title: "Information We Collect",
        content:
            "We collect information you provide directly to us, including your name, email address, shipping address, payment information, and order details. We also automatically collect certain data when you use our site, such as your IP address, browser type, device information, and browsing behavior through cookies and similar technologies.",
    },
    {
        icon: Lock,
        title: "How We Use Your Information",
        content:
            "Your information is used to process and fulfill your orders, communicate with you about your purchases, send you marketing communications (with your consent), improve our website and services, prevent fraud, and comply with legal obligations.",
    },
    {
        icon: Database,
        title: "Data Sharing & Disclosure",
        content:
            "We do not sell your personal information to third parties. We may share your data with trusted service providers who assist us in operating our website, processing payments, delivering shipments, and analyzing customer behavior — all under strict confidentiality agreements.",
    },
    {
        icon: Shield,
        title: "Data Security",
        content:
            "We implement industry-standard security measures including SSL encryption, regular security audits, and access controls to protect your personal information. Payment transactions are processed through PCI DSS-compliant gateways and are never stored on our servers.",
    },
];

export default function PrivacyPolicyPage() {
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
                        Your Privacy
                    </span>
                    <h1 className="text-4xl md:text-5xl font-light text-luxury-charcoal tracking-tight mb-6">
                        Privacy <span className="font-serif italic text-luxury-gold">Policy</span>
                    </h1>
                    <p className="text-neutral-500 text-lg max-w-2xl mx-auto leading-relaxed">
                        Last updated: January 1, 2026. Your privacy matters to us. This policy outlines how we collect, use, and protect your personal information.
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

                <div className="bg-white/60 backdrop-blur-2xl border border-white/40 rounded-3xl p-8 shadow-xl shadow-black/5 space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-luxury-gold/10 rounded-xl flex items-center justify-center">
                            <Mail size={18} className="text-luxury-gold" />
                        </div>
                        <h2 className="text-lg font-bold text-luxury-charcoal uppercase tracking-widest">
                            Contact Us
                        </h2>
                    </div>
                    <p className="text-neutral-500 text-sm leading-relaxed">
                        If you have any questions about this Privacy Policy or wish to exercise your data rights, please contact us at <strong className="text-luxury-charcoal">privacy@shopsphere.com</strong> or through our <Link href="/contact-us" className="text-luxury-gold underline underline-offset-4 hover:text-luxury-charcoal transition-colors">Contact Us</Link> page.
                    </p>
                    <p className="text-neutral-500 text-sm leading-relaxed">
                        You have the right to access, correct, or delete your personal data at any time. You may also opt out of marketing communications by updating your preferences in your account settings.
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
