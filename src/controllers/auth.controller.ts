import type { Request, Response } from 'express';
import { returnSuccess, returnNonSuccess } from '../utils/helper.util';
import prisma from '../configs/db.config';
import {
  decodeToken,
  generateToken,
  getTokenFromHeader,
} from '../utils/auth.util';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return returnNonSuccess(req, res, 401, 'Invalid credentials');
    }

    const isPasswordValid = await Bun.password.verify(password, user.password);
    if (!isPasswordValid) {
      return returnNonSuccess(req, res, 401, 'Invalid credentials');
    }

    const token = generateToken(user.id);
    const refreshToken = generateToken(user.id);
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    return returnSuccess(req, res, 200, 'Login successful', {
      token,
      refreshToken,
      expiresAt,
    });
  } catch (error) {
    return returnNonSuccess(req, res, 500, 'Failed to login');
  }
};

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const passwordHash = await Bun.password.hash(password);
    const user = await prisma.user.create({
      data: { email, password: passwordHash, name: email.split('@')[0] },
    });
    return returnSuccess(req, res, 201, 'Register successful', user);
  } catch (error) {
    return returnNonSuccess(req, res, 500, 'Failed to register');
  }
};

export const logout = async (req: Request, res: Response) => {
  const token = getTokenFromHeader(req);
  if (!token) {
    return returnNonSuccess(req, res, 401, 'Unauthorized');
  }
  const decodedToken = decodeToken(token);
  if (!decodedToken) {
    return returnNonSuccess(req, res, 401, 'Unauthorized');
  }
  return returnSuccess(req, res, 200, 'Logout successful', {});
};

export const refreshToken = async (req: Request, res: Response) => {
  const token = getTokenFromHeader(req);
  if (!token) {
    return returnNonSuccess(req, res, 401, 'Unauthorized');
  }
  const decodedToken = decodeToken(token);
  if (!decodedToken) {
    return returnNonSuccess(req, res, 401, 'Unauthorized');
  }
  const user = await prisma.user.findUnique({
    where: { id: decodedToken.id },
  });
  if (!user) {
    return returnNonSuccess(req, res, 401, 'Unauthorized');
  }
};
