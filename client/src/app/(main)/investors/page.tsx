import Link from "next/link";
import { ArrowLeft, TrendingUp, BarChart3, Target, Building2, FileText } from "lucide-react";

const highlights = [
    { number: "$50M+", label: "Annual Revenue" },
    { number: "2M+", label: "Active Users" },
    { number: "200+", label: "Brand Partners" },
    { number: "150%", label: "YoY Growth" },
];

const sections = [
    {
        icon: TrendingUp,
        title: "Growth Trajectory",
        items: [
            "Consistent double-digit revenue growth year over year.",
            "Expanding customer base across North America, Europe, and Asia-Pacific.",
            "Strategic partnerships with leading fashion houses and independent designers.",
        ],
    },
    {
        icon: Target,
        title: "Market Opportunity",
        items: [
            "Global online fashion market projected to reach $1.2 trillion by 2027.",
            "Increasing consumer demand for curated, premium online shopping experiences.",
            "Untapped potential in sustainable and direct-to-consumer fashion segments.",
        ],
    },
    {
        icon: Building2,
        title: "Strategic Vision",
        items: [
            "Expand proprietary technology platform for personalized shopping experiences.",
            "Scale operations to 50+ countries with localized fulfillment centers.",
            "Launch private-label collections and exclusive brand collaborations.",
        ],
    },
];

export default function InvestorsPage() {
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
                        Investor Relations
                    </span>
                    <h1 className="text-4xl md:text-5xl font-light text-luxury-charcoal tracking-tight mb-6">
                        <span className="font-serif italic text-luxury-gold">Invest</span> in the Future of Fashion
                    </h1>
                    <p className="text-neutral-500 text-lg max-w-2xl mx-auto leading-relaxed">
                        ShopSphere is reshaping the e-commerce landscape. Discover why leading investors are partnering with us to build the next generation of fashion retail.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                    {highlights.map((item) => (
                        <div
                            key={item.label}
                            className="bg-white/60 backdrop-blur-2xl border border-white/40 rounded-2xl p-6 text-center shadow-xl shadow-black/5"
                        >
                            <p className="text-3xl font-serif italic text-luxury-gold mb-1">{item.number}</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">{item.label}</p>
                        </div>
                    ))}
                </div>

                <div className="space-y-8 mb-20">
                    {sections.map((section) => {
                        const Icon = section.icon;
                        return (
                            <div
                                key={section.title}
                                className="bg-white/60 backdrop-blur-2xl border border-white/40 rounded-3xl p-8 shadow-xl shadow-black/5"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-10 h-10 bg-luxury-gold/10 rounded-xl flex items-center justify-center">
                                        <Icon size={18} className="text-luxury-gold" />
                                    </div>
                                    <h2 className="text-lg font-bold text-luxury-charcoal uppercase tracking-widest">
                                        {section.title}
                                    </h2>
                                </div>
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
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <FileText size={24} className="text-luxury-gold-light" />
                    </div>
                    <h2 className="text-2xl font-light text-white tracking-tight mb-4">
                        Investor <span className="font-serif italic text-luxury-gold-light">Documents</span>
                    </h2>
                    <p className="text-neutral-400 text-sm mb-8 max-w-lg mx-auto">
                        Access our latest investor presentations, financial reports, and corporate governance documents.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-all">
                            Annual Report 2025
                        </button>
                        <button className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-all">
                            Investor Deck
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
