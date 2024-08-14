export class ApiError extends Error {
  public readonly statusCode: number = 500;
  public readonly message: string = "Erro interno do servidor";
  public readonly details: any[] = [];

  /**
   *
   */
  constructor(statusCode?: number, message?: string, details?: any[]) {
    super(message);

    statusCode && (this.statusCode = statusCode);
    message && (this.message = message);
    details && (this.details = details);
  }
}
