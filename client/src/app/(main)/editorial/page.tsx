import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

const sections = [
    {
        title: "The Philosophy of Less",
        content:
            "Minimalism in fashion is not about deprivation — it is about intention. Every piece in a minimalist wardrobe serves a purpose, earning its place through versatility, quality, and timeless design. It is the quiet confidence of knowing exactly who you are and dressing accordingly, without the noise of fleeting trends.",
        image: "/images/home/trending_minimal.png",
        imageAlt: "Minimalist fashion piece",
    },
    {
        title: "Building the Foundation",
        content:
            "The cornerstone of any minimalist wardrobe begins with exceptional basics. A perfectly draped wool coat, a cashmere sweater in a neutral tone, tailored trousers that move with you, and a white cotton shirt with structure. These are not just clothes — they are investments in your daily ritual of self-expression. The beauty lies in the details: the weight of the fabric, the precision of the stitch, the way light catches a well-chosen accessory.",
        image: "/images/products/luxe_cotton_tee.png",
        imageAlt: "Essential wardrobe basics",
    },
    {
        title: "Texture as Statement",
        content:
            "When color takes a step back, texture steps forward. The interplay of materials — a smooth silk blouse against coarse linen trousers, the sheen of polished leather next to matte cotton — creates depth and visual interest without relying on patterns or logos. This is where minimalism reveals its true sophistication: in the tactile experience of what you wear.",
        image: "/images/products/velvet_cushion.png",
        imageAlt: "Textured fabric details",
    },
    {
        title: "The Modern Silhouette",
        content:
            "Today's minimalism embraces fluidity. Structured shoulders meet flowing silhouettes; tailored waistlines give way to relaxed fits. The modern wardrobe is a study in contrasts — sharp yet soft, precise yet effortless. It adapts seamlessly from the boardroom to an evening soiree, proving that fewer pieces, thoughtfully combined, create an infinite spectrum of looks.",
        image: "/images/products/sleek_leather_bomber.png",
        imageAlt: "Modern fashion silhouette",
    },
];

export default function EditorialPage() {
    return (
        <div className="min-h-screen bg-[#fafafa]">
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-luxury-gold/5 blur-[120px]" />
                <div className="absolute bottom-[10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-neutral-200/50 blur-[100px]" />
            </div>

            <div className="relative z-10">
                {/* Hero Section */}
                <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/images/home/hero_lookbook.png"
                            alt="Editorial Hero"
                            fill
                            className="object-cover object-top scale-105"
                            priority
                        />
                        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/20 to-black/60" />
                    </div>

                    <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
                        <span className="text-luxury-gold-light uppercase tracking-[0.3em] text-xs font-semibold mb-6 block">
                            Style Stories
                        </span>
                        <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight mb-6">
                            The Art of <span className="font-serif italic text-luxury-gold-light">Minimalism</span>
                        </h1>
                        <p className="text-white/80 text-lg max-w-xl mx-auto leading-relaxed">
                            Exploring the intersection of comfort, luxury, and timeless aesthetic — a deep dive into building a wardrobe that speaks volumes through subtle details.
                        </p>
                    </div>

                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-60">
                        <div className="w-[1px] h-12 bg-linear-to-b from-white/50 to-transparent" />
                    </div>
                </section>

                {/* Back Navigation */}
                <div className="max-w-4xl mx-auto px-4 pt-12 pb-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-luxury-charcoal transition-colors group"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                </div>

                {/* Introduction */}
                <div className="max-w-3xl mx-auto px-4 py-12">
                    <div className="text-center space-y-8">
                        <div className="w-16 h-[1px] bg-luxury-gold/50 mx-auto" />
                        <p className="text-lg text-neutral-500 leading-relaxed italic font-light">
                            In a world of endless options, the most radical choice is to choose less. Minimalism is not a trend — it is a return to what matters.
                        </p>
                        <div className="w-16 h-[1px] bg-luxury-gold/50 mx-auto" />
                    </div>
                </div>

                {/* Editorial Sections */}
                <div className="max-w-6xl mx-auto px-4 pb-24 space-y-32">
                    {sections.map((section, index) => (
                        <section
                            key={section.title}
                            className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12 lg:gap-20`}
                        >
                            <div className="w-full lg:w-1/2">
                                <div className={`relative aspect-[4/5] w-full max-w-md mx-auto ${index % 2 === 0 ? "lg:mr-auto rounded-t-full" : "lg:ml-auto rounded-b-full"} overflow-hidden`}>
                                    <Image
                                        src={section.image}
                                        alt={section.imageAlt}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            <div className="w-full lg:w-1/2 space-y-6">
                                <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-luxury-gold">
                                    Chapter {String(index + 1).padStart(2, "0")}
                                </span>
                                <h2 className="text-3xl md:text-4xl font-light text-luxury-charcoal tracking-tight leading-tight">
                                    {section.title}
                                </h2>
                                <p className="text-neutral-500 leading-relaxed">
                                    {section.content}
                                </p>
                            </div>
                        </section>
                    ))}
                </div>

                {/* Conclusion / CTA */}
                <section className="bg-luxury-charcoal py-24">
                    <div className="max-w-3xl mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight mb-8">
                            Ready to Curate Your <span className="font-serif italic text-luxury-gold-light">Wardrobe</span>?
                        </h2>
                        <p className="text-neutral-400 text-lg mb-10 leading-relaxed">
                            Explore our collection of thoughtfully designed pieces, each selected to help you build a wardrobe that is distinctly, effortlessly you.
                        </p>
                        <Link
                            href="/shop"
                            className="group inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-full text-sm font-semibold tracking-widest uppercase hover:bg-white/20 transition-all duration-500"
                        >
                            Explore the Collection
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}
