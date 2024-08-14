import { ApiError } from "./ApiError";

export class TeapotError extends ApiError {
  /**
   *
   */
  constructor(message: string, details?: any[]) {
    super(418, message, details);
  }
}
