import { Loader2 } from "lucide-react";

export const FullPageLoader = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
            <div className="relative flex flex-col items-center gap-8 text-center animate-in fade-in zoom-in-95 duration-500">
                <div className="relative">
                    {/* Pulsing background circle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 rounded-full bg-primary/10 animate-pulse duration-1000" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-32 w-32 rounded-full border border-primary/5 animate-ping duration-2000" />

                    <div className="relative flex items-center justify-center">
                        <Loader2 className="h-16 w-16 animate-spin text-primary stroke-[1.5]" />
                    </div>
                </div>

                <div className="flex flex-col items-center gap-3">
                    <div className="space-y-1">
                        <h2 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl">
                            ShopSphere
                        </h2>
                        <div className="h-1 w-12 bg-primary mx-auto rounded-full" />
                    </div>
                    <p className="text-muted-foreground font-medium animate-pulse tracking-wide uppercase text-xs">
                        Securely connecting to your account
                    </p>
                </div>
            </div>

            {/* Subtle bottom text or version */}
            <div className="absolute bottom-8 text-[10px] text-muted-foreground font-mono uppercase tracking-[0.2em]">
                System V1.0 • Authorized Access Only
            </div>
        </div>
    );
};
