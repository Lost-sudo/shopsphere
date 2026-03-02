import {
    User,
    UserWithTokens,
    SafeUser,
    AuthTokens,
} from "../types/auth.types";
import { UserRegisterInput, UserLoginInput } from "../schemas/auth.schema";
import { JwtPayload } from "../types";
import { UpdateUserEmail, UpdateUserName, UpdateUserPassword } from "../schemas/user.schema";

export interface UserRepositoryImp {
    getAllUser(): Promise<User[]>;
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

export interface AuthServiceImp {
    register(data: UserRegisterInput): Promise<SafeUser>;
    login(data: UserLoginInput): Promise<UserWithTokens>;
    logout(refreshToken: string): Promise<void>;
    getMe(user: JwtPayload): Promise<SafeUser>;
    refresh(refreshToken: string, user: JwtPayload): Promise<AuthTokens>;
    verifyVerificationToken(token: string): Promise<void>;
    requestVerificationEmail(email: string): Promise<void>;
}

export interface UserServiceImp {
    getAllUser(): Promise<User[]>;
    getProfile(id: string): Promise<SafeUser>
    getProfileById(id: string): Promise<SafeUser>
    updateUserName(id: string, data: UpdateUserName): Promise<SafeUser>;
    updateUserEmail(id: string, data: UpdateUserEmail): Promise<SafeUser>;
    updateUserPassword(id: string, data: UpdateUserPassword): Promise<boolean>;
    deleteUser(id: string): Promise<boolean>
}
