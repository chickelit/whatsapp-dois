import { ApiError } from "./ApiError";

export class UnauthorizedAccessError extends ApiError {
  /**
   *
   */
  constructor(details?: any[]) {
    super(401, "Acesso não autorizado", details);
  }
}
