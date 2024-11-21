import { NextFunction, Request, Response } from "express"

import { UserService } from "../services/UserService.js"

import { success } from "../utils/responses.js"
import { UserPrivate } from "../interfaces/User.js"


const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  const users: UserPrivate[] = UserService.getUsers()
  const usersMapped = users.map(({ password, ...otherFields }) => otherFields)
  success(res, 200, '', usersMapped)
}

export const UserController = {
  getUsers
}