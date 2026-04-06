import { AdminStats } from "@/components/admin/AdminStats";
import { AdminCharts } from "@/components/admin/AdminCharts";
import { RecentOrders } from "@/components/admin/RecentOrders";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";

export default function AdminPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                        Dashboard Overview
                    </h1>
                    <p className="mt-2 text-slate-600 dark:text-slate-400 font-medium">
                        Welcome back, Admin. Here&apos;s what&apos;s happening today.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-10 border-slate-200 dark:border-slate-800 flex items-center gap-2 font-semibold">
                        <Download className="w-4 h-4" />
                        Export Report
                    </Button>
                    <Button className="h-10 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 dark:shadow-none flex items-center gap-2 font-semibold">
                        <Plus className="w-4 h-4 font-black" />
                        New Order
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <AdminStats />

            {/* Charts & Graphs */}
            <AdminCharts />

            {/* Bottom Section */}
            <div className="grid gap-6 lg:grid-cols-2">
                <RecentOrders />
                {/* Could add another component here like Quick Actions or Activity Feed */}
            </div>
        </div>
    );
}
