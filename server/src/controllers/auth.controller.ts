import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/async.middleware";
import { AuthService } from "../services/auth.service";
import {
    loginSchema,
    registerSchema,
    UserLoginInput,
    UserRegisterInput,
} from "../schemas/auth.schema";

export class AuthController {
    constructor(private authService: AuthService) {}

    register = asyncHandler(async (req: Request, res: Response) => {
        const data: UserRegisterInput = registerSchema.parse(req.body);

        const user = await this.authService.register(data);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });
    });

    login = asyncHandler(async (req: Request, res: Response) => {
        const data: UserLoginInput = loginSchema.parse(req.body);

        const user = await this.authService.login(data);

        res.cookie("refreshToken", user.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7 * 1000,
        });

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: user.user,
            accessToken: user.accessToken,
        });
    });
}
