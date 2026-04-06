import prisma from "../config/db";
import { IVerificationRepository } from "../interfaces/verification.interface";
import { VerificationTokenPayload, VerificationReturnValue } from "../types";

export class VerificationRepository implements IVerificationRepository {
    async createVerificationToken(
        payload: VerificationTokenPayload,
    ): Promise<VerificationReturnValue> {
        return await prisma.verificationToken.create({
            data: {
                userId: payload.userId,
                token: payload.token,
                type: payload.type as any,
                metadata: payload.metadata,
                expiresAt: payload.expiresAt,
            },
        }) as any;
    }
    async getVerificationTokenUserId(
        token: string,
    ): Promise<VerificationReturnValue | null> {
        return await prisma.verificationToken.findUnique({
            where: {
                token,
            },
        });
    }
    async deleteVerificationToken(userId: string): Promise<void> {
        await prisma.verificationToken.delete({
            where: {
                userId,
            },
        });
    }
    async getVerificationToken(
        userId: string,
    ): Promise<VerificationReturnValue | null> {
        return await prisma.verificationToken.findUnique({
            where: {
                userId,
            },
        });
    }
}

export const verificationRepository = new VerificationRepository();
