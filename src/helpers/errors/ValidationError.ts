import { ApiError } from "./ApiError";

export class ValidationError extends ApiError {
  /**
   *
   */
  constructor(message: string, details?: any[]) {
    super(422, message, details);
  }
}
