import { HeroSection } from "@/components/home/HeroSection";
import { CategoryBar } from "@/components/home/CategoryBar";
import { FlashSale } from "@/components/home/FlashSale";
import { RecommendationGrid } from "@/components/home/RecommendationGrid";

export default function Home() {
    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <HeroSection />
            <CategoryBar />
            <FlashSale />

            {/* Promotional Banner Placeholder */}
            <div className="container mx-auto px-4 py-8">
                <div className="w-full h-24 bg-shopee/5 rounded-sm border border-shopee/10 flex items-center justify-center">
                    <span className="text-shopee font-medium">
                        ✨ Limited Time Offer: Get 10% cash back on all tech
                        products! ✨
                    </span>
                </div>
            </div>

            <RecommendationGrid />
        </div>
    );
}
