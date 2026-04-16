import { z } from "zod";

export const addressSchema = z.object({
    firstName: z.string().min(1, "First name is required").max(100),
    lastName: z.string().min(1, "Last name is required").max(100),
    phoneNumber: z.string()
        .min(1, "Phone number is required")
        .max(20, "Phone number is too long")
        .regex(/^[0-9+-\s]+$/, "Invalid phone number format"),
    street: z.string().min(1, "Street address is required").max(255),
    barangay: z.string().min(1, "Barangay is required").max(100),
    city: z.string().min(1, "City is required").max(100),
    province: z.string().min(1, "Province is required").max(100),
    region: z.string().min(1, "Region is required").max(100),
    country: z.string().min(1, "Country is required").max(100),
    postalCode: z.string().min(1, "Postal code is required").max(20),
    isDefault: z.boolean(),
});

export type AddressSchema = z.infer<typeof addressSchema>;
