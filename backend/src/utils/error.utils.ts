import type { AppErrorShape } from '../types/common.types';

export const createError = (
  message: string,
  statusCode: number = 500,
  isOperational: boolean = true
): AppErrorShape => {
  const err = new Error(message) as AppErrorShape;
  err.statusCode = statusCode;
  err.isOperational = isOperational;
  return err;
};

export const badRequest    = (msg = 'Bad Request') => createError(msg, 400);
export const unauthorized  = (msg = 'Unauthorized') => createError(msg, 401);
export const forbidden     = (msg = 'Forbidden') => createError(msg, 403);
export const notFoundError = (msg = 'Not Found') => createError(msg, 404);
export const conflict      = (msg = 'Conflict') => createError(msg, 409);
export const internal      = (msg = 'Internal Server Error') => createError(msg, 500);