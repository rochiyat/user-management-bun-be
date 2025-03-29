import prisma from '../configs/db.config';
import type { Request, Response, NextFunction } from 'express';
import { returnSuccess, returnNonSuccess } from '../utils/helper.util';

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await prisma.user.findMany();
    returnSuccess(req, res, 200, 'Users fetched successfully', users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id } });
    returnSuccess(req, res, 200, 'User fetched successfully', user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const user = await prisma.user.create({ data: { name, email, password } });
    returnSuccess(req, res, 201, 'User created successfully', user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const user = await prisma.user.update({
      where: { id },
      data: { name, email, password },
    });
    returnSuccess(req, res, 200, 'User updated successfully', user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.delete({ where: { id } });
    returnSuccess(req, res, 200, 'User deleted successfully', user);
  } catch (error) {
    next(error);
  }
};
