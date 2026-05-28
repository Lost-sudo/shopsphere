import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Shield, Sparkles, Heart, Award } from "lucide-react";

const values = [
    {
        icon: Sparkles,
        title: "Craftsmanship",
        text: "Every piece in our collection is thoughtfully selected for its design, quality, and longevity. We partner with artisans and manufacturers who share our commitment to excellence.",
    },
    {
        icon: Shield,
        title: "Trust",
        text: "We believe in transparency, secure transactions, and protecting your privacy. Our customers trust us to deliver not just products, but peace of mind.",
    },
    {
        icon: Heart,
        title: "Community",
        text: "Fashion is personal, but style is universal. We foster a community where everyone feels represented, inspired, and confident in their choices.",
    },
    {
        icon: Award,
        title: "Sustainability",
        text: "We are on a continuous journey toward more sustainable practices — from eco-friendly packaging to partnering with brands that prioritize ethical production.",
    },
];

const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "200+", label: "Curated Brands" },
    { number: "30+", label: "Countries Shipped" },
    { number: "4.8", label: "Average Rating" },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#fafafa]">
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-luxury-gold/5 blur-[120px]" />
                <div className="absolute bottom-[10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-neutral-200/50 blur-[100px]" />
            </div>

            <div className="relative z-10">
                <section className="relative h-[60vh] min-h-[450px] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/images/home/hero_lookbook.png"
                            alt="About ShopSphere"
                            fill
                            className="object-cover object-top scale-105"
                            priority
                        />
                        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/20 to-black/60" />
                    </div>
                    <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
                        <span className="text-luxury-gold-light uppercase tracking-[0.3em] text-xs font-semibold mb-4 block">
                            Our Story
                        </span>
                        <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight mb-6">
                            About <span className="font-serif italic text-luxury-gold-light">ShopSphere</span>
                        </h1>
                        <p className="text-white/80 text-lg max-w-xl mx-auto leading-relaxed">
                            Redefining the way you discover and shop for fashion — thoughtfully curated, beautifully designed, and delivered with care.
                        </p>
                    </div>
                </section>

                <div className="max-w-5xl mx-auto px-4 py-16">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-luxury-charcoal transition-colors group mb-16"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                        <div className="space-y-6">
                            <span className="text-luxury-gold uppercase tracking-[0.3em] text-xs font-semibold block">
                                Who We Are
                            </span>
                            <h2 className="text-3xl md:text-4xl font-light text-luxury-charcoal tracking-tight leading-tight">
                                Curating Fashion for the <span className="font-serif italic text-luxury-gold">Thoughtful</span> Individual
                            </h2>
                            <p className="text-neutral-500 leading-relaxed">
                                ShopSphere was born from a simple idea: shopping for fashion should feel inspiring, not overwhelming. We bring together a handpicked selection of brands and pieces that embody timeless design, exceptional quality, and understated elegance.
                            </p>
                            <p className="text-neutral-500 leading-relaxed">
                                From our headquarters in New York, we work directly with designers and manufacturers around the globe to ensure every item meets our standards — and yours. Whether you are building a capsule wardrobe or searching for that one standout piece, we are here to help you find exactly what you need.
                            </p>
                        </div>
                        <div className="relative aspect-[3/4] w-full max-w-sm mx-auto rounded-t-full overflow-hidden">
                            <Image
                                src="/images/home/trending_minimal.png"
                                alt="ShopSphere curation"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="bg-white/60 backdrop-blur-2xl border border-white/40 rounded-2xl p-6 text-center shadow-xl shadow-black/5"
                            >
                                <p className="text-3xl font-serif italic text-luxury-gold mb-1">{stat.number}</p>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-3xl font-light text-luxury-charcoal tracking-tight text-center mb-12">
                        What We <span className="font-serif italic text-luxury-gold">Stand For</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                        {values.map((value) => {
                            const Icon = value.icon;
                            return (
                                <div
                                    key={value.title}
                                    className="bg-white/60 backdrop-blur-2xl border border-white/40 rounded-3xl p-8 shadow-xl shadow-black/5"
                                >
                                    <div className="w-12 h-12 bg-luxury-gold/10 rounded-xl flex items-center justify-center mb-6">
                                        <Icon size={20} className="text-luxury-gold" />
                                    </div>
                                    <h3 className="text-lg font-bold text-luxury-charcoal uppercase tracking-widest mb-3">
                                        {value.title}
                                    </h3>
                                    <p className="text-neutral-500 leading-relaxed text-sm">
                                        {value.text}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
