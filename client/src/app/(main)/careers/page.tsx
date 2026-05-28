import Link from "next/link";
import { ArrowLeft, Briefcase, Users, Lightbulb, Globe, Handshake } from "lucide-react";

const perks = [
    {
        icon: Lightbulb,
        title: "Innovation",
        text: "Work with cutting-edge technology and help shape the future of e-commerce.",
    },
    {
        icon: Users,
        title: "Inclusive Culture",
        text: "We celebrate diversity and foster an environment where every voice is heard and valued.",
    },
    {
        icon: Globe,
        title: "Remote-Friendly",
        text: "Flexible work arrangements that let you do your best work, wherever you are.",
    },
    {
        icon: Handshake,
        title: "Growth",
        text: "Continuous learning opportunities, mentorship programs, and clear career progression paths.",
    },
];

const openRoles = [
    {
        title: "Senior Frontend Engineer",
        location: "New York, NY / Remote",
        type: "Full-Time",
    },
    {
        title: "Backend Developer (Node.js)",
        location: "New York, NY / Remote",
        type: "Full-Time",
    },
    {
        title: "Product Designer",
        location: "New York, NY",
        type: "Full-Time",
    },
    {
        title: "Marketing Manager",
        location: "New York, NY",
        type: "Full-Time",
    },
    {
        title: "Customer Experience Specialist",
        location: "Remote",
        type: "Full-Time",
    },
];

export default function CareersPage() {
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
                        Join the Team
                    </span>
                    <h1 className="text-4xl md:text-5xl font-light text-luxury-charcoal tracking-tight mb-6">
                        Careers at <span className="font-serif italic text-luxury-gold">ShopSphere</span>
                    </h1>
                    <p className="text-neutral-500 text-lg max-w-2xl mx-auto leading-relaxed">
                        We are building the future of fashion e-commerce — and we want you to be part of it. Explore opportunities to grow, create, and make an impact.
                    </p>
                </div>

                <div className="bg-white/60 backdrop-blur-2xl border border-white/40 rounded-3xl p-10 shadow-xl shadow-black/5 mb-16 text-center">
                    <div className="w-16 h-16 bg-luxury-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Briefcase size={28} className="text-luxury-gold" />
                    </div>
                    <h2 className="text-2xl font-light text-luxury-charcoal tracking-tight mb-4">
                        Why Work With <span className="font-serif italic text-luxury-gold">Us</span>?
                    </h2>
                    <p className="text-neutral-500 max-w-xl mx-auto leading-relaxed mb-0">
                        At ShopSphere, you will collaborate with talented people who are passionate about design, technology, and creating exceptional customer experiences. We believe in autonomy, ownership, and continuous growth.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    {perks.map((perk) => {
                        const Icon = perk.icon;
                        return (
                            <div
                                key={perk.title}
                                className="bg-white/60 backdrop-blur-2xl border border-white/40 rounded-3xl p-8 shadow-xl shadow-black/5"
                            >
                                <div className="w-12 h-12 bg-luxury-gold/10 rounded-xl flex items-center justify-center mb-5">
                                    <Icon size={20} className="text-luxury-gold" />
                                </div>
                                <h3 className="text-base font-bold text-luxury-charcoal uppercase tracking-widest mb-2">
                                    {perk.title}
                                </h3>
                                <p className="text-sm text-neutral-500">{perk.text}</p>
                            </div>
                        );
                    })}
                </div>

                <h2 className="text-2xl font-light text-luxury-charcoal tracking-tight mb-8 text-center">
                    Open <span className="font-serif italic text-luxury-gold">Positions</span>
                </h2>

                <div className="space-y-4 mb-16">
                    {openRoles.map((role) => (
                        <div
                            key={role.title}
                            className="bg-white/60 backdrop-blur-2xl border border-white/40 rounded-2xl p-6 shadow-xl shadow-black/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/80 transition-colors"
                        >
                            <div>
                                <h3 className="text-sm font-bold text-luxury-charcoal uppercase tracking-widest">
                                    {role.title}
                                </h3>
                                <p className="text-xs text-neutral-500 mt-1">
                                    {role.location} &middot; {role.type}
                                </p>
                            </div>
                            <button className="px-6 py-3 bg-luxury-charcoal text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-luxury-charcoal-light transition-all active:scale-95 shrink-0">
                                Apply Now
                            </button>
                        </div>
                    ))}
                </div>

                <div className="bg-neutral-100 rounded-3xl p-10 text-center border border-black/5">
                    <h2 className="text-xl font-light text-luxury-charcoal tracking-tight mb-3">
                        Don&apos;t See the Right Role?
                    </h2>
                    <p className="text-neutral-500 text-sm mb-6 max-w-md mx-auto">
                        We are always looking for talented individuals. Send us your resume and we will keep you in mind for future opportunities.
                    </p>
                    <Link
                        href="/contact-us"
                        className="inline-flex items-center gap-2 bg-luxury-charcoal text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-luxury-charcoal-light transition-all"
                    >
                        Get in Touch
                    </Link>
                </div>
            </div>
        </div>
    );
}
