"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Product } from "@/features/product/product.types";
import Image from "next/image";
import { ProductRowActions } from "./ProductRowActions";

const getStatusColor = (status: "In Stock" | "Low Stock" | "Out of Stock") => {
  switch (status) {
    case "In Stock":
      return "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400";
    case "Low Stock":
      return "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400";
    case "Out of Stock":
      return "bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400";
    default:
      return "bg-slate-50 text-slate-600";
  }
};

function deriveStockStatus(stock: number): "In Stock" | "Low Stock" | "Out of Stock" {
  if (stock <= 0) return "Out of Stock";
  if (stock <= 10) return "Low Stock";
  return "In Stock";
}

type Props = {
  products: Product[];
  onDelete: (id: string) => void;
  deletingId?: string | null;
};

export function ProductTable({ products, onDelete, deletingId }: Props) {
  return (
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
          {products.map((product) => {
            const imageUrl = product.images?.[0];
            const categoryName = product.category?.name ?? "—";
            const status = deriveStockStatus(product.stock);

            return (
              <tr
                key={product.id}
                className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-800">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {product.name}
                      </span>
                      <span className="text-xs text-slate-500">{product.id}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge
                    variant="outline"
                    className="font-medium bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800"
                  >
                    {categoryName}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right font-bold text-slate-900 dark:text-white">
                  ${product.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span
                    className={cn(
                      "font-semibold",
                      product.stock <= 10
                        ? "text-amber-500"
                        : "text-slate-600 dark:text-slate-400",
                    )}
                  >
                    {product.stock}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge
                    className={cn(
                      "border-none shadow-none font-bold px-2.5 py-1 rounded-full",
                      getStatusColor(status),
                    )}
                  >
                    {status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <ProductRowActions
                    onDelete={() => onDelete(product.id)}
                    disableDelete={Boolean(deletingId) && deletingId !== product.id}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

