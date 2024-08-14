import { NextFunction, Request, Response } from "express";
import { ApiError } from "Src/helpers/errors/ApiError";

export const expressAsyncErrorsMiddleware = (error: Error & ApiError, request: Request, response: Response, _next: NextFunction) => {
  console.log(error);

  return response.status(error.statusCode).json(error);
};
