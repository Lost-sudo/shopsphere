import { ProductManagement } from "@/components/admin/ProductManagement";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function AdminProductsPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                        Product Inventory
                    </h1>
                    <p className="mt-2 text-slate-600 dark:text-slate-400 font-medium italic">
                        Manage your products, set pricing, and monitor stock levels.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-10 border-slate-200 dark:border-slate-800 flex items-center gap-2 font-semibold">
                        <Download className="w-4 h-4" />
                        Export CSV
                    </Button>
                </div>
            </div>

            {/* Product Management Component */}
            <ProductManagement />
        </div>
    );
}
