import { UserRepository } from "../repositories/user.repository";
import { IAuthService } from "../interfaces/user.interface";
import { User, UserWithTokens } from "../types/auth.types";
import { UserRegisterInput, UserLoginInput } from "../schemas/auth.schema";
import { comparePassword, hashPassword } from "../utils/hash.util";
import { BadRequestError } from "../utils/errors/badRequestError";
import { JwtUtil } from "../utils/jwt.util";

export class AuthService implements IAuthService {
    constructor(private userRepository: UserRepository) {}
    async register(data: UserRegisterInput): Promise<User> {
        const user = await this.userRepository.getUserByEmail(data.email);

        if (user) {
            throw new BadRequestError("User already exists");
        }

        const hashedPassword = await hashPassword(data.password);
        const newUser = await this.userRepository.createUser({
            ...data,
            password: hashedPassword,
        });

        return newUser;
    }
    async login(data: UserLoginInput): Promise<UserWithTokens> {
        const user = await this.userRepository.getUserByEmail(data.email);

        if (!user) {
            throw new BadRequestError("Invalid credentials");
        }

        const isPasswordValid = await comparePassword(
            data.password,
            user.password,
        );

        if (!isPasswordValid) {
            throw new BadRequestError("Invalid credentials");
        }

        const accessToken = JwtUtil.generateAccessToken({
            id: user.id,
            email: user.email,
            role: user.role,
        });

        return {
            ...user,
            accessToken,
        };
    }
    async logout(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async refresh(): Promise<UserWithTokens> {
        throw new Error("Method not implemented.");
    }
}
