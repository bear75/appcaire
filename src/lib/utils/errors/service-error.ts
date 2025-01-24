export class ServiceError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = 'ServiceError';
  }

  static fromError(error: unknown): ServiceError {
    if (error instanceof ServiceError) {
      return error;
    }

    if (error instanceof Error) {
      return new ServiceError(error.message, 'UNKNOWN_ERROR', error);
    }

    return new ServiceError('An unknown error occurred', 'UNKNOWN_ERROR', error);
  }
} 