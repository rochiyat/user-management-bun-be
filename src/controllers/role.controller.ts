import type { Request, Response, NextFunction } from 'express';
import { prisma } from '../configs/db.config';
import { returnSuccess } from '../utils/response.util';

export const getRoles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roles = await prisma.role.findMany();
    returnSuccess(res, 200, 'Roles fetched successfully', roles);
  } catch (error) {
    next(error);
  }
};

export const getRoleById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const role = await prisma.role.findUnique({ where: { id } });
    returnSuccess(res, 200, 'Role fetched successfully', role);
  } catch (error) {
    next(error);
  }
};

export const createRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description } = req.body;
    const role = await prisma.role.create({ data: { name, description } });
    returnSuccess(res, 201, 'Role created successfully', role);
  } catch (error) {
    next(error);
  }
};

export const updateRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const role = await prisma.role.update({
      where: { id },
      data: { name, description },
    });
    returnSuccess(res, 200, 'Role updated successfully', role);
  } catch (error) {
    next(error);
  }
};

export const deleteRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await prisma.role.delete({ where: { id } });
    returnSuccess(res, 200, 'Role deleted successfully', null);
  } catch (error) {
    next(error);
  }
};
