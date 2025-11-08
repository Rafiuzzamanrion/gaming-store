import { createServer } from 'http';
import app from './app';
import { config } from '@config/env.config';
import { logger } from '@config/logger.config';

const server = createServer(app);

server.listen(config.port, () => {
  logger.info(`Backend listening on http://localhost:${config.port} (${config.nodeEnv})`);
});