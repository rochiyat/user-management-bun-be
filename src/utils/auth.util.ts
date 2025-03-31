import jwt, { type JwtPayload } from 'jsonwebtoken';
import type { NextFunction, Request, Response } from 'express';
import env from '../configs/env.config';
import { returnNonSuccess } from './response.util';

export function generateToken(id: string) {
  return jwt.sign({ id }, env.JWT_SECRET, { expiresIn: '1h' });
}

export function verifyToken(token: string) {
  return jwt.verify(token, env.JWT_SECRET);
}

export function decodeToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    return decoded as JwtPayload;
  } catch (error: unknown) {
    if (error instanceof jwt.JsonWebTokenError) {
      return null;
    }
    throw error;
  }
}

export function getTokenFromHeader(req: Request) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return null;
  const token = authHeader.split(' ')[1];
  return token;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  const token = getTokenFromHeader(req);
  if (!token) {
    return returnNonSuccess(res, 401, 'Unauthorized');
  }
  next();
}
