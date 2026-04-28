"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
    Search, 
    SlidersHorizontal, 
    ChevronRight, 
    X,
    Filter,
    ArrowUpDown
} from "lucide-react";
import { useGetProductsQuery } from "@/features/product/product.api";
import { useGetCategoriesQuery } from "@/features/category/category.api";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function ShopPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    
    const categoryId = searchParams.get("category") || undefined;
    const initialSearch = searchParams.get("search") || "";
    const sort = (searchParams.get("sort") as any) || "newest";

    const [searchTerm, setSearchTerm] = useState(initialSearch);
    const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const { data: categoriesData, isLoading: isLoadingCategories } = useGetCategoriesQuery();
    const { data: productsData, isLoading: isLoadingProducts, isFetching } = useGetProductsQuery({
        categoryId,
        search: debouncedSearch || undefined,
        sort,
        limit: 20,
    });

    const categories = categoriesData?.data?.categories || [];
    const products = productsData?.data?.products || [];

    const activeCategory = categories.find(c => c.id === categoryId);

    const handleCategoryChange = (id: string | null) => {
        const params = new URLSearchParams(searchParams.toString());
        if (id) {
            params.set("category", id);
        } else {
            params.delete("category");
        }
        router.push(`/shop?${params.toString()}`);
    };

    const handleSortChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("sort", value);
        router.push(`/shop?${params.toString()}`);
    };

    const clearFilters = () => {
        router.push("/shop");
        setSearchTerm("");
    };

    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#fafafa]">
            {/* Mobile Filter Drawer */}
            {isMobileFilterOpen && (
                <div className="fixed inset-0 z-[100] lg:hidden">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)} />
                    <div className="absolute left-0 top-0 bottom-0 w-[300px] bg-white shadow-2xl p-6 flex flex-col gap-8 animate-in slide-in-from-left duration-300">
                        <div className="flex items-center justify-between border-b pb-4">
                            <h2 className="text-luxury-charcoal font-serif italic text-2xl">Filters</h2>
                            <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 hover:bg-neutral-100 rounded-full">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-luxury-charcoal">Categories</h3>
                            <div className="flex flex-wrap gap-2">
                                <Badge 
                                    variant={!categoryId ? "default" : "outline"}
                                    className={`cursor-pointer px-4 py-1.5 rounded-full ${!categoryId ? "bg-luxury-charcoal" : ""}`}
                                    onClick={() => { handleCategoryChange(null); setIsMobileFilterOpen(false); }}
                                >
                                    All
                                </Badge>
                                {categories.map(c => (
                                    <Badge 
                                        key={c.id}
                                        variant={categoryId === c.id ? "default" : "outline"}
                                        className={`cursor-pointer px-4 py-1.5 rounded-full ${categoryId === c.id ? "bg-luxury-charcoal" : ""}`}
                                        onClick={() => { handleCategoryChange(c.id); setIsMobileFilterOpen(false); }}
                                    >
                                        {c.name}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-luxury-charcoal">Price Range</h3>
                            <div className="flex items-center gap-2">
                                <Input placeholder="Min" className="h-9 text-xs" type="number" />
                                <span className="text-neutral-400">−</span>
                                <Input placeholder="Max" className="h-9 text-xs" type="number" />
                            </div>
                            <Button className="w-full bg-luxury-charcoal hover:bg-black text-white rounded-full text-[10px] font-bold uppercase tracking-widest h-9">
                                Apply
                            </Button>
                        </div>

                        <div className="mt-auto">
                            <Button 
                                onClick={clearFilters}
                                variant="outline" 
                                className="w-full rounded-full border-black/10 text-[10px] font-bold uppercase tracking-widest"
                            >
                                Reset All
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Hero Header */}
            <div className="bg-luxury-charcoal text-white py-16 px-4">
                <div className="container mx-auto max-w-7xl">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <h1 className="text-4xl md:text-5xl font-light tracking-tight">
                            The <span className="font-serif italic text-luxury-gold">Collection</span>
                        </h1>
                        <p className="text-neutral-400 max-w-lg mx-auto text-sm font-medium tracking-widest uppercase">
                            {activeCategory ? activeCategory.name : "Curated pieces for the modern lifestyle"}
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-7xl px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    
                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-64 shrink-0 space-y-10">
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-luxury-charcoal mb-6 border-b border-black/5 pb-4">
                                Categories
                            </h3>
                            <ul className="space-y-4">
                                <li>
                                    <button 
                                        onClick={() => handleCategoryChange(null)}
                                        className={`text-sm transition-colors hover:text-luxury-gold flex items-center justify-between w-full group ${!categoryId ? "text-luxury-gold font-semibold" : "text-neutral-500"}`}
                                    >
                                        <span>All Products</span>
                                        <ChevronRight size={14} className={`opacity-0 group-hover:opacity-100 transition-opacity ${!categoryId ? "opacity-100" : ""}`} />
                                    </button>
                                </li>
                                {isLoadingCategories ? (
                                    Array(5).fill(0).map((_, i) => (
                                        <li key={i}><Skeleton className="h-4 w-full" /></li>
                                    ))
                                ) : (
                                    categories.map((category) => (
                                        <li key={category.id}>
                                            <button 
                                                onClick={() => handleCategoryChange(category.id)}
                                                className={`text-sm transition-colors hover:text-luxury-gold flex items-center justify-between w-full group ${categoryId === category.id ? "text-luxury-gold font-semibold" : "text-neutral-500"}`}
                                            >
                                                <span>{category.name}</span>
                                                <ChevronRight size={14} className={`opacity-0 group-hover:opacity-100 transition-opacity ${categoryId === category.id ? "opacity-100" : ""}`} />
                                            </button>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-luxury-charcoal mb-6 border-b border-black/5 pb-4">
                                Price Range
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Input placeholder="Min" className="h-9 text-xs" type="number" />
                                    <span className="text-neutral-400">−</span>
                                    <Input placeholder="Max" className="h-9 text-xs" type="number" />
                                </div>
                                <Button className="w-full bg-luxury-charcoal hover:bg-black text-white rounded-full text-[10px] font-bold uppercase tracking-widest h-9">
                                    Apply Filter
                                </Button>
                            </div>
                        </div>

                        <div className="pt-6">
                            <div className="bg-luxury-charcoal/5 rounded-2xl p-6 border border-black/5">
                                <h4 className="text-xs font-bold text-luxury-charcoal mb-2">Need help?</h4>
                                <p className="text-[11px] text-neutral-500 leading-relaxed mb-4">
                                    Our style consultants are available 24/7 to assist you.
                                </p>
                                <button className="text-[10px] font-bold uppercase tracking-tighter text-luxury-gold hover:underline">
                                    Contact Specialist
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="grow space-y-8">
                        {/* Toolbar */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-black/5 shadow-sm">
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="lg:hidden flex items-center gap-2 rounded-full border-black/10"
                                    onClick={() => setIsMobileFilterOpen(true)}
                                >
                                    <SlidersHorizontal size={14} />
                                    Filters
                                </Button>

                                <div className="relative flex-1 sm:w-64">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={14} />
                                    <Input 
                                        placeholder="Search pieces..." 
                                        className="pl-9 h-10 rounded-full border-black/10 bg-white/50 focus:bg-white transition-all text-sm"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    {searchTerm && (
                                        <button 
                                            onClick={() => setSearchTerm("")}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-luxury-charcoal"
                                        >
                                            <X size={14} />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                                <p className="text-[11px] font-medium text-neutral-400 uppercase tracking-widest">
                                    {products.length} Products Found
                                </p>
                                <div className="h-4 w-px bg-black/10 hidden sm:block" />
                                <Select value={sort} onValueChange={handleSortChange}>
                                    <SelectTrigger className="w-[140px] h-10 rounded-full border-black/10 bg-white/50 text-xs font-semibold uppercase tracking-widest">
                                        <div className="flex items-center gap-2">
                                            <ArrowUpDown size={12} />
                                            <SelectValue placeholder="Sort By" />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="newest">Newest First</SelectItem>
                                        <SelectItem value="price_asc">Price: Low to High</SelectItem>
                                        <SelectItem value="price_desc">Price: High to Low</SelectItem>
                                        <SelectItem value="oldest">Oldest First</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Active Filters */}
                        {(categoryId || debouncedSearch) && (
                            <div className="flex items-center flex-wrap gap-2">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mr-2">Active:</span>
                                {categoryId && (
                                    <Badge variant="secondary" className="bg-luxury-gold/10 text-luxury-gold border-luxury-gold/20 flex items-center gap-1 rounded-full px-3 py-1">
                                        {activeCategory?.name}
                                        <X size={12} className="cursor-pointer" onClick={() => handleCategoryChange(null)} />
                                    </Badge>
                                )}
                                {debouncedSearch && (
                                    <Badge variant="secondary" className="bg-luxury-charcoal/10 text-luxury-charcoal border-luxury-charcoal/20 flex items-center gap-1 rounded-full px-3 py-1">
                                        "{debouncedSearch}"
                                        <X size={12} className="cursor-pointer" onClick={() => setSearchTerm("")} />
                                    </Badge>
                                )}
                                <button 
                                    onClick={clearFilters}
                                    className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-luxury-charcoal transition-colors ml-2 underline underline-offset-4"
                                >
                                    Clear All
                                </button>
                            </div>
                        )}

                        {/* Product Grid */}
                        {isLoadingProducts ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {Array(6).fill(0).map((_, i) => (
                                    <div key={i} className="space-y-4">
                                        <Skeleton className="aspect-[4/5] w-full rounded-2xl" />
                                        <Skeleton className="h-4 w-2/3" />
                                        <Skeleton className="h-4 w-1/3" />
                                    </div>
                                ))}
                            </div>
                        ) : products.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                                {products.map((product) => (
                                    <div key={product.id} className="group relative">
                                        <div className="aspect-[4/5] relative overflow-hidden rounded-[2rem] bg-neutral-100 border border-black/5">
                                            <img 
                                                src={product.images[0] || "/placeholder.png"} 
                                                alt={product.name}
                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-6">
                                                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 w-full">
                                                    <Button 
                                                        asChild
                                                        className="w-full bg-white text-luxury-charcoal hover:bg-luxury-gold hover:text-white rounded-full h-12 text-xs font-bold uppercase tracking-widest"
                                                    >
                                                        <a href={`/product/${product.id}`}>View Details</a>
                                                    </Button>
                                                </div>
                                            </div>
                                            {product.stock <= 5 && product.stock > 0 && (
                                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-red-600 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                                                    Limited Stock
                                                </div>
                                            )}
                                            {product.stock === 0 && (
                                                <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                                                    <span className="text-luxury-charcoal text-[10px] font-black uppercase tracking-[0.2em] border-2 border-luxury-charcoal px-4 py-2">
                                                        Sold Out
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="mt-6 flex justify-between items-start">
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-bold text-luxury-gold uppercase tracking-[0.2em]">
                                                    {categories.find(c => c.id === product.categoryId)?.name || "Collection"}
                                                </p>
                                                <h3 className="text-sm font-medium text-luxury-charcoal line-clamp-1 group-hover:text-luxury-gold transition-colors">
                                                    {product.name}
                                                </h3>
                                            </div>
                                            <p className="text-sm font-serif italic text-luxury-charcoal">
                                                ₱{product.price.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-24 text-center space-y-6 bg-white rounded-[3rem] border border-dashed border-black/10">
                                <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mx-auto">
                                    <Search size={32} className="text-neutral-300" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-light text-luxury-charcoal">No pieces found</h3>
                                    <p className="text-sm text-neutral-500 max-w-xs mx-auto">
                                        We couldn't find any products matching your current filters. Try broadening your search.
                                    </p>
                                </div>
                                <Button 
                                    onClick={clearFilters}
                                    variant="outline" 
                                    className="rounded-full px-8 border-black/10 text-xs font-bold uppercase tracking-widest"
                                >
                                    Reset All Filters
                                </Button>
                            </div>
                        )}

                        {/* Pagination placeholder */}
                        {products.length > 0 && productsData?.data?.totalPages && productsData.data.totalPages > 1 && (
                            <div className="pt-12 border-t border-black/5 flex items-center justify-center gap-2">
                                <Button variant="ghost" disabled size="sm" className="rounded-full w-10 h-10 p-0">
                                    <ChevronRight className="rotate-180" size={16} />
                                </Button>
                                {Array.from({ length: productsData.data.totalPages }).map((_, i) => (
                                    <Button 
                                        key={i}
                                        variant={productsData.data.page === i + 1 ? "default" : "ghost"}
                                        className={`rounded-full w-10 h-10 p-0 text-xs font-bold ${productsData.data.page === i + 1 ? "bg-luxury-charcoal" : ""}`}
                                    >
                                        {i + 1}
                                    </Button>
                                ))}
                                <Button variant="ghost" size="sm" className="rounded-full w-10 h-10 p-0">
                                    <ChevronRight size={16} />
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}