import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Leaf, Recycle, Package, TreePine, Factory } from "lucide-react";

const initiatives = [
    {
        icon: Package,
        title: "Eco-Friendly Packaging",
        text: "All our shipments use 100% recyclable and compostable materials. We have eliminated single-use plastics from our packaging entirely.",
    },
    {
        icon: Recycle,
        title: "Circular Fashion",
        text: "We partner with take-back programs and resale platforms to extend the lifecycle of garments and reduce textile waste.",
    },
    {
        icon: Factory,
        title: "Ethical Production",
        text: "We vet every brand we carry for fair labor practices, safe working conditions, and responsible sourcing of materials.",
    },
    {
        icon: TreePine,
        title: "Carbon Neutral Shipping",
        text: "We offset carbon emissions for every order through verified reforestation and renewable energy projects.",
    },
];

const goals = [
    "Achieve 100% sustainable sourcing for all private-label products by 2027.",
    "Reduce operational carbon footprint by 50% by 2030.",
    "Ensure all partner brands meet our ethical production standards.",
    "Launch a garment repair and recycling program for customers.",
    "Achieve zero-waste operations across all warehouses by 2028.",
];

export default function SustainabilityPage() {
    return (
        <div className="min-h-screen bg-[#fafafa]">
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/5 blur-[120px]" />
                <div className="absolute bottom-[10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-neutral-200/50 blur-[100px]" />
            </div>

            <div className="relative z-10">
                <section className="relative h-[55vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/images/home/trending_minimal.png"
                            alt="Sustainability"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/60" />
                    </div>
                    <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
                        <span className="text-luxury-gold-light uppercase tracking-[0.3em] text-xs font-semibold mb-4 block">
                            Our Commitment
                        </span>
                        <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight mb-6">
                            <span className="font-serif italic text-luxury-gold-light">Sustainability</span>
                        </h1>
                        <p className="text-white/80 text-lg max-w-xl mx-auto leading-relaxed">
                            Fashion should not come at the expense of our planet. We are committed to making responsible choices at every step of the journey.
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
                            <span className="text-emerald-600 uppercase tracking-[0.3em] text-xs font-semibold block">
                                Our Promise
                            </span>
                            <h2 className="text-3xl md:text-4xl font-light text-luxury-charcoal tracking-tight leading-tight">
                                Fashion That <span className="font-serif italic text-emerald-600">Gives Back</span>
                            </h2>
                            <p className="text-neutral-500 leading-relaxed">
                                We believe that style and sustainability go hand in hand. From the materials we source to the way we ship, every decision is made with the planet in mind. Our journey toward a more sustainable future is ongoing, and we are committed to transparency every step of the way.
                            </p>
                        </div>
                        <div className="relative aspect-square w-full max-w-sm mx-auto rounded-full overflow-hidden border-8 border-white/60 shadow-xl">
                            <Image
                                src="/images/products/velvet_cushion.png"
                                alt="Sustainable materials"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <h2 className="text-3xl font-light text-luxury-charcoal tracking-tight text-center mb-12">
                        What We&apos;re <span className="font-serif italic text-emerald-600">Doing</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                        {initiatives.map((initiative) => {
                            const Icon = initiative.icon;
                            return (
                                <div
                                    key={initiative.title}
                                    className="bg-white/60 backdrop-blur-2xl border border-white/40 rounded-3xl p-8 shadow-xl shadow-black/5"
                                >
                                    <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-5">
                                        <Icon size={20} className="text-emerald-600" />
                                    </div>
                                    <h3 className="text-base font-bold text-luxury-charcoal uppercase tracking-widest mb-2">
                                        {initiative.title}
                                    </h3>
                                    <p className="text-sm text-neutral-500">{initiative.text}</p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="bg-white/60 backdrop-blur-2xl border border-white/40 rounded-3xl p-10 shadow-xl shadow-black/5">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                                <Leaf size={20} className="text-emerald-600" />
                            </div>
                            <h2 className="text-xl font-light text-luxury-charcoal tracking-tight">
                                Our 2028 <span className="font-serif italic text-emerald-600">Goals</span>
                            </h2>
                        </div>
                        <ul className="space-y-4">
                            {goals.map((goal) => (
                                <li key={goal} className="flex items-start gap-4 text-sm text-neutral-600">
                                    <span className="w-6 h-6 bg-emerald-500/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                        <Leaf size={12} className="text-emerald-600" />
                                    </span>
                                    {goal}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
