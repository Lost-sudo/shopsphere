import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { JwtPayload } from "../types";

dotenv.config();

const ACCESS_SECRET = process.env.JWT_SECRET;

export class JwtUtil {
    static generateAccessToken(payload: JwtPayload): string {
        return jwt.sign(payload, ACCESS_SECRET!, {
            expiresIn: "15m",
        });
    }

    static verifyAccessToken(token: string): JwtPayload {
        return jwt.verify(token, ACCESS_SECRET!) as JwtPayload;
    }
}
