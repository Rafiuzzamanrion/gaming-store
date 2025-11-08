import type { AppErrorShape } from '../types/common.types';
import { ERROR_MESSAGES } from '@constants/error-messages';
import { logger } from '@config/logger.config';

export const errorHandler = (err: any, _req: any, res: any, _next: any) => {
  const isZod = err?.name === 'ZodError';

  const statusCode =
    (err as AppErrorShape)?.statusCode || (isZod ? 400 : 500);

  const message =
    err?.message || (isZod ? ERROR_MESSAGES.VALIDATION : ERROR_MESSAGES.INTERNAL);

  logger.error('Error handler caught:', {
    message: err?.message,
    stack: err?.stack,
    statusCode
  });

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err?.stack })
  });
};