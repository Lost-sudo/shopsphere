import z from "zod"

const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d\s]).{8,}$/;

export const updateUserNameSchema = z.object({
    name: z.string().min(3).max(255),
})

export const updateUserEmailSchema = z.object({
    email: z.email()
})

export const updateUserPasswordSchema = z.object({
    password: z.string().regex(PASSWORD_REGEX)
})

export const updateUserRoleSchema = z.object({
    role: z.enum(["CUSTOMER", "ADMIN", "SUPER_ADMIN"])
})

export const adminCreateUserSchema = z.object({
    email: z.email("Invalid email address."),
    name: z
        .string()
        .min(3, "Name must be at least 3 characters long.")
        .max(255, "Name must be at most 255 characters long."),
    password: z
        .string()
        .regex(
        PASSWORD_REGEX,
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
        ),
    role: z.enum(["CUSTOMER", "ADMIN", "SUPER_ADMIN"])
})

export type UpdateUserName = z.infer<typeof updateUserNameSchema>;
export type UpdateUserEmail = z.infer<typeof updateUserEmailSchema>;
export type UpdateUserPassword = z.infer<typeof updateUserPasswordSchema>;
export type UpdateUserRole = z.infer<typeof updateUserRoleSchema>;
export type AdminCreateUser = z.infer<typeof adminCreateUserSchema>;