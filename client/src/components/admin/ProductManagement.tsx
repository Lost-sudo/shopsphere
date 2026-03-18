"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
    Search, 
    Plus, 
    MoreHorizontal, 
    Edit, 
    Trash2, 
    Filter,
    ArrowUpRight,
    Package
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AddProductModal } from "./AddProductModal";

const mockProducts = [
    {
        id: "PROD-101",
        name: "Wireless ANC Headphones",
        category: "Electronics",
        price: 129.99,
        stock: 45,
        status: "In Stock",
        image: "https://images.unsplash.com/photo-1546435770-a3e426ff4737?auto=format&fit=crop&w=100&q=80",
    },
    {
        id: "PROD-102",
        name: "Mechanical Gaming Keyboard",
        category: "Accessories",
        price: 189.50,
        stock: 12,
        status: "Low Stock",
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=100&q=80",
    },
    {
        id: "PROD-103",
        name: "UltraWide Curved Monitor",
        category: "Electronics",
        price: 499.00,
        stock: 0,
        status: "Out of Stock",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=100&q=80",
    },
    {
        id: "PROD-104",
        name: "Ergonomic Office Chair",
        category: "Furniture",
        price: 249.99,
        stock: 28,
        status: "In Stock",
        image: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=100&q=80",
    },
    {
        id: "PROD-105",
        name: "Bluetooth Smart Speaker",
        category: "Electronics",
        price: 79.99,
        stock: 156,
        status: "In Stock",
        image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=100&q=80",
    },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case "In Stock": return "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400";
        case "Low Stock": return "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400";
        case "Out of Stock": return "bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400";
        default: return "bg-slate-50 text-slate-600";
    }
};

export function ProductManagement() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input 
                        placeholder="Search products..." 
                        className="pl-10 h-10 border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-10 border-slate-200 dark:border-slate-800 flex items-center gap-2 font-semibold">
                        <Filter className="w-4 h-4" />
                        Filters
                    </Button>
                    <Button 
                        onClick={() => setIsAddModalOpen(true)}
                        className="h-10 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 dark:shadow-none flex items-center gap-2 font-semibold"
                    >
                        <Plus className="w-4 h-4" />
                        Add Product
                    </Button>
                </div>
            </div>

            <Card className="border-none shadow-md bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm overflow-hidden">
                <CardHeader className="border-b border-slate-100 dark:border-slate-800">
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                        <Package className="w-5 h-5 text-indigo-500" />
                        All Products
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs uppercase text-slate-500 font-semibold border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                                <tr>
                                    <th className="px-6 py-4">Product</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4 text-right">Price</th>
                                    <th className="px-6 py-4 text-center">Stock</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {mockProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-800">
                                                    <Image 
                                                        src={product.image} 
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-slate-900 dark:text-white">{product.name}</span>
                                                    <span className="text-xs text-slate-500">{product.id}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Badge variant="outline" className="font-medium bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800">
                                                {product.category}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right font-bold text-slate-900 dark:text-white">
                                            ${product.price.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className={cn(
                                                "font-semibold",
                                                product.stock <= 10 ? "text-amber-500" : "text-slate-600 dark:text-slate-400"
                                            )}>
                                                {product.stock}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Badge className={cn("border-none shadow-none font-bold px-2.5 py-1 rounded-full", getStatusColor(product.status))}>
                                                {product.status}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors group">
                                                    <Edit className="w-4 h-4 text-slate-500 group-hover:text-amber-500" />
                                                </button>
                                                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors group">
                                                    <Trash2 className="w-4 h-4 text-slate-500 group-hover:text-red-500" />
                                                </button>
                                                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                                                    <MoreHorizontal className="w-4 h-4 text-slate-500" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            <AddProductModal 
                open={isAddModalOpen} 
                onOpenChange={setIsAddModalOpen} 
            />
        </div>
    );
}
