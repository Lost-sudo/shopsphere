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
            <DialogContent className="sm:max-w-[600px] border border-white/60 shadow-2xl bg-white/80 backdrop-blur-3xl rounded-[2rem] max-h-[90vh] overflow-y-auto">
                <DialogHeader className="space-y-3 pb-4 border-b border-black/5">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-luxury-gold/10 text-luxury-gold shadow-lg shadow-black/10 border border-luxury-gold/20 shrink-0">
                            <Package className="w-6 h-6" />
                        </div>
                        <div>
                            <DialogTitle className="text-2xl font-light tracking-tight text-luxury-charcoal">
                                Edit <span className="font-serif italic text-luxury-gold font-bold">Product</span>
                            </DialogTitle>
                            <DialogDescription className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mt-1">
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
                                        <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Product Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="e.g. Wireless ANC Headphones"
                                                className="h-12 border-white/60 bg-white/40 focus-visible:ring-luxury-gold focus-visible:bg-white/60 transition-all rounded-xl shadow-sm text-luxury-charcoal placeholder:text-neutral-400"
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
                                            <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Category</FormLabel>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="h-7 px-2 text-[10px] font-bold uppercase tracking-widest text-luxury-gold hover:text-luxury-charcoal hover:bg-white/40 rounded-lg flex items-center gap-1 transition-colors"
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
                                                <SelectTrigger className="h-12 border-white/60 bg-white/40 focus:ring-luxury-gold focus:bg-white/60 transition-all rounded-xl shadow-sm text-luxury-charcoal">
                                                    <SelectValue placeholder={isCategoriesLoading ? "Loading..." : "Select a category"} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="border border-white/60 bg-white/80 backdrop-blur-2xl rounded-xl shadow-xl z-[110]">
                                                {categories.map((category) => (
                                                    <SelectItem key={category.id} value={category.id} className="rounded-lg focus:bg-white/60 focus:text-luxury-charcoal">
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
                                        <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Price (₱)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="0.00"
                                                className="h-12 border-white/60 bg-white/40 focus-visible:ring-luxury-gold focus-visible:bg-white/60 transition-all rounded-xl shadow-sm text-luxury-charcoal font-serif italic font-bold"
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
                                        <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Stock Count</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="1"
                                                className="h-12 border-white/60 bg-white/40 focus-visible:ring-luxury-gold focus-visible:bg-white/60 transition-all rounded-xl shadow-sm text-luxury-charcoal font-bold"
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
                                        <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Weight (grams)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="0"
                                                className="h-12 border-white/60 bg-white/40 focus-visible:ring-luxury-gold focus-visible:bg-white/60 transition-all rounded-xl shadow-sm text-luxury-charcoal font-bold"
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
                                        <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Tell us about the product..."
                                                className="min-h-[120px] border-white/60 bg-white/40 focus-visible:ring-luxury-gold focus-visible:bg-white/60 transition-all rounded-xl shadow-sm text-luxury-charcoal resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {product?.images && product.images.length > 0 && (
                                <div className="col-span-full space-y-3">
                                    <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                                        Current Images
                                    </FormLabel>
                                    <div className="flex flex-wrap gap-4">
                                        {product.images.map((img, i) => (
                                            <div
                                                key={i}
                                                className="relative w-24 h-24 rounded-2xl overflow-hidden border border-white/60 bg-white/40 shadow-sm"
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
                                    <p className="text-[10px] font-light text-neutral-400">
                                        Current product images stored on the server. To change images, you must delete this product and create a new one.
                                    </p>
                                </div>
                            )}

                            <FormField<ProductFormValues, "isActive">
                                control={form.control}
                                name="isActive"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center space-x-4 space-y-0 rounded-2xl border border-white/60 p-5 bg-white/40 shadow-sm col-span-full">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                className="border-white/60 data-[state=checked]:bg-luxury-gold data-[state=checked]:text-white rounded-md w-5 h-5"
                                            />
                                        </FormControl>
                                        <div className="space-y-1.5 leading-none">
                                            <FormLabel className="font-bold text-luxury-charcoal">
                                                Active Status
                                            </FormLabel>
                                            <p className="text-[10px] font-light text-neutral-500">
                                                Enable or disable this product from the customer view.
                                            </p>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter className="gap-3 sm:gap-0 pt-6 border-t border-black/5">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                className="h-12 px-6 border-white/60 bg-white/40 hover:bg-white/60 text-luxury-charcoal rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="h-12 px-8 bg-luxury-gold hover:bg-luxury-gold/90 text-white rounded-xl shadow-lg shadow-luxury-gold/20 uppercase tracking-widest text-[10px] font-bold transition-all active:scale-95 min-w-[160px]"
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
