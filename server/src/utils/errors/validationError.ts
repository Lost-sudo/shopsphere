import { AppError } from "./appError";

export class ValidationError extends AppError {
    public errors?: unknown;

    constructor(message: string, errors?: unknown) {
        super(message, 422);
        this.errors = errors;
    }
}
