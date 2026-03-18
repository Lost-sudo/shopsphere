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
import { Package, Loader2 } from "lucide-react";
import { useState } from "react";

const productSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters").max(255),
    description: z.string().min(10, "Description must be at least 10 characters"),
    price: z.number().min(0, "Price must be positive"),
    stock: z.number().int().min(0, "Stock cannot be negative"),
    categoryId: z.string().uuid("Invalid category"),
    isActive: z.boolean(),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface AddProductModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const mockCategories = [
    { id: "c1b1a1a1-1111-1111-1111-111111111111", name: "Electronics" },
    { id: "c2b2a2a2-2222-2222-2222-222222222222", name: "Accessories" },
    { id: "c3b3a3a3-3333-3333-3333-333333333333", name: "Furniture" },
    { id: "c4b4a4a4-4444-4444-4444-444444444444", name: "Clothing" },
];

export function AddProductModal({ open, onOpenChange }: AddProductModalProps) {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            stock: 0,
            categoryId: "",
            isActive: true,
        },
    });

    async function onSubmit(values: ProductFormValues) {
        setIsLoading(true);
        try {
            console.log("Submitting product:", values);
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            toast.success("Product created successfully!");
            form.reset();
            onOpenChange(false);
        } catch (error) {
            toast.error("Failed to create product. Please try again.");
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
                        <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400">
                            <Package className="w-6 h-6" />
                        </div>
                        <div>
                            <DialogTitle className="text-2xl font-bold tracking-tight">Add New Product</DialogTitle>
                            <DialogDescription className="text-slate-500 dark:text-slate-400">
                                Create a new product in your inventory.
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <FormField<ProductFormValues>
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="col-span-full">
                                        <FormLabel className="font-bold text-slate-700 dark:text-slate-300">Product Name</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="e.g. Wireless ANC Headphones" 
                                                className="h-11 border-slate-200 dark:border-slate-800 focus:ring-indigo-500 rounded-lg"
                                                {...field}
                                                value={field.value as string}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField<ProductFormValues>
                                control={form.control}
                                name="categoryId"
                                render={({ field }) => (
                                    <FormItem className="md:col-span-2">
                                        <FormLabel className="font-bold text-slate-700 dark:text-slate-300">Category</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value as string}>
                                            <FormControl>
                                                <SelectTrigger className="h-11 border-slate-200 dark:border-slate-800 rounded-lg">
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 z-[100]">
                                                {mockCategories.map((category) => (
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

                            <FormField<ProductFormValues>
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold text-slate-700 dark:text-slate-300">Price ($)</FormLabel>
                                        <FormControl>
                                            <Input 
                                                type="number" 
                                                placeholder="0.00" 
                                                className="h-11 border-slate-200 dark:border-slate-800 rounded-lg"
                                                {...field}
                                                value={field.value as number}
                                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField<ProductFormValues>
                                control={form.control}
                                name="stock"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold text-slate-700 dark:text-slate-300">Initial Stock</FormLabel>
                                        <FormControl>
                                            <Input 
                                                type="number" 
                                                placeholder="0" 
                                                className="h-11 border-slate-200 dark:border-slate-800 rounded-lg"
                                                {...field}
                                                value={field.value as number}
                                                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField<ProductFormValues>
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
                                                value={field.value as string}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField<ProductFormValues>
                                control={form.control}
                                name="isActive"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-xl border border-slate-100 dark:border-slate-800 p-4 bg-slate-50/50 dark:bg-slate-900/50 col-span-full">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value as boolean}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel className="font-bold text-slate-700 dark:text-slate-300">
                                                Active Status
                                            </FormLabel>
                                            <p className="text-xs text-slate-500">
                                                Make this product visible to customers immediately.
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
                                className="h-11 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-200 dark:shadow-none min-w-[140px]"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Saving...
                                    </>
                                ) : "Add Product"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
