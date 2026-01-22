import z from "zod";

const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const registerSchema = z.object({
    email: z.email(),
    name: z.string().min(3).max(255),
    password: z.string().regex(PASSWORD_REGEX),
});

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().regex(PASSWORD_REGEX),
});

export type UserRegisterInput = z.infer<typeof registerSchema>;
export type UserLoginInput = z.infer<typeof loginSchema>;
