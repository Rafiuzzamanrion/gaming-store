import { createServer } from 'http';
import app from './src/app';
import { config } from './src/config/env.config';
import { logger } from './src/config/logger.config';

const server = createServer(app);

server.listen(config.port, () => {
  logger.info(`Backend listening on http://localhost:${config.port} (${config.nodeEnv})`);
});