/**
 * @deprecated This file has been moved to src/lib/utils/errors/service-error.ts
 * Please update your imports to use the new location.
 * This file will be removed once all dependencies are updated.
 */

export class ServiceError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number = 500,
  ) {
    super(message);
    this.name = 'ServiceError';
  }
}
