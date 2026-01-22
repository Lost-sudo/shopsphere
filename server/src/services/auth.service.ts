import { UserRepository } from "../repositories/user.repository";
import { IAuthService } from "../interfaces/user.interface";
import { User, UserWithTokens, SafeUser } from "../types/auth.types";
import { UserRegisterInput, UserLoginInput } from "../schemas/auth.schema";
import { comparePassword, hashPassword } from "../utils/hash.util";
import { BadRequestError } from "../utils/errors/badRequestError";
import { JwtUtil } from "../utils/jwt.util";
import { RefreshSessionService } from "./refreshSession.service";

export class AuthService implements IAuthService {
    constructor(
        private userRepository: UserRepository,
        private refreshSessionService: RefreshSessionService,
    ) {}
    async register(data: UserRegisterInput): Promise<SafeUser> {
        const user = await this.userRepository.getUserByEmail(data.email);

        if (user) {
            throw new BadRequestError("User already exists");
        }

        const hashedPassword = await hashPassword(data.password);
        const newUser = await this.userRepository.createUser({
            ...data,
            password: hashedPassword,
        });

        const { password, ...safeUser } = newUser;

        return safeUser;
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

        const jti = JwtUtil.generateTokenId();

        await this.refreshSessionService.createSession(jti, user.id);

        const accessToken = JwtUtil.generateAccessToken({
            id: user.id,
            email: user.email,
            role: user.role,
        });

        const refreshToken = JwtUtil.generateRefreshToken(jti);

        const { password, ...safeUser } = user;

        return {
            user: safeUser,
            accessToken,
            refreshToken,
        };
    }
    async logout(refreshToken: string): Promise<void> {
        if (!refreshToken) {
            throw new BadRequestError("Refresh token is required");
        }

        try {
            const payload = JwtUtil.verifyRefreshToken(refreshToken);
            await this.refreshSessionService.revokeSession(payload.jti);
        } catch (error) {
            throw new BadRequestError("Invalid or expired refresh token");
        }
    }
    async refresh(): Promise<UserWithTokens> {
        throw new Error("Method not implemented.");
    }
}
