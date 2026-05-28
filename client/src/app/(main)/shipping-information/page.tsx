import Link from "next/link";
import { ArrowLeft, Package, Truck, Clock, Globe } from "lucide-react";

const shippingDetails = [
    {
        icon: Package,
        title: "Standard Shipping",
        cost: "Free",
        timeframe: "5-8 Business Days",
        note: "Free on orders over $150",
    },
    {
        icon: Truck,
        title: "Express Shipping",
        cost: "$15.00",
        timeframe: "2-3 Business Days",
        note: "Available for most addresses",
    },
    {
        icon: Clock,
        title: "Next-Day Delivery",
        cost: "$25.00",
        timeframe: "1 Business Day",
        note: "Order before 2PM EST",
    },
    {
        icon: Globe,
        title: "International Shipping",
        cost: "Calculated at Checkout",
        timeframe: "7-14 Business Days",
        note: "Customs duties may apply",
    },
];

const faqs = [
    {
        q: "How long does order processing take?",
        a: "Orders are processed within 1-2 business days. During peak seasons, processing may take up to 3 business days.",
    },
    {
        q: "Do you ship to PO boxes?",
        a: "Standard shipping is available to PO boxes. Express and next-day delivery require a physical street address.",
    },
    {
        q: "Can I change my shipping address after placing an order?",
        a: "Address changes can be made within 1 hour of placing your order. Contact our support team immediately for assistance.",
    },
    {
        q: "How can I track my package?",
        a: "Once your order ships, you will receive a tracking number via email. You can also find tracking details in your account under Order History.",
    },
];

export default function ShippingInformationPage() {
    return (
        <div className="min-h-screen bg-[#fafafa]">
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-luxury-gold/5 blur-[120px]" />
                <div className="absolute bottom-[10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-neutral-200/50 blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 py-16">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-luxury-charcoal transition-colors group mb-12"
                >
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                <div className="text-center mb-16">
                    <span className="text-luxury-gold uppercase tracking-[0.3em] text-xs font-semibold mb-4 block">
                        Delivery
                    </span>
                    <h1 className="text-4xl md:text-5xl font-light text-luxury-charcoal tracking-tight mb-6">
                        Shipping <span className="font-serif italic text-luxury-gold">Information</span>
                    </h1>
                    <p className="text-neutral-500 text-lg max-w-2xl mx-auto leading-relaxed">
                        We partner with trusted carriers to deliver your order promptly and securely, wherever you are in the world.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
                    {shippingDetails.map((method) => {
                        const Icon = method.icon;
                        return (
                            <div
                                key={method.title}
                                className="bg-white/60 backdrop-blur-2xl border border-white/40 rounded-3xl p-8 shadow-xl shadow-black/5"
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className="w-12 h-12 bg-luxury-gold/10 rounded-xl flex items-center justify-center">
                                        <Icon size={20} className="text-luxury-gold" />
                                    </div>
                                    <span className="text-xl font-serif italic text-luxury-gold">{method.cost}</span>
                                </div>
                                <h3 className="text-lg font-bold text-luxury-charcoal uppercase tracking-widest mb-1">
                                    {method.title}
                                </h3>
                                <p className="text-sm text-neutral-500 mb-2">{method.timeframe}</p>
                                <p className="text-xs text-neutral-400">{method.note}</p>
                            </div>
                        );
                    })}
                </div>

                <h2 className="text-2xl font-light text-luxury-charcoal tracking-tight mb-8 text-center">
                    Frequently Asked <span className="font-serif italic text-luxury-gold">Questions</span>
                </h2>
                <div className="space-y-4 max-w-3xl mx-auto mb-16">
                    {faqs.map((faq) => (
                        <details
                            key={faq.q}
                            className="bg-white/60 backdrop-blur-2xl border border-white/40 rounded-2xl shadow-xl shadow-black/5 group open:pb-6"
                        >
                            <summary className="flex items-center justify-between px-6 py-5 cursor-pointer text-sm font-bold text-luxury-charcoal uppercase tracking-widest list-none">
                                {faq.q}
                                <span className="text-luxury-gold text-lg transition-transform group-open:rotate-45">+</span>
                            </summary>
                            <div className="px-6 pt-2 text-neutral-500 text-sm leading-relaxed">
                                {faq.a}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </div>
    );
}
