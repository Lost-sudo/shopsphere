import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../utils/errors/unauthorizedError";
import { JwtUtil } from "../utils/jwt.util";
import { Role } from "../types/auth.types";

export const authenticated = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthorizedError("Please log in to get access");
    }

    const token = authHeader.split(" ")[1];

    try {
        const decodedToken = JwtUtil.verifyAccessToken(token);

        req.user = {
            id: decodedToken.id,
            email: decodedToken.email,
            role: decodedToken.role,
        };

        next();
    } catch (error: any) {
        if (error.name === "TokenExpiredError") {
            throw new UnauthorizedError(
                "Your token has expired! Please log in again.",
            );
        }
        if (error.name === "JsonWebTokenError") {
            throw new UnauthorizedError("Invalid token. Please log in again.");
        }
        throw error;
    }
};

export const authorized = (allowedRole: Role[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = req.user?.role as Role;

        if (!userRole || !allowedRole.includes(userRole)) {
            throw new UnauthorizedError(
                "You do not have permission to perform this action",
            );
        }

        next();
    };
};
