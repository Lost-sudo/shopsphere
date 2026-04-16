import CheckoutClient from "@/components/checkout/CheckoutClient";

export const metadata = {
    title: "Checkout | ShopSphere",
    description: "Review your items and complete your purchase.",
};

export default function CheckoutPage() {
    return (
        <div className="bg-gray-50/50 min-h-screen py-10">
            <CheckoutClient />
        </div>
    );
}
