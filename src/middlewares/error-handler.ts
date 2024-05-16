import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";
import { ErrorCodes } from "./error-codes";

export async function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { message } = err;

  if (err instanceof Error) {
    switch (message) {
      case ErrorCodes.USER_NOT_EXISTS:
        res.status(httpStatus.NOT_FOUND).send({
          code: httpStatus.NOT_FOUND,
          msg: ErrorCodes.USER_NOT_EXISTS,
        });
        break;
      case ErrorCodes.BOOK_NOT_EXISTS:
        res.status(httpStatus.NOT_FOUND).send({
          code: httpStatus.NOT_FOUND,
          msg: ErrorCodes.BOOK_NOT_EXISTS,
        });
        break;

      case ErrorCodes.DATA_NOT_EXISTS:
        res.status(httpStatus.NOT_FOUND).send({
          code: httpStatus.NOT_FOUND,
          msg: ErrorCodes.DATA_NOT_EXISTS,
        });
        break;
      case ErrorCodes.ALREADY_BARROWED:
        res.status(httpStatus.CONFLICT).send({
          code: httpStatus.CONFLICT,
          msg: ErrorCodes.ALREADY_BARROWED,
        });
        break;
      default:
        res.status(httpStatus.BAD_REQUEST).send({
          code: httpStatus.BAD_REQUEST,
          msg: ErrorCodes.BAD_REQUEST,
        });
    }
  } else {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      code: httpStatus.INTERNAL_SERVER_ERROR,
      msg: "Internal Server Error",
    });
  }
}

export default {
  errorHandler,
};
