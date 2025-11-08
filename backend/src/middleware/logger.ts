import { logger } from '@config/logger.config';
import type { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on('finish', () => {
    const ms = Date.now() - start;
    logger.info(`${req.method} ${req.originalUrl} ${res.statusCode} - ${ms}ms`);
  });
  next();
};