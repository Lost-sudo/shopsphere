import { AuthController } from "../controllers/auth.controller";
import { UserRepository } from "../repositories/user.repository";
import { AuthService } from "../services/auth.service";
import { RefreshSessionService } from "../services/refreshSession.service";

const userRepo = new UserRepository();
const refreshSessionService = new RefreshSessionService();
export const authService = new AuthService(userRepo, refreshSessionService);
export const authController = new AuthController(authService);
