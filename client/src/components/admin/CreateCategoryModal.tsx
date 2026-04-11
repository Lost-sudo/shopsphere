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
import { toast } from "sonner";
import { FolderPlus, Loader2 } from "lucide-react";
import { useState } from "react";
import { useCreateCategoryMutation } from "@/features/category/category.api";

const categorySchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(50),
    description: z.string().max(200, "Description is too long").optional(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface CreateCategoryModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: (categoryId: string) => void;
}

export function CreateCategoryModal({ open, onOpenChange, onSuccess }: CreateCategoryModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [createCategory] = useCreateCategoryMutation();

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    async function onSubmit(values: CategoryFormValues) {
        setIsLoading(true);
        try {
            const result = await createCategory({
                name: values.name,
                description: values.description,
            }).unwrap();

            toast.success("Category created successfully!");
            form.reset();
            onOpenChange(false);
            if (onSuccess && result.data.category.id) {
                onSuccess(result.data.category.id);
            }
        } catch (error) {
            toast.error("Failed to create category. Please try again.");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] border-none shadow-2xl bg-white dark:bg-slate-950 backdrop-blur-xl z-[110]">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary">
                            <FolderPlus className="w-6 h-6" />
                        </div>
                        <div>
                            <DialogTitle className="text-xl font-bold">New Category</DialogTitle>
                            <DialogDescription>
                                Add a new category for your products.
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold">Category Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="e.g. Smart Home"
                                            className="h-11"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold">Description (Optional)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Brief description..."
                                            className="resize-none min-h-[80px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter className="pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="min-w-[100px]"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : "Create"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
