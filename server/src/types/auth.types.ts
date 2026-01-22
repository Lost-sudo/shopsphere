export type Role = "CUSTOMER" | "ADMIN" | "SUPER_ADMIN";

export type User = {
    id: string;
    email: string;
    name: string | null;
    password: string;
    role: Role;
    isActive: boolean;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export type UserWithTokens = {
    user: SafeUser;
    accessToken: string;
    refreshToken: string;
};

export type AuthTokens = {
    accessToken: string;
    refreshToken: string;
};

export type SafeUser = Omit<User, "password">;
