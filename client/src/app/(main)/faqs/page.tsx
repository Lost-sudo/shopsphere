import Link from "next/link";
import { ArrowLeft, ShoppingBag, CreditCard, Truck, RotateCcw, User, Shield } from "lucide-react";

const categories = [
    {
        icon: ShoppingBag,
        title: "Orders",
        questions: [
            {
                q: "How do I place an order?",
                a: "Browse our collection, add items to your cart, and proceed to checkout. You will need to create an account or sign in before completing your purchase.",
            },
            {
                q: "Can I modify or cancel my order after placing it?",
                a: "Orders can be modified or canceled within 1 hour of placement. Please contact our support team immediately with your order number for assistance.",
            },
            {
                q: "How will I know if my order has been confirmed?",
                a: "You will receive an order confirmation email once your payment has been processed. You can also view your order status in your account dashboard.",
            },
        ],
    },
    {
        icon: CreditCard,
        title: "Payment",
        questions: [
            {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, and Google Pay.",
            },
            {
                q: "Is my payment information secure?",
                a: "Absolutely. We use industry-standard SSL encryption to protect your payment information. Your payment data is never stored on our servers.",
            },
            {
                q: "When will I be charged?",
                a: "Your payment is charged immediately upon placing your order. You will see a pending charge on your account, which settles once your order is processed.",
            },
        ],
    },
    {
        icon: Truck,
        title: "Shipping",
        questions: [
            {
                q: "How long does shipping take?",
                a: "Standard shipping takes 5-8 business days. Express shipping takes 2-3 business days, and next-day delivery is available for orders placed before 2PM EST.",
            },
            {
                q: "Do you offer free shipping?",
                a: "Yes, standard shipping is free on all orders over $150. International shipping costs are calculated at checkout.",
            },
            {
                q: "Do you ship internationally?",
                a: "Yes, we ship to over 50 countries worldwide. International delivery takes 7-14 business days. Customs duties and taxes may apply and are the responsibility of the customer.",
            },
        ],
    },
    {
        icon: RotateCcw,
        title: "Returns & Exchanges",
        questions: [
            {
                q: "What is your return policy?",
                a: "We accept returns within 30 days of delivery. Items must be unworn, unwashed, and with all tags attached. Final sale items are not eligible for return.",
            },
            {
                q: "How long do refunds take?",
                a: "Refunds are processed within 5-7 business days after we receive your return. The amount will be credited to your original payment method.",
            },
            {
                q: "Can I exchange an item for a different size?",
                a: "Yes, size exchanges are free of charge. Simply initiate a return and select the exchange option. We will ship the new size once the return is received.",
            },
        ],
    },
    {
        icon: User,
        title: "Account",
        questions: [
            {
                q: "How do I create an account?",
                a: "Click the 'Sign In' button in the top right corner and select 'Create Account'. You will need to provide your name, email address, and a password.",
            },
            {
                q: "How do I reset my password?",
                a: "On the sign-in page, click 'Forgot Password' and enter your email address. You will receive a password reset link within a few minutes.",
            },
            {
                q: "Can I update my shipping address after placing an order?",
                a: "Address changes can be made within 1 hour of placing your order. Contact our support team as soon as possible with your order number.",
            },
        ],
    },
    {
        icon: Shield,
        title: "Privacy & Security",
        questions: [
            {
                q: "How do you protect my personal information?",
                a: "We implement a variety of security measures to maintain the safety of your personal information, including encryption, firewalls, and secure server hosting.",
            },
            {
                q: "Will you share my information with third parties?",
                a: "We do not sell, trade, or otherwise transfer your personal information to outside parties without your consent, except as required by law.",
            },
            {
                q: "How can I delete my account?",
                a: "To delete your account, please contact our support team. Your account will be permanently removed within 30 days of the request.",
            },
        ],
    },
];

export default function FAQsPage() {
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
                        Help Center
                    </span>
                    <h1 className="text-4xl md:text-5xl font-light text-luxury-charcoal tracking-tight mb-6">
                        Frequently Asked <span className="font-serif italic text-luxury-gold">Questions</span>
                    </h1>
                    <p className="text-neutral-500 text-lg max-w-2xl mx-auto leading-relaxed">
                        Find answers to the most common questions below. If you need further assistance, feel free to reach out.
                    </p>
                </div>

                <div className="space-y-12 mb-16">
                    {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                            <section key={category.title}>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-10 h-10 bg-luxury-gold/10 rounded-xl flex items-center justify-center">
                                        <Icon size={18} className="text-luxury-gold" />
                                    </div>
                                    <h2 className="text-lg font-bold text-luxury-charcoal uppercase tracking-widest">
                                        {category.title}
                                    </h2>
                                </div>
                                <div className="space-y-3">
                                    {category.questions.map((faq) => (
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
                            </section>
                        );
                    })}
                </div>

                <div className="bg-luxury-charcoal rounded-3xl p-10 text-center">
                    <h2 className="text-2xl font-light text-white tracking-tight mb-4">
                        Still Have <span className="font-serif italic text-luxury-gold-light">Questions</span>?
                    </h2>
                    <p className="text-neutral-400 text-sm mb-6 max-w-lg mx-auto">
                        Our support team is here to help you with anything you need.
                    </p>
                    <Link
                        href="/contact-us"
                        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-all"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </div>
    );
}
