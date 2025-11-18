import express from 'express';
import helmet from 'helmet';
import compression from 'compression';

import { corsMiddleware } from '@middleware/cors';
import { createRateLimiter } from '@middleware/rateLimiter';
import { requestLogger } from '@middleware/logger';
import { errorHandler } from '@middleware/errorHandler';
import { validateRequest } from '@middleware/validation';

import { config } from '@config/env.config';
import { connectDatabase } from '@config/database.config';

// import authRouter from '@modules/auth/routes/auth.routes';

const app = express();

app.use(helmet());
app.use(corsMiddleware(config.frontendUrl));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);


app.use('/api', createRateLimiter({ windowMs: 15 * 60 * 1000, max: 300 }));

app.get('/health', (_req, res) =>
  res.json({ status: 'ok', env: config.nodeEnv, timestamp: new Date().toISOString() })
);

// API routes
// app.use('/api/v1/auth', authRouter);

// Example: attach validator for a simple ping route (demonstration)
app.post('/api/v1/ping', validateRequest((z) => z.object({ ping: z.string().min(1) })), (req, res) => {
  res.json({ success: true, message: 'pong', data: req.body });
});

app.use((_req, res) => res.status(404).json({ success: false, message: 'Route not found' }));

app.use(errorHandler);
connectDatabase();

export default app;