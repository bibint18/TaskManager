import { Response } from 'express';

export const response = (res: Response, statusCode: number, message: string, data: any = null) => {
  res.status(statusCode).json({ message, data });
};