import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../errors/ValidationError";

export const verifyUUID = (req: Request, res: Response, next: NextFunction) => {
  const { uuid } = req.params

  if (!uuid) {
    next(new ValidationError('UUID is required to update the role'))
  }
  req.params = { uuid }
  next()
}