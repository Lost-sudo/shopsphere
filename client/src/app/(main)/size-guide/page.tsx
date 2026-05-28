import Link from "next/link";
import { ArrowLeft, Ruler, Shirt, Footprints } from "lucide-react";

const categories = [
    {
        icon: Shirt,
        title: "Tops & Jackets",
        table: {
            headers: ["Size", "Chest (in)", "Waist (in)", "Length (in)"],
            rows: [
                ["XS", "34-36", "28-30", "26-27"],
                ["S", "36-38", "30-32", "27-28"],
                ["M", "38-40", "32-34", "28-29"],
                ["L", "40-42", "34-36", "29-30"],
                ["XL", "42-44", "36-38", "30-31"],
                ["XXL", "44-46", "38-40", "31-32"],
            ],
        },
    },
    {
        icon: Ruler,
        title: "Bottoms",
        table: {
            headers: ["Size", "Waist (in)", "Hip (in)", "Inseam (in)"],
            rows: [
                ["XS", "26-28", "34-36", "30-31"],
                ["S", "28-30", "36-38", "31-32"],
                ["M", "30-32", "38-40", "32-33"],
                ["L", "32-34", "40-42", "33-34"],
                ["XL", "34-36", "42-44", "34-35"],
                ["XXL", "36-38", "44-46", "35-36"],
            ],
        },
    },
    {
        icon: Footprints,
        title: "Footwear",
        table: {
            headers: ["US Size", "EU Size", "UK Size", "Foot Length (cm)"],
            rows: [
                ["6", "39", "5.5", "24.0"],
                ["7", "40", "6.5", "25.0"],
                ["8", "41", "7.5", "25.8"],
                ["9", "42", "8.5", "26.7"],
                ["10", "43", "9.5", "27.6"],
                ["11", "44", "10.5", "28.4"],
            ],
        },
    },
];

const tips = [
    "Measure yourself while wearing minimal clothing for the most accurate fit.",
    "Use a soft measuring tape and keep it snug but not tight against the body.",
    "If you are between sizes, we recommend sizing up for a more comfortable fit.",
    "Refer to the product description for fit notes — some styles run oversized or slim.",
    "When in doubt, our customer service team is happy to help with sizing advice.",
];

export default function SizeGuidePage() {
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
                        Measurements
                    </span>
                    <h1 className="text-4xl md:text-5xl font-light text-luxury-charcoal tracking-tight mb-6">
                        Size <span className="font-serif italic text-luxury-gold">Guide</span>
                    </h1>
                    <p className="text-neutral-500 text-lg max-w-2xl mx-auto leading-relaxed">
                        Find your perfect fit with our detailed size charts and measuring tips.
                    </p>
                </div>

                <div className="space-y-16 mb-20">
                    {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                            <section key={category.title}>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-10 h-10 bg-luxury-gold/10 rounded-xl flex items-center justify-center">
                                        <Icon size={18} className="text-luxury-gold" />
                                    </div>
                                    <h2 className="text-xl font-bold text-luxury-charcoal uppercase tracking-widest">
                                        {category.title}
                                    </h2>
                                </div>
                                <div className="overflow-x-auto bg-white/60 backdrop-blur-2xl border border-white/40 rounded-3xl shadow-xl shadow-black/5">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-black/5">
                                                {category.table.headers.map((header) => (
                                                    <th
                                                        key={header}
                                                        className="text-left px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-neutral-500"
                                                    >
                                                        {header}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {category.table.rows.map((row) => (
                                                <tr
                                                    key={row[0]}
                                                    className="border-b border-black/5 last:border-none"
                                                >
                                                    {row.map((cell, i) => (
                                                        <td
                                                            key={cell}
                                                            className="px-6 py-4 text-sm text-luxury-charcoal font-medium"
                                                        >
                                                            {cell}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        );
                    })}
                </div>

                <div className="bg-white/60 backdrop-blur-2xl border border-white/40 rounded-3xl p-8 shadow-xl shadow-black/5">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 bg-luxury-gold/10 rounded-xl flex items-center justify-center">
                            <Ruler size={18} className="text-luxury-gold" />
                        </div>
                        <h2 className="text-xl font-bold text-luxury-charcoal uppercase tracking-widest">
                            Measuring Tips
                        </h2>
                    </div>
                    <ul className="space-y-3">
                        {tips.map((tip) => (
                            <li key={tip} className="flex items-start gap-3 text-sm text-neutral-600">
                                <span className="w-1.5 h-1.5 bg-luxury-gold/60 rounded-full mt-[6px] shrink-0" />
                                {tip}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
