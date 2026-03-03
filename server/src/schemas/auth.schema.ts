import z from "zod";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/;

export const registerSchema = z.object({
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
});

export const loginSchema = z.object({
  email: z.email("Invalid email address."),
  password: z
    .string()
    .regex(
      PASSWORD_REGEX,
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    ),
});

export type UserRegisterInput = z.infer<typeof registerSchema>;
export type UserLoginInput = z.infer<typeof loginSchema>;
