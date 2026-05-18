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
import { Package, Loader2, Plus, Trash2, Layers } from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { useUpdateProductMutation } from "@/features/product/product.api";
import { useGetCategoriesQuery } from "@/features/category/category.api";
import { CreateCategoryModal } from "./CreateCategoryModal";
import type { Product } from "@/features/product/product.types";
import { cn } from "@/lib/utils";

const productSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters").max(255),
    description: z.string().min(10, "Description must be at least 10 characters"),
    price: z.number().min(0, "Price must be positive"),
    stock: z.number().int().min(0, "Stock cannot be negative").optional(),
    weight: z.number().min(0, "Weight must be positive"),
    categoryIds: z.array(z.string().uuid("Invalid category")).min(1, "Select at least one category"),
    isActive: z.boolean(),
    variants: z.array(z.object({
        name: z.string().min(1, "Name is required"),
        value: z.string().min(1, "Value is required"),
        sku: z.string().min(3, "SKU must be at least 3 characters"),
        stock: z.number().int().min(0, "Stock cannot be negative"),
        price: z.number().min(0).nullable().optional(),
    })).optional(),
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
            categoryIds: [],
            isActive: true,
            variants: [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "variants",
    });

    useEffect(() => {
        if (product && open) {
            form.reset({
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                weight: Number(product.weight),
                categoryIds: (product.categories || []).map((c) => c.id),
                isActive: product.isActive,
                variants: product.variants || [],
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
                categoryIds: values.categoryIds,
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

                            <FormField<ProductFormValues, "categoryIds">
                                control={form.control}
                                name="categoryIds"
                                render={() => (
                                    <FormItem className="md:col-span-2">
                                        <div className="flex items-center justify-between mb-2">
                                            <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Categories</FormLabel>
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
                                        <div className="grid grid-cols-2 gap-2">
                                            {categories.map((category) => {
                                                const checked = (form.watch("categoryIds") || []).includes(category.id);
                                                return (
                                                    <label
                                                        key={category.id}
                                                        className={cn(
                                                            "flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all",
                                                            checked
                                                                ? "bg-luxury-charcoal text-white border-luxury-charcoal shadow-md"
                                                                : "bg-white/40 border-white/60 hover:bg-white/60 text-luxury-charcoal"
                                                        )}
                                                    >
                                                        <Checkbox
                                                            checked={checked}
                                                            onCheckedChange={() => {
                                                                const current = form.getValues("categoryIds") || [];
                                                                if (checked) {
                                                                    form.setValue("categoryIds", current.filter((id) => id !== category.id), { shouldValidate: true });
                                                                } else {
                                                                    form.setValue("categoryIds", [...current, category.id], { shouldValidate: true });
                                                                }
                                                            }}
                                                            className={cn(
                                                                "rounded-md w-4 h-4",
                                                                checked
                                                                    ? "data-[state=checked]:bg-white data-[state=checked]:text-luxury-charcoal"
                                                                    : "border-white/60"
                                                            )}
                                                        />
                                                        <span className="text-xs font-bold tracking-tight">{category.name}</span>
                                                    </label>
                                                );
                                            })}
                                            {categories.length === 0 && !isCategoriesLoading && (
                                                <div className="col-span-full p-4 text-center text-xs text-neutral-500">
                                                    No categories found.
                                                </div>
                                            )}
                                        </div>
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
                                                value={field.value === 0 ? "" : field.value}
                                                onChange={(e) => field.onChange(e.target.value === "" ? 0 : parseFloat(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField<ProductFormValues, "stock">
                                control={form.control}
                                name="stock"
                                render={({ field }) => {
                                    const variantStock = fields.reduce((acc, f, i) => acc + (form.watch(`variants.${i}.stock`) || 0), 0);
                                    const displayValue = fields.length > 0 ? variantStock : (field.value || 0);

                                    return (
                                        <FormItem>
                                            <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                                                {fields.length > 0 ? "Total Stock (Calculated)" : "Stock Count"}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder={fields.length > 0 ? "Based on variants" : "1"}
                                                    disabled={fields.length > 0}
                                                    className="h-12 border-white/60 bg-white/40 focus-visible:ring-luxury-gold focus-visible:bg-white/60 transition-all rounded-xl shadow-sm text-luxury-charcoal font-bold disabled:opacity-50"
                                                    {...field}
                                                    value={displayValue === 0 ? "" : displayValue}
                                                    onChange={(e) => field.onChange(e.target.value === "" ? 0 : parseInt(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
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
                                                value={field.value === 0 ? "" : field.value}
                                                onChange={(e) => field.onChange(e.target.value === "" ? 0 : parseFloat(e.target.value))}
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
                        </div>

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

                        {/* Variants Section */}
                        <div className="col-span-full space-y-6 pt-6 border-t border-black/5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-luxury-gold/10 text-luxury-gold">
                                        <Layers className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-luxury-charcoal tracking-tight">Product Variants</h3>
                                        <p className="text-[10px] text-neutral-400 font-medium uppercase tracking-widest mt-0.5">Sizes, Colors, and Overrides</p>
                                    </div>
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="h-9 px-4 rounded-xl border-luxury-gold/30 text-luxury-gold hover:bg-luxury-gold hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest gap-2 shadow-sm"
                                    onClick={() => append({ name: "", value: "", sku: "", stock: 0, price: null })}
                                >
                                    <Plus className="w-3 h-3" />
                                    Add Variant
                                </Button>
                            </div>

                            <div className="space-y-4">
                                {fields.map((field, index) => (
                                    <div
                                        key={field.id}
                                        className="group relative p-6 rounded-[2rem] border border-white/60 bg-white/40 backdrop-blur-md shadow-sm transition-all hover:shadow-md hover:bg-white/60"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-red-50 text-red-500 border border-red-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white shadow-lg"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>

                                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                            <FormField
                                                control={form.control}
                                                name={`variants.${index}.name`}
                                                render={({ field }) => (
                                                    <FormItem className="md:col-span-1">
                                                        <FormLabel className="text-[9px] font-black uppercase tracking-widest text-neutral-400">Variant Name</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="e.g. Size"
                                                                className="h-10 text-xs border-white bg-white focus:bg-white"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name={`variants.${index}.value`}
                                                render={({ field }) => (
                                                    <FormItem className="md:col-span-1">
                                                        <FormLabel className="text-[9px] font-black uppercase tracking-widest text-neutral-400">Value</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="e.g. M"
                                                                className="h-10 text-xs border-white bg-white focus:bg-white"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name={`variants.${index}.sku`}
                                                render={({ field }) => (
                                                    <FormItem className="md:col-span-1">
                                                        <FormLabel className="text-[9px] font-black uppercase tracking-widest text-neutral-400">SKU</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="SKU-001"
                                                                className="h-10 text-xs border-white bg-white focus:bg-white"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name={`variants.${index}.stock`}
                                                render={({ field }) => (
                                                    <FormItem className="md:col-span-1">
                                                        <FormLabel className="text-[9px] font-black uppercase tracking-widest text-neutral-400">Stock</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                className="h-10 text-xs border-white bg-white focus:bg-white"
                                                                {...field}
                                                                value={field.value === 0 ? "" : field.value}
                                                                onChange={(e) => field.onChange(e.target.value === "" ? 0 : parseInt(e.target.value))}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name={`variants.${index}.price`}
                                                render={({ field }) => (
                                                    <FormItem className="md:col-span-1">
                                                        <FormLabel className="text-[9px] font-black uppercase tracking-widest text-neutral-400">Price (Opt)</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                placeholder="Override"
                                                                className="h-10 text-xs border-white bg-white focus:bg-white font-serif italic"
                                                                {...field}
                                                                value={field.value || ""}
                                                                onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : null)}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                ))}

                                {fields.length === 0 && (
                                    <div className="py-8 border-2 border-dashed border-black/5 rounded-[2.5rem] text-center space-y-3">
                                        <div className="w-10 h-10 bg-neutral-50 rounded-full flex items-center justify-center mx-auto">
                                            <Layers size={16} className="text-neutral-300" />
                                        </div>
                                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">No variants added yet</p>
                                    </div>
                                )}
                            </div>
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
                    const current = form.getValues("categoryIds") || [];
                    form.setValue("categoryIds", [...current, id], { shouldValidate: true });
                    toast.success("New category selected!");
                }}
            />
        </Dialog>
    );
}
