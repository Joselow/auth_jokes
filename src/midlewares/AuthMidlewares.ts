import { NextFunction, Request, Response } from "express";
import { verifyLoginSchema, verifyRegisterSchema } from "../schemas/AuthSchema";
import { ValidationError } from "../errors/ValidationError";
import { formatValidationErrors } from "../utils/formatValidationErrors";

export const validateLoginAuthMidleware = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body

  const validated = await verifyLoginSchema({ username, email, password })

  if (validated.success) {
      req.body = { username, email, password }
      next()
  } else {
    const errors = formatValidationErrors(validated.error)
    next(new ValidationError('Errores de validación', errors))
  } 
}

export const validateRegisterAuthMidleware = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body

  const validated = await verifyRegisterSchema({ username, email, password })

  if (validated.success) {
      req.body = { username, email, password }
      next()
  } else {
    const errors = formatValidationErrors(validated.error)
    next(new ValidationError('Errores de validación', errors))
  } 
}