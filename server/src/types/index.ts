export type JwtPayload = {
    id: string;
    email: string;
    role: string;
};

export type JwtRefreshPayload = {
    jti: string;
    typ: string;
};

export type VerificationTokenPayload = {
    userId: string;
    token: string;
    type?: string;
    metadata?: any;
    expiresAt?: Date | null;
};

export type VerificationReturnValue = {
    id: string;
    userId: string;
    token: string;
    type: string;
    metadata: any;
    expiresAt: Date | null;
    createdAt: Date;
};
