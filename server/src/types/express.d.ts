import { JwtPayload } from "./index";

declare module "express-serve-static-core" {
    interface Request {
        user?: JwtPayload;
    }
}

export {};
