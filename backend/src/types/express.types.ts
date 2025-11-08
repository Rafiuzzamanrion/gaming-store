import type { Request } from 'express';
import type { Document } from 'mongoose';

export type UserRole = 'user' | 'admin' | 'moderator';

export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  role: UserRole;
  avatar?: string;
  isEmailVerified: boolean;
  comparePassword(candidate: string): Promise<boolean>;
}

export interface AuthRequest extends Request {
  user?: UserDocument;
}