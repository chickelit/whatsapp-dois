import { ApiError } from "./ApiError";

export class NotFoundError extends ApiError {
  /**
   *
   */
  constructor(message: string, details?: any[]) {
    super(404, message, details);
  }
}
