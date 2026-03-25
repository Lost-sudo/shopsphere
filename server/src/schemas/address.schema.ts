import z from "zod";

export const addressSchema = z.object({
    firstName: z.string().min(1).max(100),
    lastName: z.string().min(1).max(100),
    phoneNumber: z.string().min(1).max(20),
    street: z.string().min(1).max(255),
    barangay: z.string().min(1).max(100),
    city: z.string().min(1).max(100),
    province: z.string().min(1).max(100),
    region: z.string().min(1).max(100),
    country: z.string().min(1).max(100),
    postalCode: z.string().min(1).max(20),
    isDefault: z.boolean().optional(),
});

export const updateAddressSchema = addressSchema.partial();

export type AddressInput = z.infer<typeof addressSchema>;
export type UpdateAddressInput = z.infer<typeof updateAddressSchema>;
