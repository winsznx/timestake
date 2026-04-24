/**
 * Standardized response wrapper for Base network operations.
 */
export interface AdapterResponse<T> {
  /** The payload on success */
  readonly data?: T;
  /** The error message on failure */
  readonly error?: string;
  /** ISO timestamp of the operation */
  readonly timestamp: number;
}

/** Creates a successful adapter response */
export function ok<T>(data: T): AdapterResponse<T> {
  return { data, timestamp: Date.now() };
}

/** Creates a failed adapter response */
export function fail<T = never>(error: string): AdapterResponse<T> {
  return { error, timestamp: Date.now() };
}
