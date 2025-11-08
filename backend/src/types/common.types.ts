export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  meta?: Record<string, unknown>;
}

export interface AppErrorShape extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export interface JwtPayload {
  userId: string;
  iat?: number;
  exp?: number;
}