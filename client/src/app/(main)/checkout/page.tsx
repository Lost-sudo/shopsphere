import { Suspense } from "react";
import CheckoutClient from "@/components/checkout/CheckoutClient";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = {
    title: "Checkout | ShopSphere",
    description: "Review your items and complete your purchase.",
};

function CheckoutFallback() {
    return (
        <div className="container mx-auto px-4 py-8 space-y-8 max-w-6xl">
            <Skeleton className="h-10 w-48" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-40 w-full rounded-2xl" />
                    ))}
                </div>
                <Skeleton className="h-[400px] w-full rounded-2xl" />
            </div>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <div className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 min-h-screen py-10">
            <Suspense fallback={<CheckoutFallback />}>
                <CheckoutClient />
            </Suspense>
        </div>
    );
}
