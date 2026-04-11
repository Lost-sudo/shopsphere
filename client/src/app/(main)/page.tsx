import { HeroSection } from "@/components/home/HeroSection";
import { CategoryBar } from "@/components/home/CategoryBar";
import { FlashSale } from "@/components/home/FlashSale";
import { RecommendationGrid } from "@/components/home/RecommendationGrid";

export default function Home() {
    return (
        <div className="bg-gray-50 min-h-screen pb-20 overflow-hidden">
            <div className="animate-fade-up">
                <HeroSection />
            </div>

            <div className="animate-fade-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
                <CategoryBar />
            </div>

            <div className="animate-fade-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
                <FlashSale />
            </div>

            {/* Promotional Banner Placeholder */}
            <div className="container mx-auto px-4 py-8 animate-fade-up [animation-delay:600ms] opacity-0 [animation-fill-mode:forwards]">
                <div className="w-full h-24 bg-shopee/5 rounded-sm border border-shopee/10 flex items-center justify-center group overflow-hidden relative">
                    {/* Animated background element */}
                    <div className="absolute inset-0 bg-linear-to-r from-shopee/0 via-shopee/10 to-shopee/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <span className="text-shopee font-bold tracking-wide relative z-10 flex items-center gap-2">
                        <span className="animate-pulse">✨</span>
                        Limited Time Offer: Get 10% cash back on all tech products!
                        <span className="animate-pulse">✨</span>
                    </span>
                </div>
            </div>

            <div className="animate-fade-up [animation-delay:800ms] opacity-0 [animation-fill-mode:forwards]">
                <RecommendationGrid />
            </div>
        </div>
    );
}
