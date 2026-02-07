import { UserRepository } from "../repositories/user.repository";
import { VerificationRepository } from "../repositories/verification.repository";
import { AuthServiceImp } from "../interfaces/user.interface";
import {
    User,
    UserWithTokens,
    SafeUser,
    AuthTokens,
} from "../types/auth.types";
import { UserRegisterInput, UserLoginInput } from "../schemas/auth.schema";
import { comparePassword, hashPassword } from "../utils/hash.util";
import { BadRequestError } from "../utils/errors/badRequestError";
import { JwtUtil } from "../utils/jwt.util";
import { RefreshSessionService } from "./refreshSession.service";
import { JwtPayload, JwtRefreshPayload } from "../types";
import { VerificationUtil } from "../utils/verification.util";
import { NotFoundError } from "../utils/errors/notFoundError";

export class AuthService implements AuthServiceImp {
    constructor(
        private userRepository: UserRepository,
        private refreshSessionService: RefreshSessionService,
        private verificationRepository: VerificationRepository,
    ) {}
    private safeUser(data: User) {
        const { password, ...safeUser } = data;

        return safeUser;
    }
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

        // Create Verification Token for User
        const verificationToken = VerificationUtil.generateVerificationToken();
        await this.verificationRepository.createVerificationToken({
            userId: newUser.id,
            token: verificationToken,
        });
        // Send the Verification Email
        await VerificationUtil.sendVerificationEmail(
            newUser.email,
            verificationToken,
        );

        const safeUser = this.safeUser(newUser);

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

        if (!user.emailVerified) {
            throw new BadRequestError(
                "Email not verified. Please verify your email before logging in.",
            );
        }

        const jti = JwtUtil.generateTokenId();

        await this.refreshSessionService.createSession(jti, user.id);

        const accessToken = JwtUtil.generateAccessToken({
            id: user.id,
            email: user.email,
            role: user.role,
        });

        const refreshToken = JwtUtil.generateRefreshToken(jti);

        const safeUser = this.safeUser(user)

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
    async getMe(user: JwtPayload): Promise<SafeUser> {
        const existingUser = await this.userRepository.getUserById(user.id);
        if (!existingUser) {
            throw new NotFoundError("User not found");
        }
        const safeUser = this.safeUser(existingUser);
        return safeUser;
    }
    async refresh(refreshToken: string, user: JwtPayload): Promise<AuthTokens> {
        let payload: JwtRefreshPayload;

        try {
            payload = JwtUtil.verifyRefreshToken(refreshToken);
        } catch (error) {
            throw new BadRequestError("Invalid or expired refresh token");
        }

        if (payload.typ !== "refresh") {
            throw new BadRequestError("Invalid token type");
        }

        const newSession = await this.refreshSessionService.rotateSession(
            payload.jti,
        );

        if (!newSession) {
            throw new BadRequestError("Invalid or expired refresh token");
        }

        const newAccessToken = JwtUtil.generateAccessToken({
            id: user.id,
            email: user.email,
            role: user.role,
        });

        const newRefreshToken = JwtUtil.generateRefreshToken(newSession);

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        };
    }
    async verifyVerificationToken(token: string): Promise<void> {
        const verificationToken =
            await this.verificationRepository.getVerificationTokenUserId(token);

        if (!verificationToken) {
            throw new BadRequestError("Token is missing or invalid");
        }

        const result = await this.userRepository.updateUser(
            verificationToken.userId,
            {
                emailVerified: true,
            },
        );

        if (result) {
            await this.verificationRepository.deleteVerificationToken(
                verificationToken.userId,
            );
        }
    }
    async requestVerificationEmail(email: string): Promise<void> {
        const user = await this.userRepository.getUserByEmail(email);

        if (!user) {
            throw new NotFoundError(
                "User with the provided email does not exist.",
            );
        }

        if (user.emailVerified) {
            throw new BadRequestError("Email is already verified.");
        }

        let verificationToken;

        const existingToken =
            await this.verificationRepository.getVerificationToken(user.id);

        if (existingToken) {
            verificationToken = existingToken.token;
        } else {
            verificationToken = VerificationUtil.generateVerificationToken();
        }

        await VerificationUtil.sendVerificationEmail(
            user.email,
            verificationToken,
        );
    }
}
