import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";

import { JwtPayload, JwtRefreshPayload } from "../types";

dotenv.config();

const getAccessSecret = () => process.env.JWT_SECRET;
const getRefreshSecret = () => process.env.JWT_REFRESH_SECRET;

export class JwtUtil {
    static generateAccessToken(payload: JwtPayload): string {
        return jwt.sign(payload, getAccessSecret()!, {
            expiresIn: "15m",
        });
    }

    static verifyAccessToken(token: string): JwtPayload {
        return jwt.verify(token, getAccessSecret()!) as JwtPayload;
    }

    static generateRefreshToken(jti: string): string {
        return jwt.sign(
            {
                jti,
                typ: "refresh",
            },
            getRefreshSecret()!,
            {
                expiresIn: "7d",
            },
        );
    }

    static verifyRefreshToken(token: string): JwtRefreshPayload {
        return jwt.verify(token, getRefreshSecret()!) as JwtRefreshPayload;
    }

    static generateTokenId(): string {
        return crypto.randomUUID();
    }

    static hashToken(token: string): string {
        return crypto.createHash("sha256").update(token).digest("hex");
    }
}
