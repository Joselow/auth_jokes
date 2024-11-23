import { Request, Response } from "express";

import { AuthService } from "../services/AuthService.js";

import { UniqueDataError } from "../errors/UniqueDataError.js";
import { InvalidCredentialsError } from "../errors/InvalidCredentialsError.js";
import { NotFoundError } from "../errors/NotFoundError.js";

import { generateAccessToken } from "../helpers/generateAccessToken.js";
import { generateUUID } from "../utils/generateUUID.js";
import { comparePasswordHashed, hashData } from "../utils/hashData.js";
import { success } from "../utils/responses.js";

import { USER_ROLES } from "../enums/UserRoles.js";

import type { UserPrivate } from "../interfaces/User.js";

const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body

  const userFound= AuthService.findUserByUsernameOrEmail(username, email);

  if (userFound) {
    throw new UniqueDataError('User already registered with the same username or email')
  }

  const uuid = generateUUID()
  const passwordHashed = await hashData(password)

  const userCreated = AuthService.createUser({
    uuid,
    username, email, 
    password: passwordHashed,
    role: USER_ROLES.GOD
  })

  const ACCESS_TOKEN = generateAccessToken(userCreated)

  success(res, 201, 'User created successfully', { 
    access_token:  ACCESS_TOKEN,
    token_type: 'Bearer',
  })

}

const login = async (req: Request, res: Response) => {
  const { username, email, password } = req.body

  const userFound: UserPrivate = AuthService.findUser(username || email);

  if (!userFound) throw new InvalidCredentialsError('Invalid credentials')
  
  const credentialsValid = await comparePasswordHashed(password, userFound.password)

  if (!credentialsValid) throw new InvalidCredentialsError('Invalid credentials')

  const { password: passwordValue, ...publicUser } = userFound
  const ACCESS_TOKEN = generateAccessToken(publicUser)

  success(res, 200, 'User logged in successfully', { 
    access_token:  ACCESS_TOKEN,
    token_type: 'Bearer',
  })
}

const switchRole = async (req: Request, res: Response) => {
  const { uuid } = req.params

  const { ok, data } = AuthService.switchRole(uuid)

  if (ok) {
    success(res, 200, 'Role updated correctly', { new_role: data })
  } else {
    throw new NotFoundError('User not found')
  }
}

export const AuthController = {
  register, login, switchRole
}