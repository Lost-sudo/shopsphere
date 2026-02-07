import z from "zod"

const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const updateUserNameSchema = z.object({
    name: z.string().min(3).max(255),
})

export const updateUserEmailSchema = z.object({
    email: z.email()
})

export const updateUserPasswordSchema = z.object({
    password: z.string().regex(PASSWORD_REGEX)
})

export type UpdateUserName = z.infer<typeof updateUserNameSchema>;
export type UpdateUserEmail = z.infer<typeof updateUserEmailSchema>;
export type UpdateUserPassword = z.infer<typeof updateUserPasswordSchema>;