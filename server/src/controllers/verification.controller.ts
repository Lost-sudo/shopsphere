import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/async.middleware";
import { VerificationService } from "../services/verification.service";
import { IUserRepository } from "../interfaces/user.interface";
import { BadRequestError } from "../utils/errors/badRequestError";

export class VerificationController {
  constructor(
    private readonly verificationService: VerificationService,
    private readonly userRepository: IUserRepository
  ) {}

  verifyEmailUpdate = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.query;
    if (!token) throw new BadRequestError("Token is required.");

    const verification = await this.verificationService.verifyToken(token as string, "EMAIL_UPDATE");
    const { newEmail } = verification.metadata as { newEmail: string };

    await this.userRepository.updateUser(verification.userId, { email: newEmail });
    await this.verificationService.completeVerification(verification.userId);

    res.status(200).json({
      success: true,
      message: "Email updated successfully.",
    });
  });

  verifyPasswordReset = asyncHandler(async (req: Request, res: Response) => {
    const { token, newPassword } = req.body;
    if (!token) throw new BadRequestError("Token is required.");
    if (!newPassword) throw new BadRequestError("New password is required.");

    const verification = await this.verificationService.verifyToken(token, "PASSWORD_RESET");

    await this.userRepository.updateUser(verification.userId, { password: newPassword });
    await this.verificationService.completeVerification(verification.userId);

    res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });
  });
}
