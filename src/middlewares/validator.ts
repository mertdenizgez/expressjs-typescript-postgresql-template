import { Request, Response, NextFunction } from "express";

interface Schema {
  body?: {
    validate: (data: any) => { error: any };
  };
  params?: {
    validate: (data: any) => { error: any };
  };
}

interface ValidationResult {
  isValid: boolean;
  details?: Details[];
}

interface Details {
  message: string;
}

function validateBody(schema: Schema) {
  return function (req: Request): ValidationResult {
    if (schema && schema.body) {
      const validationResult = schema.body.validate(req.body);
      if (validationResult.error) {
        return { isValid: false, details: validationResult.error.details };
      }

      return { isValid: true };
    }
    return { isValid: false };
  };
}

function errorHandler(next: NextFunction) {
  return function (res: Response, validationResult?: ValidationResult) {
    if (!validationResult || validationResult.isValid) {
      next();
      return;
    }

    if (!validationResult?.details) {
      next(new Error(""));
      return;
    }

    const errorMessage = validationResult.details
      .map(function (detail) {
        return detail.message;
      })
      .join(", ");
    next(new Error(errorMessage));
    res.status(400).send(errorMessage);
    return;
  };
}

export function validate(schema: Schema) {
  return function (req: Request, res: Response, next: NextFunction) {
    const validationResult: ValidationResult = validateBody(schema)(req);
    errorHandler(next)(res, validationResult);
  };
}

export default {
  validate,
};
