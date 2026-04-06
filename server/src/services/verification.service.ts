import { IVerificationRepository } from "../interfaces/verification.interface";
import { IUserRepository } from "../interfaces/user.interface";
import { VerificationUtil } from "../utils/verification.util";
import { BadRequestError } from "../utils/errors/badRequestError";
import { NotFoundError } from "../utils/errors/notFoundError";
import { verificationRepository } from "../repositories/verification.repository";
import { userRepository } from "../repositories/user.repository";

export class VerificationService {
  constructor(
    private readonly verificationRepository: IVerificationRepository,
    private readonly userRepository: IUserRepository
  ) {}

  async initiateEmailUpdate(userId: string, newEmail: string) {
    const user = await this.userRepository.getUserById(userId);
    if (!user) throw new NotFoundError("User not found.");

    const token = VerificationUtil.generateVerificationToken();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await this.verificationRepository.deleteVerificationToken(userId);
    await this.verificationRepository.createVerificationToken({
      userId,
      token,
      type: "EMAIL_UPDATE",
      metadata: { newEmail },
      expiresAt,
    });

    await VerificationUtil.sendVerificationEmail(newEmail, token);
  }

  async initiatePasswordReset(email: string) {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) throw new NotFoundError("User with this email not found.");

    const token = VerificationUtil.generateVerificationToken();
    const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

    await this.verificationRepository.deleteVerificationToken(user.id);
    await this.verificationRepository.createVerificationToken({
      userId: user.id,
      token,
      type: "PASSWORD_RESET",
      expiresAt,
    });

    await VerificationUtil.sendVerificationEmail(email, token);
  }

  async verifyToken(token: string, type: string) {
    const verification = await this.verificationRepository.getVerificationTokenUserId(token);
    if (!verification) throw new BadRequestError("Invalid or expired token.");

    if (verification.type !== type) throw new BadRequestError("Invalid token type.");

    if (verification.expiresAt && verification.expiresAt < new Date()) {
      await this.verificationRepository.deleteVerificationToken(verification.userId);
      throw new BadRequestError("Token has expired.");
    }

    return verification;
  }

  async completeVerification(userId: string) {
    await this.verificationRepository.deleteVerificationToken(userId);
  }
}

export const verificationService = new VerificationService(
  verificationRepository,
  userRepository,
);
