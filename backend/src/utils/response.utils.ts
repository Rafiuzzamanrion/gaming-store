import type { Response } from 'express';
import type { ApiResponse } from '../types/common.types';

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  payload: ApiResponse<T>
) => res.status(statusCode).json(payload);