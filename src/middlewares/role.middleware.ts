import type { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateCreateRole = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return next(error);
  next();
};

export const validateUpdateRole = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) return next(error);
  next();
};

export const validateDeleteRole = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    id: Joi.string().required(),
  });
  const { error } = schema.validate(req.params);
  if (error) return next(error);
  next();
};

export const validateGetRoleById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    id: Joi.string().required(),
  });
  const { error } = schema.validate(req.params);
  if (error) return next(error);
  next();
};

export const validateGetRoles = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) return next(error);
  next();
};
