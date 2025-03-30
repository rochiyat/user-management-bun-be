import type { Request, Response } from 'express';

export function returnSuccess(
  res: Response,
  statusCode: number,
  message: string,
  data: unknown
) {
  const returnResponse = {
    status: 'OK',
    message,
    data,
  };
  return res.status(statusCode).json(returnResponse);
}

export function returnNonSuccess(
  res: Response,
  statusCode: number,
  message: string
) {
  return res.status(statusCode).json({ status: 'ERROR', message });
}
