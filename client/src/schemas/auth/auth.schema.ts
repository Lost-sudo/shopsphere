import z from "zod";

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d\s]).{8,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
        ),
});

export const registerSchema = z
    .object({
        name: z.string().min(2, "Full name must be at least 2 characters"),
        email: z.email("Invalid email address"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d\s]).{8,}$/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
            ),
        confirmPassword: z.string().min(8, "Password confirmation is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
