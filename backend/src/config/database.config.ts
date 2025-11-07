import mongoose from 'mongoose';
import { config } from './env.config';
import { logger } from '@config/logger.config';

export const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(config.mongodbUri);
    logger.info(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    logger.error('❌ MongoDB connection error', err);
    process.exit(1);
  }
};