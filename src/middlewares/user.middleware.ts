import type { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateGetUserById = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    id: Joi.string().required(),
  });
  const { error } = schema.validate(req.params);
  if (error) return next(error);
  next();
};

export const validateCreateUser = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return next(error);
  next();
};

export const validateUpdateUser = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) return next(error);
  next();
};

export const validateDeleteUser = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    id: Joi.string().required(),
  });
  const { error } = schema.validate(req.params);
  if (error) return next(error);
  next();
};
