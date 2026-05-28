import Link from "next/link";
import { ArrowLeft, Construction } from "lucide-react";

export default function TrackOrderPage() {
    return (
        <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-luxury-gold/5 blur-[120px]" />
                <div className="absolute bottom-[10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-neutral-200/50 blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-lg mx-auto px-4 text-center">
                <div className="w-20 h-20 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Construction size={36} className="text-luxury-gold" />
                </div>
                <h1 className="text-3xl md:text-4xl font-light text-luxury-charcoal tracking-tight mb-4">
                    Coming <span className="font-serif italic text-luxury-gold">Soon</span>
                </h1>
                <p className="text-neutral-500 leading-relaxed mb-8">
                    Real-time order tracking is currently in development. We&apos;re working hard to bring you a seamless tracking experience. In the meantime, please contact our support team for order status updates.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-luxury-charcoal transition-colors group"
                >
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
