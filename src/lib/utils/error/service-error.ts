/**
 * Custom error class for service-level errors
 */
export class ServiceError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number = 500,
    public details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = "ServiceError";
  }

  /**
   * Create an error from an unknown error object
   */
  static fromError(error: unknown): ServiceError {
    if (error instanceof ServiceError) {
      return error;
    }

    if (error instanceof Error) {
      return new ServiceError(error.message, "UNKNOWN_ERROR");
    }

    return new ServiceError("An unknown error occurred", "UNKNOWN_ERROR");
  }
}
