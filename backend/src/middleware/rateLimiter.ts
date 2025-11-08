import rateLimit from 'express-rate-limit';

// @ts-ignore
export const createRateLimiter = (options?: Partial<rateLimit.Options>) =>
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    ...options,
  });