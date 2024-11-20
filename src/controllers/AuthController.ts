import { Request, Response } from "express";
import { AuthService } from "../Services/AuthSerice";
import { UniqueDataError } from "../errors/UniqueDataError";
import { generateUUID } from "../utils/generateUUID";
import { USER_ROLES } from "../enums/UserRoles";
import { generateAccessToken } from "../helpers/generateAccessToken";
import { success } from "../utils/responses";
import { comparePasswordHashed, hashData } from "../utils/hashData";
import { UserPrivate, UserPublic } from "../interfaces/User";
import { InvalidCredentialsError } from "../errors/InvalidCredentialsError";

const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body

  const userFound = AuthService.findUser(username);

  if (userFound) {
    throw new UniqueDataError('User already registered with the same username or email')
  }

  const uuid = generateUUID()
  const passwordHashed = await hashData(password)

  const userCreated = AuthService.createUser({
    uuid,
    username, email, 
    password: passwordHashed,
    role: USER_ROLES.MORTAL
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

export const AuthController = {
  register, login
}