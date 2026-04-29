import CheckoutClient from "@/components/checkout/CheckoutClient";

export const metadata = {
    title: "Checkout | ShopSphere",
    description: "Review your items and complete your purchase.",
};

export default function CheckoutPage() {
    return (
        <div className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 min-h-screen py-10">
            <CheckoutClient />
        </div>
    );
}
