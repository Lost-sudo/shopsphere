"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddProductModal } from "./AddProductModal";
import { Package } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ProductToolbar } from "./products/ProductToolbar";
import { ProductTable } from "./products/ProductTable";
import { 
  useDeleteProductMutation, 
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation 
} from "@/features/product/product.api";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { EditProductModal } from "./EditProductModal";
import type { Product } from "@/features/product/product.types";

function useDebouncedValue<T>(value: T, delayMs: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(t);
  }, [value, delayMs]);
  return debounced;
}

export function ProductManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebouncedValue(searchTerm, 300);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const queryArgs = useMemo(
    () => ({
      page: 1,
      limit: 20,
      search: debouncedSearch || undefined,
      sort: "newest" as const,
    }),
    [debouncedSearch],
  );

  const { data, isLoading, isFetching, isError } = useGetProductsQuery(queryArgs);
  const [deleteProduct] = useDeleteProductMutation();
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const products = data?.data?.products ?? [];

  async function onDelete(id: string) {
    setDeletingId(id);
    try {
      await deleteProduct(id).unwrap();
      toast.success("Product deleted");
    } catch {
      toast.error("Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  }

  function onEdit(product: Product) {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  }

  async function onDuplicate(product: Product) {
    try {
      // Create a shallow copy without images for now, or prefix name
      await createProduct({
        name: `${product.name} (Copy)`,
        description: product.description,
        price: product.price,
        stock: product.stock,
        weight: Number(product.weight),
        categoryId: product.categoryId,
        isActive: product.isActive,
      }).unwrap();
      toast.success("Product duplicated successfully!");
    } catch {
      toast.error("Failed to duplicate product");
    }
  }

  async function onToggleActive(id: string, currentStatus: boolean) {
    try {
      await updateProduct({ id, isActive: !currentStatus }).unwrap();
      toast.success(`Product ${currentStatus ? "deactivated" : "activated"}`);
    } catch {
      toast.error("Failed to update status");
    }
  }

  return (
    <div className="space-y-6">
      <ProductToolbar
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        onOpenAdd={() => setIsAddModalOpen(true)}
      />

      <Card className="border-white/40 bg-white/60 backdrop-blur-2xl shadow-xl shadow-black/5 rounded-[2.5rem] overflow-hidden mt-8">
        <CardHeader className="border-b border-black/5 p-8 pb-6">
          <CardTitle className="text-xl font-light tracking-tight text-luxury-charcoal flex items-center gap-3">
            <div className="w-10 h-10 bg-luxury-charcoal rounded-xl flex items-center justify-center shadow-lg shadow-black/10 shrink-0">
                <Package className="w-5 h-5 text-white" />
            </div>
            <span>
                All <span className="font-serif italic text-luxury-gold">Products</span>
            </span>
            {isFetching ? (
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 ml-2 animate-pulse">(updating)</span>
            ) : null}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : isError ? (
            <div className="p-6 text-sm text-red-600 dark:text-red-400">
              Failed to load products.
            </div>
          ) : products.length === 0 ? (
            <div className="p-6 text-sm text-slate-600 dark:text-slate-400">
              No products found.
            </div>
          ) : (
            <ProductTable 
                products={products} 
                onDelete={onDelete} 
                onEdit={onEdit}
                onDuplicate={onDuplicate}
                onToggleActive={onToggleActive}
                deletingId={deletingId} 
            />
          )}
        </CardContent>
      </Card>

      <AddProductModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />
      <EditProductModal 
        product={editingProduct} 
        open={isEditModalOpen} 
        onOpenChange={(open) => {
            setIsEditModalOpen(open);
            if (!open) setEditingProduct(null);
        }} 
      />
    </div>
  );
}
