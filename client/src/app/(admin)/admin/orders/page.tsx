import { OrderManagement } from "@/components/admin/OrderManagement";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function AdminOrdersPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                        Orders Management
                    </h1>
                    <p className="mt-2 text-slate-600 dark:text-slate-400 font-medium italic">
                        View, fulfill, and track customer orders here.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-10 border-slate-200 dark:border-slate-800 flex items-center gap-2 font-semibold">
                        <Download className="w-4 h-4" />
                        Export CSV
                    </Button>
                </div>
            </div>

            {/* Order Management Component */}
            <OrderManagement />
        </div>
    );
}
