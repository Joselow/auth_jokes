import { NextFunction, Request, Response } from "express";

import { AuthService } from "../services/AuthService.js";

import { ValidationError } from "../errors/ValidationError.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { ForbiddenError } from "../errors/ForbiddenError.js";

import { USER_ROLES } from "../enums/UserRoles.js";

import type { UserPrivate } from "../interfaces/User.js";

export const isGod = (req: Request, response: Response, next: NextFunction) => {
  const { uuid: uuidBody } = req.body
  const { uuid: uuidParams } = req.params

  const uuid = uuidBody ?? uuidParams 

  if (!uuid) {
    return next(new ValidationError('uuid is required'))
  }

  const userFound: UserPrivate = AuthService.findUser(uuid)

  if (!userFound) {
    return next(new NotFoundError('The user with this uuidd does not exist'))
  }
  
  const isGod = Number(userFound.role) === USER_ROLES.GOD

  if (!isGod) {
    return next(new ForbiddenError("You need to have the 'god' role", 'The user is not allowed to do this operation'))
  }

  next()
} 