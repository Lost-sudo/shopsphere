import z from "zod";

export const categorySchema = z.object({
    name: z.string().min(3).max(255),
    description: z.string().optional().nullable(),
});

export const updateCategorySchema = categorySchema.partial();

export type CategoryInput = z.infer<typeof categorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
