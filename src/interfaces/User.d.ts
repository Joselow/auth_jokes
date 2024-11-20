import { USER_ROLES } from "../enums/UserRoles";

export type UniqueUserFields = 'username' |  'uuid' | 'email'

export interface UserPrivate {
  uuid: string,
  username: string,
  email: string,
  role: USER_ROLES,
  password: string,
}

export interface UserPublic extends Omit<UserPrivate, 'password'> {}
