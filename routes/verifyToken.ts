import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export interface AuthRequest extends Request {
  user?: string | object; // or any other type
}

export default (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void | Response<string> => {
  const auth = req.header('Authorization');
  const token = auth?.split(' ')?.[1];
  if (!token) return res.status(400).send('Access denied');

  const secret = process.env.TOKEN_SECRET;
  if (!secret) return res.status(400).send('Secret is not defined');

  try {
    const verified = jwt.verify(token, secret);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};
