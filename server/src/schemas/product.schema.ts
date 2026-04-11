import z from "zod";

export const productVariantSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
  sku: z.string().min(1),
  stock: z.number().int().min(0).default(0),
  price: z.number().min(0).optional().nullable(),
});

export const productSchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(10),
  price: z.coerce.number().min(0),
  stock: z.coerce.number().int().min(0),
  weight: z.coerce.number().min(0),
  images: z.array(z.string()).optional(),
  isActive: z
    .union([z.boolean(), z.string().transform((val) => val === "true")])
    .optional(),
  categoryId: z.uuid(),
  variants: z
    .union([
      z.string().transform((str, ctx) => {
        try {
          return JSON.parse(str);
        } catch (e) {
          ctx.addIssue({ code: "custom", message: "Invalid JSON in variants" });
          return z.NEVER;
        }
      }),
      z.array(productVariantSchema),
    ])
    .pipe(z.array(productVariantSchema))
    .optional(),
});

export const updateProductSchema = productSchema.partial();

export const productQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  categoryId: z.uuid().optional(),
  sort: z
    .enum(["price_asc", "price_desc", "newest", "oldest"])
    .default("newest"),
  isActive: z
    .union([z.boolean(), z.string().transform((val) => val === "true")])
    .optional(),
});

export const updateVariantSchema = productVariantSchema.partial();

export const variantParamSchema = z.object({
  variantId: z.uuid("Invalid variant ID"),
});

export type ProductVariantInput = z.infer<typeof productVariantSchema>;
export type UpdateVariantInput = z.infer<typeof updateVariantSchema>;
export type VariantParamInput = z.infer<typeof variantParamSchema>;
export type ProductInput = z.infer<typeof productSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type ProductQuery = z.infer<typeof productQuerySchema>;
