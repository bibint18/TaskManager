import { Request, Response, NextFunction } from 'express';
import { response } from '../utils/response';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  return response(res, 500, 'Internal server error');
};