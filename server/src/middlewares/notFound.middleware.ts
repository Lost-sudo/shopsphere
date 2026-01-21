import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../utils/errors/notFoundError";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundError(`Can't find ${req.originalUrl} on this server!`));
};
