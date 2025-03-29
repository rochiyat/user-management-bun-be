import prisma from '../configs/db.config';
import type { Request, Response } from 'express';
import { returnSuccess, returnNonSuccess } from '../utils/helper.util';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    return returnSuccess(req, res, 200, 'Users fetched successfully', users);
  } catch (error) {
    return returnNonSuccess(req, res, 500, 'Failed to fetch users');
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id } });
    return returnSuccess(req, res, 200, 'User fetched successfully', user);
  } catch (error) {
    return returnNonSuccess(req, res, 500, 'Failed to fetch user');
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await prisma.user.create({ data: { name, email, password } });
    return returnSuccess(req, res, 201, 'User created successfully', user);
  } catch (error) {
    return returnNonSuccess(req, res, 500, 'Failed to create user');
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const user = await prisma.user.update({
      where: { id },
      data: { name, email, password },
    });
    return returnSuccess(req, res, 200, 'User updated successfully', user);
  } catch (error) {
    return returnNonSuccess(req, res, 500, 'Failed to update user');
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.delete({ where: { id } });
    return returnSuccess(req, res, 200, 'User deleted successfully', user);
  } catch (error) {
    return returnNonSuccess(req, res, 500, 'Failed to delete user');
  }
};
