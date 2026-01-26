import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
    const footerSections = [
        {
            title: "CUSTOMER SERVICE",
            links: [
                "Help Centre",
                "ShopSphere Blog",
                "ShopSphere Mall",
                "How To Buy",
                "How To Sell",
                "Payment",
                "ShopSphere Coins",
                "Shipping",
                "Return & Refund",
                "Contact Us",
                "Warranty Policy",
            ],
        },
        {
            title: "ABOUT SHOPSPHERE",
            links: [
                "About Us",
                "ShopSphere Careers",
                "ShopSphere Policies",
                "Privacy Policy",
                "ShopSphere Mall",
                "Seller Centre",
                "Flash Deals",
                "Media Contact",
            ],
        },
    ];

    return (
        <footer className="bg-gray-50 pt-12 pb-8 border-t border-gray-200 mt-auto">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {footerSections.map((section) => (
                    <div key={section.title}>
                        <h4 className="text-xs font-bold text-gray-700 mb-4 uppercase">
                            {section.title}
                        </h4>
                        <ul className="space-y-2">
                            {section.links.map((link) => (
                                <li key={link}>
                                    <Link
                                        href="#"
                                        className="text-xs text-gray-600 hover:text-shopee transition-colors"
                                    >
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                <div>
                    <h4 className="text-xs font-bold text-gray-700 mb-4 uppercase">
                        PAYMENT
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div
                                key={i}
                                className="bg-white p-2 border border-gray-100 rounded-sm shadow-sm aspect-3/2 flex items-center justify-center text-[10px] text-gray-300 italic"
                            >
                                Image
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="text-xs font-bold text-gray-700 mb-4 uppercase">
                        LOGISTICS
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div
                                key={i}
                                className="bg-white p-2 border border-gray-100 rounded-sm shadow-sm aspect-3/2 flex items-center justify-center text-[10px] text-gray-300 italic"
                            >
                                Logistics
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="text-xs font-bold text-gray-700 mb-4 uppercase">
                        FOLLOW US
                    </h4>
                    <div className="space-y-3">
                        <Link
                            href="#"
                            className="flex items-center gap-2 text-xs text-gray-600 hover:text-shopee group"
                        >
                            <Facebook
                                size={16}
                                className="text-gray-600 group-hover:text-shopee"
                            />
                            <span>Facebook</span>
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-2 text-xs text-gray-600 hover:text-shopee group"
                        >
                            <Instagram
                                size={16}
                                className="text-gray-600 group-hover:text-shopee"
                            />
                            <span>Instagram</span>
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-2 text-xs text-gray-600 hover:text-shopee group"
                        >
                            <Twitter
                                size={16}
                                className="text-gray-600 group-hover:text-shopee"
                            />
                            <span>Twitter</span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
                    <p>© 2024 ShopSphere. All Rights Reserved.</p>
                    <div className="flex gap-4">
                        <p>
                            Country & Region: Singapore | Indonesia | Taiwan |
                            Thailand | Malaysia | Vietnam | Philippines
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
