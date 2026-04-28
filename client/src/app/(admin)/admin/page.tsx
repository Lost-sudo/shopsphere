import { AdminStats } from "@/components/admin/AdminStats";
import { AdminCharts } from "@/components/admin/AdminCharts";
import { RecentOrders } from "@/components/admin/RecentOrders";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";

export default function AdminPage() {
    return (
        <div className="space-y-12 animate-fade-up">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-light tracking-tight text-luxury-charcoal">
                        Dashboard <span className="font-serif italic text-luxury-gold">Overview</span>
                    </h1>
                    <p className="mt-2 text-neutral-500 font-light">
                        Welcome back, <span className="font-medium text-luxury-charcoal">Administrator</span>. Here&apos;s your premium business summary.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" className="h-12 px-6 rounded-xl text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-luxury-charcoal transition-colors border border-white/60 bg-white/40 backdrop-blur-xl">
                        <Download className="w-4 h-4 mr-2" />
                        Export Report
                    </Button>
                    <Button className="h-12 px-8 bg-luxury-charcoal hover:bg-luxury-charcoal-light text-white rounded-xl shadow-lg shadow-black/5 uppercase tracking-widest text-xs font-bold transition-all active:scale-95 flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        New Order
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="animate-fade-up [animation-delay:100ms]">
                <AdminStats />
            </div>

            {/* Charts & Graphs */}
            <div className="animate-fade-up [animation-delay:200ms]">
                <AdminCharts />
            </div>

            {/* Bottom Section */}
            <div className="grid gap-8 lg:grid-cols-2 animate-fade-up [animation-delay:300ms]">
                <RecentOrders />
                {/* Placeholder for Quick Actions or Activity Feed */}
                <div className="bg-white/60 backdrop-blur-2xl border border-white/40 rounded-3xl p-8 shadow-xl shadow-black/5 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-luxury-gold/10 rounded-full flex items-center justify-center mb-4">
                        <Plus className="text-luxury-gold" size={24} />
                    </div>
                    <h3 className="text-luxury-charcoal font-medium">Quick Actions</h3>
                    <p className="text-neutral-500 text-sm mt-1 max-w-[200px]">
                        Add widgets or shortcuts to this space for faster management.
                    </p>
                </div>
            </div>
        </div>
    );
}

