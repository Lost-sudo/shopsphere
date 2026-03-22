import { VerificationReturnValue, VerificationTokenPayload } from "../types";

export interface IVerificationRepository {
    createVerificationToken(
        payload: VerificationTokenPayload,
    ): Promise<VerificationReturnValue>;
    getVerificationTokenUserId(
        token: string,
    ): Promise<VerificationReturnValue | null>;
    deleteVerificationToken(userId: string): Promise<void>;
    getVerificationToken(
        userId: string,
    ): Promise<VerificationReturnValue | null>;
}
