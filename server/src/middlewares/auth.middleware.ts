import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../utils/errors/unauthorizedError";
import { JwtUtil } from "../utils/jwt.util";

export const authenticated = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthorizedError("Unauthorized");
    }
    const token = authHeader.split(" ")[1];
    const decodedToken = JwtUtil.verifyAccessToken(token);
    if (!decodedToken) {
        throw new UnauthorizedError("Unauthorized");
    }
    req.user = {
        id: decodedToken.id,
        email: decodedToken.email,
        role: decodedToken.role,
    };
    next();
};
