import { NextFunction, Request, Response } from "express"

import { UserService } from "../services/UserService"

import { success } from "../utils/responses"


const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  const users = UserService.getUsers()
  const usersMapped = users.map(({ password, ...otherFields }) => otherFields)
  success(res, 200, '', usersMapped)
}

export const UserController = {
  getUsers
}