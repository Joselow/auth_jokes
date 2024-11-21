import { NextFunction, Request, Response } from "express";

import { ValidationError } from "../errors/ValidationError.js";

import { verifyAccessToken } from "../helpers/generateAccessToken.js";

import type { UserPublic } from "../interfaces/User.js";

export const isAuthenticated =  (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ValidationError('No token provided or incorrect format'))
  } 

  const BEARER_TOKEN = authHeader.split(' ')[1];

  try {
    const { uuid, username, email, role } = verifyAccessToken<UserPublic>(BEARER_TOKEN) 
    // here we should verify if the user exists, but it this case si not necessary    
    req.body = { uuid, username, email, role}
    next()
  } catch (error) {
    next(new ValidationError('Access token not valid'))
  }
}