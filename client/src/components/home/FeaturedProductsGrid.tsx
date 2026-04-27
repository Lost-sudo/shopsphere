import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

const products = [
    {
        id: 1,
        name: "Classic Leather Chelsea",
        price: "$295",
        image: "/images/home/featured_masonry_1.png",
        aspectRatio: "aspect-[3/4]",
    },
    {
        id: 2,
        name: "Oversized Wool Blend Coat",
        price: "$450",
        image: "/images/home/trending_streetwear.png",
        aspectRatio: "aspect-square",
    },
    {
        id: 3,
        name: "Minimalist Gold Watch",
        price: "$1,200",
        image: "/images/home/trending_minimal.png",
        aspectRatio: "aspect-[4/5]",
    },
    {
        id: 4,
        name: "Linen Summer Dress",
        price: "$180",
        image: "/images/home/trending_summer.png",
        aspectRatio: "aspect-[3/4]",
    },
];

export function FeaturedProductsGrid() {
    return (
        <section className="py-24 px-4 container mx-auto max-w-7xl">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-light text-luxury-charcoal tracking-tight">
                    Featured <span className="font-serif italic text-luxury-gold">Pieces</span>
                </h2>
                <p className="text-neutral-500 mt-4 font-medium tracking-wide max-w-xl mx-auto">
                    Explore our latest arrivals, crafted with precision and designed to elevate your personal style.
                </p>
            </div>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                {products.map((product) => (
                    <div key={product.id} className="break-inside-avoid">
                        <div className="group relative overflow-hidden rounded-2xl bg-neutral-100">
                            <div className={`relative w-full ${product.aspectRatio}`}>
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <Link
                                    href={`/product/${product.id}`}
                                    className="bg-white/90 text-luxury-charcoal px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest hover:bg-luxury-charcoal hover:text-white transition-colors"
                                >
                                    Quick View
                                </Link>
                            </div>
                            
                            {/* Wishlist Button */}
                            <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/50 backdrop-blur-md flex items-center justify-center text-luxury-charcoal hover:bg-white hover:text-luxury-gold transition-colors opacity-0 group-hover:opacity-100 shadow-sm">
                                <Heart className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <div className="mt-4 px-2">
                            <h3 className="text-sm font-medium text-luxury-charcoal">{product.name}</h3>
                            <p className="text-sm text-neutral-500 mt-1">{product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-16 text-center">
                <Link
                    href="/shop"
                    className="inline-block border border-luxury-charcoal text-luxury-charcoal px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-widest hover:bg-luxury-charcoal hover:text-white transition-colors"
                >
                    View All Products
                </Link>
            </div>
        </section>
    );
}
