"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Package, Loader2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useUpdateProductMutation } from "@/features/product/product.api";
import { useGetCategoriesQuery } from "@/features/category/category.api";
import { CreateCategoryModal } from "./CreateCategoryModal";
import type { Product } from "@/features/product/product.types";

const productSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters").max(255),
    description: z.string().min(10, "Description must be at least 10 characters"),
    price: z.number().min(0, "Price must be positive"),
    stock: z.number().int().min(0, "Stock cannot be negative"),
    weight: z.number().min(0, "Weight must be positive"),
    categoryId: z.string().uuid("Invalid category"),
    isActive: z.boolean(),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface EditProductModalProps {
    product: Product | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function EditProductModal({ product, open, onOpenChange }: EditProductModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [updateProduct] = useUpdateProductMutation();
    const { data: categoriesData, isLoading: isCategoriesLoading } = useGetCategoriesQuery();

    const categories = categoriesData?.data?.categories ?? [];

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            stock: 1,
            weight: 0,
            categoryId: "",
            isActive: true,
        },
    });

    useEffect(() => {
        if (product && open) {
            form.reset({
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                weight: Number(product.weight),
                categoryId: product.categoryId,
                isActive: product.isActive,
            });
        }
    }, [product, open, form]);

    async function onSubmit(values: ProductFormValues) {
        if (!product) return;
        setIsLoading(true);
        try {
            await updateProduct({
                id: product.id,
                ...values,
            }).unwrap();

            toast.success("Product updated successfully!");
            onOpenChange(false);
        } catch (error) {
            toast.error("Failed to update product. Please try again.");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] border-none shadow-2xl bg-white dark:bg-slate-950 backdrop-blur-xl max-h-[90vh] overflow-y-auto">
                <DialogHeader className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-500">
                            <Package className="w-6 h-6" />
                        </div>
                        <div>
                            <DialogTitle className="text-2xl font-bold tracking-tight">Edit Product</DialogTitle>
                            <DialogDescription className="text-slate-500 dark:text-slate-400">
                                Modify product details and status.
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <FormField<ProductFormValues, "name">
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="col-span-full">
                                        <FormLabel className="font-bold text-slate-700 dark:text-slate-300">Product Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="e.g. Wireless ANC Headphones"
                                                className="h-11 border-slate-200 dark:border-slate-800 focus:ring-primary rounded-lg"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField<ProductFormValues, "categoryId">
                                control={form.control}
                                name="categoryId"
                                render={({ field }) => (
                                    <FormItem className="md:col-span-2">
                                        <div className="flex items-center justify-between mb-1">
                                            <FormLabel className="font-bold text-slate-700 dark:text-slate-300">Category</FormLabel>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="h-7 px-2 text-xs text-primary hover:text-primary/80 flex items-center gap-1"
                                                onClick={() => setIsCategoryModalOpen(true)}
                                            >
                                                <Plus className="w-3 h-3" />
                                                New Category
                                            </Button>
                                        </div>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            disabled={isCategoriesLoading}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="h-11 border-slate-200 dark:border-slate-800 rounded-lg">
                                                    <SelectValue placeholder={isCategoriesLoading ? "Loading..." : "Select a category"} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 z-[110]">
                                                {categories.map((category) => (
                                                    <SelectItem key={category.id} value={category.id}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField<ProductFormValues, "price">
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold text-slate-700 dark:text-slate-300">Price (₱)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="0.00"
                                                className="h-11 border-slate-200 dark:border-slate-800 rounded-lg"
                                                {...field}
                                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField<ProductFormValues, "stock">
                                control={form.control}
                                name="stock"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold text-slate-700 dark:text-slate-300">Stock Count</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="1"
                                                className="h-11 border-slate-200 dark:border-slate-800 rounded-lg"
                                                {...field}
                                                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField<ProductFormValues, "weight">
                                control={form.control}
                                name="weight"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold text-slate-700 dark:text-slate-300">Weight (grams)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="0"
                                                className="h-11 border-slate-200 dark:border-slate-800 rounded-lg"
                                                {...field}
                                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField<ProductFormValues, "description">
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="col-span-full">
                                        <FormLabel className="font-bold text-slate-700 dark:text-slate-300">Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Tell us about the product..."
                                                className="min-h-[120px] border-slate-200 dark:border-slate-800 rounded-lg resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {product?.images && product.images.length > 0 && (
                                <div className="col-span-full space-y-3">
                                    <FormLabel className="font-bold text-slate-700 dark:text-slate-300">
                                        Current Images
                                    </FormLabel>
                                    <div className="flex flex-wrap gap-3">
                                        {product.images.map((img, i) => (
                                            <div
                                                key={i}
                                                className="relative w-24 h-24 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 shadow-sm"
                                            >
                                                <Image
                                                    src={img}
                                                    alt={`Product ${i + 1}`}
                                                    fill
                                                    unoptimized
                                                    className="object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-[10px] text-slate-400">
                                        Current product images stored on the server.
                                    </p>
                                </div>
                            )}

                            <FormField<ProductFormValues, "isActive">
                                control={form.control}
                                name="isActive"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-xl border border-slate-100 dark:border-slate-800 p-4 bg-slate-50/50 dark:bg-slate-900/50 col-span-full">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel className="font-bold text-slate-700 dark:text-slate-300">
                                                Active Status
                                            </FormLabel>
                                            <p className="text-xs text-slate-500">
                                                Enable or disable this product from the customer view.
                                            </p>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter className="gap-3 sm:gap-0 pt-6">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                className="h-11 px-6 border-slate-200 dark:border-slate-800 font-semibold"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="h-11 px-8 bg-amber-500 hover:bg-amber-600 text-white font-bold shadow-lg shadow-amber-500/20 dark:shadow-none min-w-[140px]"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Updating...
                                    </>
                                ) : "Save Changes"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
            <CreateCategoryModal
                open={isCategoryModalOpen}
                onOpenChange={setIsCategoryModalOpen}
                onSuccess={(id) => {
                    form.setValue("categoryId", id);
                    form.trigger("categoryId");
                    toast.success("New category selected!");
                }}
            />
        </Dialog>
    );
}
