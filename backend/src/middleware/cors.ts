import cors from 'cors';

export const corsMiddleware = (origin: string | string[]) =>
  cors({
    origin,
    credentials: true,
  });