import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../config/jwt';
import { response } from '../utils/response';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return response(res, 401, 'No token provided');
  }
  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return response(res, 401, 'Invalid token');
  }
};