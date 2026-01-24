import {
    User,
    UserWithTokens,
    SafeUser,
    AuthTokens,
} from "../types/auth.types";
import { UserRegisterInput, UserLoginInput } from "../schemas/auth.schema";
import { JwtPayload } from "../types";

export interface IUserRepository {
    getUserById(id: string): Promise<User | null>;
    getUserByEmail(email: string): Promise<User | null>;
    createUser(user: UserRegisterInput): Promise<User>;
    updateUser(id: string, user: Partial<UserRegisterInput>): Promise<User>;
    deleteUser(id: string): Promise<User>;
}

export interface IRefreshSessionService {
    createSession(jti: string, userId: string): Promise<string>;
    verifySession(jti: string): Promise<{ userId: string }>;
    revokeSession(jti: string): Promise<void>;
    rotateSession(jti: string): Promise<string | null>;
}

export interface IAuthService {
    register(data: UserRegisterInput): Promise<SafeUser>;
    login(data: UserLoginInput): Promise<UserWithTokens>;
    logout(refreshToken: string): Promise<void>;
    refresh(refreshToken: string, user: JwtPayload): Promise<AuthTokens>;
    verifyVerificationToken(token: string): Promise<void>;
    requestVerificationEmail(email: string): Promise<void>;
}
