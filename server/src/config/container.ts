import { AuthController } from "../controllers/auth.controller";
import { UserRepository } from "../repositories/user.repository";
import { AuthService } from "../services/auth.service";
import { RefreshSessionService } from "../services/refreshSession.service";
import { VerificationRepository } from "../repositories/verification.repository";

const userRepo = new UserRepository();
const refreshSessionService = new RefreshSessionService();
const verificationRepository = new VerificationRepository();
export const authService = new AuthService(
    userRepo,
    refreshSessionService,
    verificationRepository,
);
export const authController = new AuthController(authService);
