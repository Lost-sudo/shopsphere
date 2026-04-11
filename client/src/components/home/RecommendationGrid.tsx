"use client";

import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { useGetProductsQuery } from "@/features/product/product.api";
import { Skeleton } from "@/components/ui/skeleton";

export function RecommendationGrid() {
    const { data, isLoading } = useGetProductsQuery({ isActive: true, limit: 12 });
    
    const products = data?.data?.products || [];

    if (isLoading) {
        return (
            <section className="container mx-auto px-4 py-8">
                <div className="sticky top-0 z-20 bg-gray-50/80 backdrop-blur-sm pt-4 pb-4 border-b-2 border-shopee mb-6">
                    <h2 className="text-shopee text-center text-lg font-bold uppercase tracking-wider">
                        Daily Discover
                    </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="bg-white p-2.5 rounded-sm border border-gray-100">
                            <Skeleton className="aspect-square w-full mb-3" />
                            <Skeleton className="h-4 w-3/4 mb-2" />
                            <Skeleton className="h-6 w-1/2 mb-4" />
                            <div className="flex justify-between items-center">
                                <Skeleton className="h-3 w-1/4" />
                                <Skeleton className="h-7 w-7 rounded-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    if (products.length === 0) {
        return (
            <section className="container mx-auto px-4 py-8">
                <div className="sticky top-0 z-20 bg-gray-50/80 backdrop-blur-sm pt-4 pb-4 border-b-2 border-shopee mb-6">
                    <h2 className="text-shopee text-center text-lg font-bold uppercase tracking-wider">
                        Daily Discover
                    </h2>
                </div>
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-sm border border-dashed border-gray-300">
                    <div className="text-gray-400 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <p className="text-gray-500 font-light">No products found yet. Start adding some!</p>
                </div>
            </section>
        );
    }

    return (
        <section className="container mx-auto px-4 py-8">
            <div className="sticky top-0 z-20 bg-gray-50/80 backdrop-blur-sm pt-4 pb-4 border-b-2 border-shopee mb-6">
                <h2 className="text-shopee text-center text-lg font-bold uppercase tracking-wider">
                    Daily Discover
                </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {products.map((product, index) => (
                    <div 
                        key={product.id} 
                        className="animate-fade-up opacity-0 [animation-fill-mode:forwards]"
                        style={{ animationDelay: `${(index % 12) * 50}ms` }}
                    >
                        <ProductCard 
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            image={product.images[0] || "/images/placeholder.png"}
                            rating={4.5} // No rating in DB yet
                            soldCount={0} // No sold count in DB yet
                        />
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-12">
                <Button
                    variant="outline"
                    className="px-12 py-6 border-gray-300 hover:bg-gray-100 text-gray-600 transition-all font-light"
                >
                    See More
                </Button>
            </div>
        </section>
    );
}

