import CartClient from "@/components/cart/CartClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Your Shopping Cart | ShopSphere",
    description: "Manage your shopping cart, update quantities, and prepare for checkout with ShopSphere.",
};

export default function CartPage() {
    return <CartClient />;
}
