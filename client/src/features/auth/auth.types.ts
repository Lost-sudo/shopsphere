type Role = "CUSTOMER" | "ADMIN" | "SUPER_ADMIN";

export type User = {
    id: string;
    email: string;
    name: string | null;
    role: Role;
    emailVerified: boolean;
    createdAt: string;
    updatedAt: string;
};

export type RegisterResponse = {
    success: boolean;
    message: string;
    user: User;
};

export type LoginResponse = {
    success: boolean;
    message: string;
    user: User;
    accessToken: string;
};

export type GetMeResponse = {
    success: boolean;
    message: string;
    user: User;
};
