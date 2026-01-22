import { User, UserWithTokens } from "../types/auth.types";
import { UserRegisterInput, UserLoginInput } from "../schemas/auth.schema";

export interface IUserRepository {
    getUserById(id: string): Promise<User | null>;
    getUserByEmail(email: string): Promise<User | null>;
    createUser(user: UserRegisterInput): Promise<User>;
    updateUser(id: string, user: Partial<UserRegisterInput>): Promise<User>;
    deleteUser(id: string): Promise<User>;
}

export interface IAuthService {
    register(data: UserRegisterInput): Promise<User>;
    login(data: UserLoginInput): Promise<UserWithTokens>;
    logout(): Promise<void>;
    refresh(): Promise<UserWithTokens>;
}
