import { Request, Response, NextFunction } from 'express';
import { ZodType, z } from 'zod';
import { ValidationError } from '../utils/errors/validationError';

type ValidationTarget = 'body' | 'query' | 'params';

export const validate =
  (schema: ZodType, target: ValidationTarget = 'body') =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      const flattened = z.flattenError(result.error);

      throw new ValidationError(
        'Invalid request data',
        flattened.fieldErrors
      );
    }

    Object.defineProperty(req, target, {
      value: result.data,
      writable: true,
      configurable: true,
      enumerable: true,
    });
    next();
  };
