export interface AdapterResponse<T> {
  data?: T;
  error?: string;
  timestamp: number;
}

export function ok<T>(data: T): AdapterResponse<T> {
  return { data, timestamp: Date.now() };
}

export function fail<T = never>(error: string): AdapterResponse<T> {
  return { error, timestamp: Date.now() };
}
