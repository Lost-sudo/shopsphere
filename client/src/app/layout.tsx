import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ReduxProvider } from "@/providers/redux-provider";
import AuthGuard from "@/components/auth/AuthGuard";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "ShopSphere | Premium E-commerce Platform",
    description:
        "Shop the latest trends with ShopSphere. Secure, fast, and reliable.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${inter.variable} font-sans antialiased flex flex-col min-h-screen`}
            >
                <ReduxProvider>
                    <AuthGuard>{children}</AuthGuard>
                </ReduxProvider>
                <Toaster />
            </body>
        </html>
    );
}
