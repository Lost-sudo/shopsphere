import { token } from "morgan";
import redis from "../config/redis";
import { IRefreshSessionService } from "../interfaces/user.interface";
import { UnauthorizedError } from "../utils/errors/unauthorizedError";
import { JwtUtil } from "../utils/jwt.util";

export class RefreshSessionService implements IRefreshSessionService {
    private static readonly REFRESH_TTL = 60 * 60 * 24 * 7;
    async createSession(jti: string, userId: string): Promise<string> {
        if (!jti || !userId) {
            throw new UnauthorizedError("Invalid jti or userId");
        }

        const hashedTokenId = JwtUtil.hashToken(jti);
        const key = `refresh:${hashedTokenId}`;

        await redis.hset(key, {
            jti,
            userId,
        });

        await redis.expire(key, RefreshSessionService.REFRESH_TTL);

        return jti;
    }
    async verifySession(jti: string): Promise<{ userId: string }> {
        const hashedTokenId = JwtUtil.hashToken(jti);
        const key = `refresh:${hashedTokenId}`;

        const session = await redis.hgetall(key);
        if (!session) {
            throw new UnauthorizedError("Invalid jti");
        }
        return { userId: session.userId };
    }
    async revokeSession(jti: string): Promise<void> {
        const hashedTokenId = JwtUtil.hashToken(jti);
        const key = `refresh:${hashedTokenId}`;

        await redis.del(key);
    }
    async rotateSession(jti: string): Promise<string | null> {
        const oldHashed = JwtUtil.hashToken(jti);
        const oldKey = `refresh:${oldHashed}`;

        const session = await redis.hgetall(oldKey);

        if (!session) {
            throw new UnauthorizedError("Invalid jti");
        }

        const newJti = JwtUtil.generateTokenId();
        const newHashed = JwtUtil.hashToken(newJti);
        const newKey = `refresh:${newHashed}`;

        await redis.hset(newKey, {
            jti: newJti,
            userId: session.userId,
        });

        await redis.expire(newKey, RefreshSessionService.REFRESH_TTL);

        await redis.del(oldKey);

        return newJti;
    }
}
