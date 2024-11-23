import { Request, Response } from "express";

import { AuthService } from "../services/AuthService.js";
import { success } from "../utils/responses.js";
import { NotFoundError } from "../errors/NotFoundError.js";

const getProfile = async(req: Request, res: Response) => {
  const { uuid } = req.body
  
  const user = AuthService.findUser(uuid)

  if (user) {
    const { password, ...otherFields } = user
    success(res, 200, 'User found correctly', otherFields)
  } else {
    throw new NotFoundError('User not found')
  }
}


export const ProfileController = {
  getProfile
}