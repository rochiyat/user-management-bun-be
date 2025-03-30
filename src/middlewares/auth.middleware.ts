import type { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { returnNonSuccess } from '../utils/response.util';

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return next(error);
  }
  return next();
};

export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return next(error);
  }
  return next();
};
