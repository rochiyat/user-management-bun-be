import type { Request, Response, NextFunction } from 'express';
import { hash, compare } from 'bcrypt-ts';
import { returnSuccess, returnNonSuccess } from '../utils/response.util';
import prisma from '../configs/db.config';
import { decodeToken, generateToken, getTokenFromHeader } from '../utils/auth.util';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      returnNonSuccess(res, 401, 'Invalid credentials');
      return;
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      returnNonSuccess(res, 401, 'Invalid credentials');
      return;
    }

    const token = generateToken(user.id);
    const refreshToken = generateToken(user.id);
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    returnSuccess(res, 200, 'Login successful', {
      token,
      refreshToken,
      expiresAt,
    });
  } catch (error) {
    next(error);
  }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const passwordHash = await hash(password, process.env.SALT_ROUNDS || 10);
    const user = await prisma.user.create({
      data: { email, password: passwordHash, name: email.split('@')[0] },
    });
    returnSuccess(res, 201, 'Register successful', user);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = getTokenFromHeader(req);
    if (!token) {
      returnNonSuccess(res, 401, 'Unauthorized');
      return;
    }
    const decodedToken = decodeToken(token);
    if (!decodedToken) {
      returnNonSuccess(res, 401, 'Unauthorized');
      return;
    }
    returnSuccess(res, 200, 'Logout successful', {});
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = getTokenFromHeader(req);
    if (!token) {
      returnNonSuccess(res, 401, 'Unauthorized');
      return;
    }
    const decodedToken = decodeToken(token);
    if (!decodedToken) {
      returnNonSuccess(res, 401, 'Unauthorized');
      return;
    }
    const user = await prisma.user.findUnique({
      where: { id: decodedToken.id },
    });
    if (!user) {
      returnNonSuccess(res, 401, 'Unauthorized');
      return;
    }
    const newToken = generateToken(user.id);
    const newRefreshToken = generateToken(user.id);
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    returnSuccess(res, 200, 'Refresh token successful', {
      token: newToken,
      refreshToken: newRefreshToken,
      expiresAt,
    });
  } catch (error) {
    next(error);
  }
};
