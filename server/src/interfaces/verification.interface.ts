import { VerificationReturnValue, VerificationTokenPayload } from "../types";

export interface IVerificationRepository {
    createVerificationToken(
        payload: VerificationTokenPayload,
    ): Promise<VerificationReturnValue>;
    getVerificationTokenUserId(
        userId: string,
    ): Promise<VerificationReturnValue | null>;
    getVerificationTokenUserId(
        token: string,
    ): Promise<VerificationReturnValue | null>;
    deleteVerificationToken(userId: string): Promise<void>;
}
