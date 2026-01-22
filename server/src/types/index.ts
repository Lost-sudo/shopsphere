export type JwtPayload = {
    id: string;
    email: string;
    role: string;
};

export type JwtRefreshPayload = {
    jti: string;
    typ: string;
};
