"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
    Star, 
    ShoppingCart, 
    ShieldCheck, 
    Truck, 
    RefreshCcw, 
    Minus, 
    Plus,
    Heart,
    Share2,
    ChevronLeft,
    ChevronRight,
    Check
} from "lucide-react";
import { useGetProductQuery } from "@/features/product/product.api";
import { useAddItemMutation } from "@/features/cart/cart.api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ProductPageProps {
    params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
    const { id } = use(params);
    const router = useRouter();
    const { data, isLoading, isError } = useGetProductQuery(id);
    const [addItem, { isLoading: isAdding }] = useAddItemMutation();
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const product = data?.data?.product;
    const images = product?.images || [];
    const mainImage = images[selectedImage] || "/images/placeholder.png";

    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat("en-PH", {
            style: "currency",
            currency: "PHP",
        }).format(amount);
    };

    const handleAddToCart = async () => {
        if (!product) return;
        try {
            await addItem({ productId: product.id, quantity }).unwrap();
            toast.success("Added to cart!", {
                description: `${quantity}x ${product.name} added to your cart.`,
            });
        } catch (err: unknown) {
            const error = err as { status?: number; data?: { message?: string } };
            if (error.status === 401) {
                toast.error("Please login first", {
                    description: "You need to be logged in to add items to your cart.",
                });
                router.push("/login");
            } else {
                toast.error("Failed to add to cart", {
                    description: error?.data?.message || "Something went wrong. Please try again.",
                });
            }
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#fafafa] py-12 px-4">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <div className="space-y-6">
                            <Skeleton className="aspect-[4/5] w-full rounded-[2.5rem]" />
                            <div className="flex gap-4">
                                <Skeleton className="h-24 w-24 rounded-2xl" />
                                <Skeleton className="h-24 w-24 rounded-2xl" />
                                <Skeleton className="h-24 w-24 rounded-2xl" />
                            </div>
                        </div>
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <Skeleton className="h-6 w-32 rounded-full" />
                                <Skeleton className="h-12 w-full rounded-2xl" />
                                <Skeleton className="h-8 w-40 rounded-xl" />
                            </div>
                            <Skeleton className="h-32 w-full rounded-3xl" />
                            <div className="flex gap-4">
                                <Skeleton className="h-16 w-32 rounded-full" />
                                <Skeleton className="h-16 w-full rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (isError || !product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#fafafa]">
                <div className="bg-white/60 backdrop-blur-2xl p-12 rounded-[3rem] border border-black/5 shadow-2xl text-center space-y-6 max-w-md">
                    <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto">
                        <ShoppingCart size={32} className="text-neutral-300" />
                    </div>
                    <h2 className="text-2xl font-light text-luxury-charcoal">Piece Not Found</h2>
                    <p className="text-sm text-neutral-500 leading-relaxed">
                        This specific item might have been moved or is no longer part of our current collection.
                    </p>
                    <Button asChild className="bg-luxury-charcoal hover:bg-black text-white rounded-full px-8 py-6 h-auto text-xs font-bold uppercase tracking-widest transition-all hover:scale-105">
                        <Link href="/shop">Browse Collection</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fafafa]">
            {/* Breadcrumbs */}
            <div className="container mx-auto max-w-7xl px-4 py-8">
                <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                    <Link href="/" className="hover:text-luxury-gold transition-colors">Home</Link>
                    <ChevronRight size={10} />
                    <Link href="/shop" className="hover:text-luxury-gold transition-colors">Shop</Link>
                    <ChevronRight size={10} />
                    <span className="text-luxury-charcoal truncate max-w-[150px] md:max-w-none">{product.name}</span>
                </nav>
            </div>

            <div className="container mx-auto max-w-7xl px-4 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    
                    {/* Left: Editorial Gallery */}
                    <div className="space-y-6">
                        <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-neutral-100 border border-black/5 shadow-2xl group">
                            <Image
                                src={mainImage}
                                alt={product.name}
                                fill
                                unoptimized
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                priority
                            />
                            
                            {/* Action Floating Buttons */}
                            <div className="absolute top-8 right-8 flex flex-col gap-3 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                                <button 
                                    onClick={() => setIsWishlisted(!isWishlisted)}
                                    className={cn(
                                        "w-12 h-12 rounded-full backdrop-blur-xl flex items-center justify-center shadow-lg transition-all border",
                                        isWishlisted 
                                            ? "bg-red-500 border-red-400 text-white" 
                                            : "bg-white/80 border-white text-luxury-charcoal hover:text-red-500"
                                    )}
                                >
                                    <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
                                </button>
                                <button className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-xl border border-white flex items-center justify-center text-luxury-charcoal shadow-lg hover:text-luxury-gold transition-all">
                                    <Share2 size={20} />
                                </button>
                            </div>

                            {/* Image Counter Overlay */}
                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-luxury-charcoal/80 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full border border-white/10">
                                {selectedImage + 1} / {images.length || 1}
                            </div>
                        </div>
                        
                        {images.length > 1 && (
                            <div className="grid grid-cols-4 md:grid-cols-5 gap-4">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={cn(
                                            "relative aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300",
                                            selectedImage === idx 
                                                ? "border-luxury-gold shadow-lg shadow-luxury-gold/20 scale-95" 
                                                : "border-transparent hover:border-black/10 opacity-70 hover:opacity-100"
                                        )}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${product.name} view ${idx + 1}`}
                                            fill
                                            unoptimized
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Product Info Editorial */}
                    <div className="lg:sticky lg:top-32 space-y-10">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <Badge className="bg-luxury-gold/10 text-luxury-gold border-luxury-gold/20 hover:bg-luxury-gold/20 font-bold px-4 py-1.5 rounded-full text-[9px] uppercase tracking-[0.2em]">
                                    {product.category?.name || "Premium Piece"}
                                </Badge>
                                <div className="h-px w-12 bg-black/10" />
                                <div className="flex items-center gap-1 text-luxury-gold">
                                    <Star size={10} fill="currentColor" />
                                    <span className="text-[10px] font-black tracking-widest text-neutral-400 ml-1">4.9 RATING</span>
                                </div>
                            </div>
                            
                            <h1 className="text-4xl md:text-5xl font-light text-luxury-charcoal leading-[1.1] tracking-tight">
                                {product.name.split(' ').map((word, i) => (
                                    i === product.name.split(' ').length - 1 ? 
                                    <span key={i} className="font-serif italic text-luxury-gold block md:inline">{word}</span> : 
                                    <span key={i}>{word} </span>
                                ))}
                            </h1>
                            
                            <div className="flex items-baseline gap-6">
                                <span className="text-3xl font-serif italic text-luxury-charcoal">
                                    {formatPrice(product.price)}
                                </span>
                                {product.price && (
                                    <span className="text-sm text-neutral-400 line-through font-medium">
                                        {formatPrice(product.price * 1.25)}
                                    </span>
                                )}
                            </div>

                            <div className="prose prose-neutral max-w-none">
                                <p className="text-neutral-500 leading-relaxed text-sm font-medium tracking-wide">
                                    {product.description || "Indulge in the epitome of craftsmanship. This piece is meticulously designed to offer a perfect blend of timeless elegance and contemporary sophistication, making it an essential addition to your curated wardrobe."}
                                </p>
                            </div>
                        </div>

                        {/* Size/Variant Selector Placeholder (as per design doc) */}
                        <div className="space-y-4 pt-6 border-t border-black/5">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-luxury-charcoal">Select Size</span>
                                <button className="text-[9px] font-bold text-luxury-gold uppercase tracking-widest hover:underline underline-offset-4 transition-all">Size Guide</button>
                            </div>
                            <div className="grid grid-cols-4 gap-3">
                                {['XS', 'S', 'M', 'L'].map((size) => (
                                    <button 
                                        key={size}
                                        className={cn(
                                            "h-12 rounded-2xl border flex items-center justify-center text-xs font-bold transition-all",
                                            size === 'M' 
                                                ? "bg-luxury-charcoal text-white border-luxury-charcoal" 
                                                : "border-black/5 text-neutral-400 hover:border-black/20 hover:text-luxury-charcoal"
                                        )}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Actions Glass Panel */}
                        <div className="bg-white/60 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-black/5 shadow-xl space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center bg-[#fafafa] rounded-full p-1.5 border border-black/5">
                                    <button 
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-luxury-charcoal hover:bg-white hover:shadow-sm transition-all"
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span className="w-10 text-center font-bold text-xs">{quantity}</span>
                                    <button 
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-luxury-charcoal hover:bg-white hover:shadow-sm transition-all"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                                <div className="text-right">
                                    <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest mb-1">Total</p>
                                    <p className="text-lg font-serif italic text-luxury-charcoal">{formatPrice(product.price * quantity)}</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <Button 
                                    className="w-full bg-luxury-charcoal hover:bg-black text-white rounded-full h-16 text-xs font-bold uppercase tracking-[0.2em] transition-all hover:scale-[1.02] shadow-xl shadow-black/10 active:scale-95"
                                    onClick={handleAddToCart}
                                    disabled={isAdding}
                                >
                                    <ShoppingCart size={16} className="mr-2" />
                                    {isAdding ? "Adding to Collection..." : "Add to Bag"}
                                </Button>
                                
                                <p className="text-center text-[9px] font-medium text-neutral-400 uppercase tracking-widest mt-2">
                                    {product.stock > 0 ? (
                                        <span className="text-green-600 flex items-center justify-center gap-1.5">
                                            <Check size={10} strokeWidth={3} /> {product.stock} items available in boutique
                                        </span>
                                    ) : (
                                        <span className="text-red-500">Currently out of stock</span>
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* Heritage / Service Perks */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                            <div className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-2xl bg-white border border-black/5 flex items-center justify-center text-luxury-charcoal shadow-sm group-hover:bg-luxury-charcoal group-hover:text-white transition-all duration-500">
                                    <ShieldCheck size={18} strokeWidth={1.5} />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-[10px] font-bold text-luxury-charcoal uppercase tracking-widest">Authenticity</p>
                                    <p className="text-[9px] text-neutral-400 font-medium">Guaranteed Genuine</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-2xl bg-white border border-black/5 flex items-center justify-center text-luxury-charcoal shadow-sm group-hover:bg-luxury-charcoal group-hover:text-white transition-all duration-500">
                                    <Truck size={18} strokeWidth={1.5} />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-[10px] font-bold text-luxury-charcoal uppercase tracking-widest">Concierge</p>
                                    <p className="text-[9px] text-neutral-400 font-medium">Premium Delivery</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-2xl bg-white border border-black/5 flex items-center justify-center text-luxury-charcoal shadow-sm group-hover:bg-luxury-charcoal group-hover:text-white transition-all duration-500">
                                    <RefreshCcw size={18} strokeWidth={1.5} />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-[10px] font-bold text-luxury-charcoal uppercase tracking-widest">Returns</p>
                                    <p className="text-[9px] text-neutral-400 font-medium">15 Day Grace Period</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Editorial Story Section */}
                <div className="mt-32 border-t border-black/5 pt-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h2 className="text-3xl md:text-5xl font-light text-luxury-charcoal tracking-tight leading-tight">
                                Behind the <br />
                                <span className="font-serif italic text-luxury-gold">Craftsmanship</span>
                            </h2>
                            <p className="text-neutral-500 text-lg leading-relaxed font-light">
                                Each {product.name} tells a story of meticulous attention to detail and a commitment to sustainable fashion. We believe that true luxury lies in the quality of materials and the skill of the artisans who bring them to life.
                            </p>
                            <div className="flex items-center gap-8 pt-4">
                                <div className="text-center">
                                    <p className="text-2xl font-serif italic text-luxury-charcoal">100%</p>
                                    <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest mt-1">Premium Fabric</p>
                                </div>
                                <div className="w-px h-12 bg-black/5" />
                                <div className="text-center">
                                    <p className="text-2xl font-serif italic text-luxury-charcoal">Hand</p>
                                    <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest mt-1">Finished Pieces</p>
                                </div>
                                <div className="w-px h-12 bg-black/5" />
                                <div className="text-center">
                                    <p className="text-2xl font-serif italic text-luxury-charcoal">Ethical</p>
                                    <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest mt-1">Sourcing</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="aspect-[3/4] rounded-[2rem] overflow-hidden bg-neutral-100 relative">
                                <Image 
                                    src={images[1] || images[0] || "/placeholder.png"} 
                                    alt="Craftsmanship detail 1" 
                                    fill 
                                    unoptimized 
                                    className="object-cover" 
                                />
                            </div>
                            <div className="aspect-[3/4] rounded-[2rem] overflow-hidden bg-neutral-100 relative mt-12">
                                <Image 
                                    src={images[2] || images[0] || "/placeholder.png"} 
                                    alt="Craftsmanship detail 2" 
                                    fill 
                                    unoptimized 
                                    className="object-cover" 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
