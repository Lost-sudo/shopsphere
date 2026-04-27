import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function StyleStories() {
    return (
        <section className="py-24 px-4 bg-white">
            <div className="container mx-auto max-w-7xl">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Image Section */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:mr-auto rounded-t-full overflow-hidden">
                            <Image
                                src="/images/home/hero_lookbook.png"
                                alt="Style Story Inspiration"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-10 -right-4 lg:right-10 w-48 aspect-square rounded-full overflow-hidden border-8 border-white hidden md:block">
                            <Image
                                src="/images/home/trending_minimal.png"
                                alt="Accessories"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Text Section */}
                    <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
                        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-luxury-gold mb-4 block">
                            Style Stories
                        </span>
                        <h2 className="text-4xl md:text-5xl font-light text-luxury-charcoal tracking-tight mb-8 leading-tight">
                            The Art of <span className="font-serif italic text-luxury-gold">Minimalism</span>
                        </h2>
                        <p className="text-neutral-500 text-lg mb-6 leading-relaxed">
                            Discover how to build a versatile wardrobe that speaks volumes through subtle details. Our latest editorial explores the intersection of comfort and high fashion.
                        </p>
                        <p className="text-neutral-500 text-lg mb-10 leading-relaxed">
                            From structured coats to fluid dresses, find inspiration for your next iconic look.
                        </p>
                        <Link
                            href="/editorial"
                            className="group inline-flex items-center gap-3 border-b border-luxury-charcoal pb-2 text-sm font-semibold tracking-widest uppercase text-luxury-charcoal hover:text-luxury-gold hover:border-luxury-gold transition-colors"
                        >
                            Read the Editorial
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
