import Link from "next/link";
import { ArrowLeft, RotateCcw, RefreshCw, CheckCircle, XCircle } from "lucide-react";

const policies = [
    {
        icon: RotateCcw,
        title: "Returns",
        items: [
            "Items can be returned within 30 days of delivery.",
            "Products must be unworn, unwashed, and with all tags attached.",
            "Footwear must be returned in the original box without damage.",
            "Final sale items, including lingerie and swimwear, cannot be returned.",
        ],
    },
    {
        icon: RefreshCw,
        title: "Exchanges",
        items: [
            "Exchanges are processed within 5-7 business days after we receive your return.",
            "Size exchanges are free of charge.",
            "Style exchanges may be subject to price differences.",
            "We reserve the right to refuse exchanges on heavily discounted items.",
        ],
    },
    {
        icon: CheckCircle,
        title: "How to Initiate",
        items: [
            "Log into your account and navigate to your orders.",
            "Select the item you wish to return and choose a reason.",
            "Print the prepaid return label provided via email.",
            "Drop your package at any authorized shipping location.",
        ],
    },
    {
        icon: XCircle,
        title: "Non-Returnable Items",
        items: [
            "Gift cards and store credits.",
            "Personalized or custom-made products.",
            "Intimate apparel, earrings, and face masks.",
            "Products marked as 'Final Sale' on the product page.",
        ],
    },
];

export default function ReturnsExchangesPage() {
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
                        Policies
                    </span>
                    <h1 className="text-4xl md:text-5xl font-light text-luxury-charcoal tracking-tight mb-6">
                        Returns & <span className="font-serif italic text-luxury-gold">Exchanges</span>
                    </h1>
                    <p className="text-neutral-500 text-lg max-w-2xl mx-auto leading-relaxed">
                        We want you to love every purchase. If something isn&apos;t quite right, our hassle-free returns and exchanges process has you covered.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {policies.map((section) => {
                        const Icon = section.icon;
                        return (
                            <div
                                key={section.title}
                                className="bg-white/60 backdrop-blur-2xl border border-white/40 rounded-3xl p-8 shadow-xl shadow-black/5"
                            >
                                <div className="w-12 h-12 bg-luxury-gold/10 rounded-xl flex items-center justify-center mb-6">
                                    <Icon size={20} className="text-luxury-gold" />
                                </div>
                                <h2 className="text-lg font-bold text-luxury-charcoal uppercase tracking-widest mb-4">
                                    {section.title}
                                </h2>
                                <ul className="space-y-3">
                                    {section.items.map((item) => (
                                        <li key={item} className="flex items-start gap-3 text-sm text-neutral-600">
                                            <span className="w-1.5 h-1.5 bg-luxury-gold/60 rounded-full mt-[6px] shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>

                <div className="bg-luxury-charcoal rounded-3xl p-10 text-center">
                    <h2 className="text-2xl font-light text-white tracking-tight mb-4">
                        Need Additional <span className="font-serif italic text-luxury-gold-light">Assistance</span>?
                    </h2>
                    <p className="text-neutral-400 text-sm mb-6 max-w-lg mx-auto">
                        Our support team is happy to help with any return or exchange inquiries.
                    </p>
                    <Link
                        href="/contact-us"
                        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-all"
                    >
                        Contact Support
                    </Link>
                </div>
            </div>
        </div>
    );
}
