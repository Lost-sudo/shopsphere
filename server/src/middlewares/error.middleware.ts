import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors/appError";

export const globalErrorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    let statusCode = 500;
    let message = "Something went very wrong!";
    let status = "error";

    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
        status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    }

    // Handle specific Prisma or other library errors here if needed
    // Example: if (err.name === 'PrismaClientKnownRequestError') ...

    if (process.env.NODE_ENV === "development") {
        res.status(statusCode).json({
            status,
            message,
            error: err,
            stack: err.stack,
        });
    } else {
        // Production
        if (err instanceof AppError && err.isOperational) {
            res.status(statusCode).json({
                status,
                message,
            });
        } else {
            // Non-operational or unknown errors
            console.error("ERROR 💥", err);
            res.status(500).json({
                status: "error",
                message: "Something went very wrong!",
            });
        }
    }
};
