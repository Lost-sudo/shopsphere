"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Product } from "@/features/product/product.types";
import Image from "next/image";
import { ProductRowActions } from "./ProductRowActions";
import { Package } from "lucide-react";

const getStatusColor = (status: "In Stock" | "Low Stock" | "Out of Stock") => {
  switch (status) {
    case "In Stock":
      return "bg-emerald-50 text-emerald-600 border-emerald-100";
    case "Low Stock":
      return "bg-amber-50 text-amber-600 border-amber-100";
    case "Out of Stock":
      return "bg-red-50 text-red-600 border-red-100";
    default:
      return "bg-neutral-50 text-neutral-500 border-neutral-100";
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
  onEdit: (product: Product) => void;
  onDuplicate: (product: Product) => void;
  onToggleActive: (id: string, currentStatus: boolean) => void;
  deletingId?: string | null;
};

export function ProductTable({ products, onDelete, onEdit, onDuplicate, onToggleActive, deletingId }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-black/5 bg-black/[0.02]">
            <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Product</th>
            <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Category</th>
            <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400 text-right">Price</th>
            <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400 text-center">Stock</th>
            <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Status</th>
            <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black/5">
          {products.map((product) => {
            const imageUrl = product.images?.[0];
            const categoryNames = product.categories?.map((c) => c.name) ?? [];
            const status = deriveStockStatus(product.stock);

            return (
              <tr
                key={product.id}
                className="hover:bg-white/40 transition-colors group"
              >
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-luxury-gold/5 flex items-center justify-center shrink-0 border border-white/60 shadow-sm">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={product.name}
                          fill
                          unoptimized
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <Package className="w-5 h-5 text-luxury-gold/40" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-luxury-charcoal">
                        {product.name}
                      </span>
                      <span className="text-[10px] font-light text-neutral-400 mt-0.5">#{product.id.split("-")[0]}</span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1.5">
                    {categoryNames.length > 0 ? categoryNames.map((name) => (
                      <Badge
                        key={name}
                        variant="outline"
                        className="font-bold text-[10px] uppercase tracking-widest bg-white/40 border-white/60 text-luxury-charcoal shadow-sm px-3 py-1"
                      >
                        {name}
                      </Badge>
                    )) : <span className="text-xs text-neutral-400">—</span>}
                  </div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap text-right">
                  <span className="text-sm font-serif italic text-luxury-gold font-bold">
                    ₱{product.price.toFixed(2)}
                  </span>
                </td>
                <td className="px-8 py-6 whitespace-nowrap text-center">
                  <span
                    className={cn(
                      "text-xs font-bold",
                      product.stock <= 10
                        ? "text-amber-500"
                        : "text-luxury-charcoal",
                    )}
                  >
                    {product.stock}
                  </span>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <Badge
                    className={cn(
                      "border shadow-none font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full",
                      getStatusColor(status),
                    )}
                  >
                    {status}
                  </Badge>
                </td>
                <td className="px-8 py-6 text-right">
                  <ProductRowActions
                    onEdit={() => onEdit(product)}
                    onDelete={() => onDelete(product.id)}
                    onDuplicate={() => onDuplicate(product)}
                    onToggleActive={() => onToggleActive(product.id, product.isActive)}
                    isActive={product.isActive}
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


