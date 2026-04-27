import { HeroLookbook } from "@/components/home/HeroLookbook";
import { TrendingCollections } from "@/components/home/TrendingCollections";
import { FeaturedProductsGrid } from "@/components/home/FeaturedProductsGrid";
import { StyleStories } from "@/components/home/StyleStories";

export default function Home() {
    return (
        <div className="bg-neutral-50 min-h-screen pb-0 overflow-hidden relative selection:bg-luxury-gold/20">
            {/* Ambient Background Glow for the entire page */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-luxury-gold/5 blur-[120px]" />
                <div className="absolute bottom-[10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-neutral-200/50 blur-[100px]" />
            </div>

            <div className="relative z-10">
                <HeroLookbook />
                
                <div className="animate-fade-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
                    <TrendingCollections />
                </div>

                <div className="animate-fade-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
                    <FeaturedProductsGrid />
                </div>

                <div className="animate-fade-up [animation-delay:600ms] opacity-0 [animation-fill-mode:forwards]">
                    <StyleStories />
                </div>
            </div>
        </div>
    );
}

