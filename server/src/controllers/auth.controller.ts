import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/async.middleware";
import { IAuthService } from "../interfaces/user.interface";
import { UserLoginInput, UserRegisterInput } from "../schemas/auth.schema";
import { JwtPayload } from "../types";
import { authService } from "@/services/auth.service";

export class AuthController {
  constructor(private authService: IAuthService) {}
  register = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body as UserRegisterInput;

    const user = await this.authService.register(data);

    res.status(201).json({
      success: true,
      message:
        "User registered successfully. Please verify your email before logging in.",
      user,
    });
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body as UserLoginInput;

    const result = await this.authService.login(data);

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: result.user,
      accessToken: result.accessToken,
    });
  });
  logout = asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;

    await this.authService.logout(refreshToken);

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  });
  getMe = asyncHandler(async (req: Request, res: Response) => {
    const authenticatedUser: JwtPayload = req.user!;

    const user = await this.authService.getMe(authenticatedUser);

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  });
  refresh = asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    const authenticatedUser: JwtPayload = req.user!;

    const result = await this.authService.refresh(
      refreshToken,
      authenticatedUser,
    );

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      accessToken: result.accessToken,
    });
  });
  verifyVerificationToken = asyncHandler(
    async (req: Request, res: Response) => {
      const token = req.query.token as string;

      await this.authService.verifyVerificationToken(token);

      res.status(200).json({
        success: true,
        message: "Email verified successfully. You can now log in.",
      });
    },
  );
  requestVerificationEmail = asyncHandler(
    async (req: Request, res: Response) => {
      const { email } = req.body;

      await this.authService.requestVerificationEmail(email);

      res.status(200).json({
        success: true,
        message:
          "Verification email sent successfully. Please check your inbox.",
      });
    },
  );
}

export const authController = new AuthController(authService);
